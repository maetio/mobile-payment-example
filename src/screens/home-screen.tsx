import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
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
import { useFetchStripeProductsQuery } from 'src/services/products-queries';

/*
    Define Screen Typee
    
*/

export const HomeScreen: React.FC<any> = () => {
    const timeStampRef = useRef(String(Date.now())).current;

    const [products, setprods] = useState<any[]>();
    const firstLoad = useRef(true);

    const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
        useFetchStripeProductsQuery(timeStampRef);

    useEffect(() => {
        // if (firstLoad.current) {
        //     firstLoad.current = false;

        //     // getPost();
        //     console.log(products);

        setprods(data);
        //     console.log(data);
        // }
        console.log(data);
    }, []);

    useEffect(() => {
        setprods(data);
        console.log(error);
    }, [data]);

    useEffect(() => {
        console.log(products);
    }, [products]);

    // Basic function that gets stripe product data from Firestore

    // const getPost = async () => {
    //     console.log('first load');
    //     const prods = await fetchProducts();

    //     setprods(prods);
    // };

    if (isLoading || isError) {

        return <ActivityIndicator color="#36d7b7" />;
    }

    return (
        <Box
            w="100%"
            h="100%"
            bgColor="background.100"
            flex={1}
            alignItems="center"
            justifyContent="center">
            {isSuccess && data && (
                <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <Text>{item.name}</Text>}
                        showsVerticalScrollIndicator={false}
                        // onEndReached={!lastPostStatus ? getMorePosts : null}
                        onEndReachedThreshold={0.01}
                        scrollEventThrottle={150}
                        // ListFooterComponent={() => (!lastPostStatus ? <Spinner /> : null)}
                        // refreshing={isFetching}
                        // onRefresh={refreshFuntion}
                    />
                </Box>
            )}
        </Box>
    );
};
