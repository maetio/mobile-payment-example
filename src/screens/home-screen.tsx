import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text, Link, FlatList } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { signOutUser } from 'src/firebase/auth-api';
import { signOut } from 'src/ducks/user-slice';
import { HomeStackParams } from 'src/navigation/home-stack';

import { query, where, getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-config';

/*
    Define Screen Typee
*/
type HomeScreenProps = StackNavigationProp<HomeStackParams, 'Home'>;

export const HomeScreen: React.FC<any> = () => {
    const [prods, setprods] = useState<any[]>();

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        console.log(prods);
    }, [prods]);


    // Basic function that gets stripe product data from Firestore

    const fetchProducts = async () => {
        const productsRef = collection(db, 'products');
        const productsQuery = query(productsRef, where('active', '==', true));
        const productsQuerySnap = await getDocs(productsQuery);
        let products: any = [];
        productsQuerySnap.forEach(async (doc) => {
            const pricesRef = collection(db, 'products', doc.id, 'prices');
            const q = query(pricesRef);
            const pricesQuerySnap = await getDocs(q);

            const productsObject = {
                item: {
                    id: doc.id,
                    ...doc.data(),
                },
                prices: pricesQuerySnap.docs.map((price) => {
                    return {
                        id: price.id,
                        ...price.data(),
                    };
                }),
            };
            products.push(productsObject);
        });

        return products;
    };

    const getPost = async () => {
        const prods = await fetchProducts();
        setprods(prods);
    };


    return (
        <Box
            w="100%"
            h="100%"
            bgColor="background.100"
            flex={1}
            alignItems="center"
            justifyContent="center">
           
            <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
                <FlatList
                    data={prods}
                    renderItem={({ item }) => <Text>{item.item.name}</Text>}
                    showsVerticalScrollIndicator={false}
                    // onEndReached={!lastPostStatus ? getMorePosts : null}
                    onEndReachedThreshold={0.01}
                    scrollEventThrottle={150}
                    // ListFooterComponent={() => (!lastPostStatus ? <Spinner /> : null)}
                    // refreshing={isFetching}
                    // onRefresh={refreshFuntion}
                />
            </Box>
        </Box>
    );
};
