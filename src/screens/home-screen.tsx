import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text, Link, FlatList } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { signOutUser } from 'src/firebase/auth-api';
import { signOut } from 'src/ducks/user-slice';
import { HomeStackParams } from 'src/navigation/home-stack';
// import { StripeProducts } from 'src/types/stripe-products';

import { query, where, getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-config';

/*
    Define Screen Typee
    
*/

const fetchProducts = async () => {

    const productsRef = collection(db, 'products');
    const productsQuery = query(productsRef, where('active', '==', true));
    const productsQuerySnap = await getDocs(productsQuery);

    const products: any = [];

    productsQuerySnap.forEach(async (doc) => {
        const pricesRef = collection(db, 'products', doc.id, 'prices');
        const q = query(pricesRef);
        const pricesQuerySnap = await getDocs(q);

        const datas = {
            item: { id: doc.id, ...doc.data() },

            prices: pricesQuerySnap.docs.map(async (price) => {
                return { id: price.id, ...price.data() };
            }),
        };
       
        products.push(datas);
    });

    return products;
};

export const HomeScreen: React.FC<any> = () => {
    const [products, setprods] = useState<any[]>();
    const firstLoad = useRef(true);

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;

            getPost();
            console.log(products);
        }
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    // Basic function that gets stripe product data from Firestore

    const getPost = async () => {
        console.log('first load');
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
            {products !== undefined ? (
                <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
                    <FlatList
                        data={products}
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
            ) : (
                <Text>something went wrong</Text>
            )}
        </Box>
    );
};
