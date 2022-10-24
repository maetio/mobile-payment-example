import React, { useState } from 'react';
import { Linking } from 'react-native';
import { Box, Button, ScrollView, Flex, Text } from 'native-base';
import { CartItem } from 'src/cards/cart-item';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { db } from 'src/firebase/firebase-config';
import { loadStripe } from '@stripe/stripe-js';
import { collection, addDoc, onSnapshot, DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import { CartStackParams } from 'src/navigation/cart-stack';

type CartScreenParams = StackScreenProps<CartStackParams, 'CartProducts'>;

export const CartScreen: React.FC<CartScreenParams> = ({ route }) => {
    const [loading, setLoading] = useState(false);

    const cart = useAppSelector((state) => state.cart);
    const user = useAppSelector((state) => state.user);

    const checkOut = async () => {
        // Linking.openURL('https://developer.mozilla.org/en-US/');

        console.log(user.uid);
        setLoading(true);

        const userCollection = collection(db, 'users', user.uid, 'checkout_sessions');

        const docRef = await addDoc(userCollection, {
            mode: 'payment',
            price: 'price_1Ln1KBKL7t73XQEMlFlVbFWZ', // One-time price created in Stripe
            success_url: 'https://developer.mozilla.org/en-US/',
            cancel_url: 'https://developer.mozilla.org/en-US/',
        });

        onSnapshot(docRef, async (snap: any) => {
            const { error, url } = snap.data();

            if (error) {
                console.log(`there is an error ${error.message}`);
                setLoading(false);
            }

            if (url) {
                await Linking.openURL(url);
            }
        });
    };

    return (
        <>
            {cart.cart.length > 0 ? (
                <ScrollView h="100%">
                    <Flex justifyContent="space-between">
                        <>
                            <Box alignItems="center" justifyContent="center">
                                {cart.cart.map((el) => {
                                    return <CartItem key={el.id} cartData={el} />;
                                })}
                            </Box>
                            <Button disabled={loading} onPress={checkOut} mt="10">
                                {loading ? 'loading...' : 'CheckOut'}
                            </Button>
                        </>
                    </Flex>
                </ScrollView>
            ) : (
                <Box
                    w="100%"
                    h="100%"
                    bgColor="background.100"
                    flex={1}
                    alignItems="center"
                    justifyContent="center">
                    <Text>Please Add something to Cart</Text>
                </Box>
            )}
        </>
    );
};
