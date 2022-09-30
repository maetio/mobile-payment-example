import React, { useState } from 'react';
import { Linking } from 'react-native';
import { Box, Button, ScrollView, Flex, Text } from 'native-base';
import { CartItem } from 'src/cards/cart-item';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { db } from 'src/firebase/firebase-config';
import { loadStripe } from '@stripe/stripe-js';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    limit,
    orderBy,
    startAfter,
    QueryDocumentSnapshot,
    DocumentData,
    setDoc,
    addDoc,
    onSnapshot,
} from 'firebase/firestore';

export const CartScreen = () => {
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
                // const supported = await Linking.canOpenURL(url);

                await Linking.openURL(url);

                // if (supported) {
                //     // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                //     // by some browser in the mobile
                //     await Linking.openURL(url);
                // }
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
