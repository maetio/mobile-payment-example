import React, { useState, useEffect, SetStateAction } from 'react';
import { db } from 'src/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Text, Button, Input, Image, Flex } from 'native-base';
import { DetailedProductData } from 'src/types/products';
import { useAppDispatch } from 'src/hooks/useful-ducks';
import { addToCart } from 'src/ducks/cart-slice';
import { useAppSelector } from 'src/hooks/useful-ducks';

interface routeID {
    children: React.ReactNode;
    route: {
        // children: React.ReactNode;
        params: {
            id: string;
        };
    };
}

export const ProductViewScreen: React.FC<routeID> = ({ route }) => {
    const [detailedData, setDetailedData] = useState<DetailedProductData | null>();
    const [quantity, setQuantity] = useState('1');
    const id = route.params.id;
    const docRef = doc(db, 'detailed-product-data', id);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const getProducts = async () => {
            const docSnap = await getDoc(docRef);
            const thing = { ...docSnap.data(), id: id } as DetailedProductData;

            setDetailedData(thing);
        };

        getProducts();
    }, []);

    const cart = useAppSelector((state) => state.cart);

    const inCart = cart.cart.find((item) => (item.id === id ? true : false));

    return (
        <Box>
            {detailedData ? (
                <>
                    <Box h="90%" mt="5" justifyContent="space-between" alignItems="center">
                        <Image
                            source={{
                                uri: 'https://wallpaperaccess.com/full/317501.jpg',
                            }}
                            alt="Alternate Text"
                            size="2xl"
                        />
                        <Text fontSize="2xl">{detailedData.name}</Text>
                        <Text fontSize="xl">{detailedData.desc}</Text>
                        <Text fontSize="xl">${detailedData.price}</Text>
                        {!inCart ? (
                            <>
                                <Input
                                    onChangeText={(value) => setQuantity(value)}
                                    placeholder="Quantity"
                                    w="90%"
                                />
                                <Button
                                    onPress={() => {
                                        dispatch(
                                            addToCart({ ...detailedData, qty: Number(quantity) }),
                                        );
                                    }}>
                                    Add to Cart
                                </Button>
                            </>
                        ) : (
                            <>
                                <Input
                                    onChangeText={(value) => setQuantity(value)}
                                    placeholder="Change Quantity"
                                    w="90%"
                                />
                                <Button
                                    onPress={() => {
                                        dispatch(
                                            addToCart({ ...detailedData, qty: Number(quantity) }),
                                        );
                                    }}>
                                    Change Quantity
                                </Button>
                            </>
                        )}
                    </Box>
                </>
            ) : (
                <Text>Something went wrong</Text>
            )}
        </Box>
    );
};
