import React, { useState, useEffect, SetStateAction } from 'react';
import { ActivityIndicator } from 'react-native';
import { db } from 'src/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Text, Button, Input, Image, Flex } from 'native-base';
import { DetailedProductData } from 'src/types/products';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { addToCart } from 'src/ducks/cart-slice';
import { useFetchDetailedProductQuery } from 'src/services/productsApi';

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
    // const [detailedData, setDetailedData] = useState<Partial<DetailedProductData>>();
    const [detailedData, setDetailedData] = useState<DetailedProductData | null>();

    const [quantity, setQuantity] = useState('1');
    const { id } = route.params;
    const { data, isLoading, isError, error } = useFetchDetailedProductQuery(id);

    // const docRef = doc(db, 'detailed-product-data', id);

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     const getProducts = async () => {
    //         const docSnap = await getDoc(docRef);
    //         // const thing = { ...docSnap.data(), id } as Partial<DetailedProductData>;
    //         const thing = { ...docSnap.data(), id } as DetailedProductData;

    //         setDetailedData(thing);
    //     };

    //     getProducts();
    // }, []);

    const cart = useAppSelector((state) => state.cart);

    const inCart = cart.cart.find((item) => item.id === id);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#00ff00"/>;
    }

    return (
        <Box>
            {data ? (
                <Box h="90%" mt="5" justifyContent="space-between" alignItems="center">
                    <Image
                        source={{
                            uri: 'https://wallpaperaccess.com/full/317501.jpg',
                        }}
                        alt="Alternate Text"
                        size="2xl"
                    />
                    <Text fontSize="2xl">{data.name}</Text>
                    <Text fontSize="xl">{data.desc}</Text>
                    <Text fontSize="xl">${data.price}</Text>
                    {!inCart ? (
                        <>
                            <Input
                                onChangeText={(value) => setQuantity(value)}
                                placeholder="Quantity"
                                w="90%"
                            />
                            <Button
                                onPress={() => {
                                    dispatch(addToCart({ ...data, qty: Number(quantity) }));
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
                                    dispatch(addToCart({ ...data, qty: Number(quantity) }));
                                }}>
                                Change Quantity
                            </Button>
                        </>
                    )}
                </Box>
            ) : (
                <Text>Something went wrong</Text>
            )}
        </Box>
    );
};
