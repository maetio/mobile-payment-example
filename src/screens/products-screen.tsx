import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text, useToast, FlatList, Spinner } from 'native-base';
import { Product } from 'src/cards/product';
import { string } from 'yup';
import { number } from 'yup/lib/locale';
import { BasicProductData } from 'src/types/products';
import { useFetchProductsQuery } from 'src/services/products-queries';
import { AlertToast } from 'src/components/feedback/alert-toast';

// extra imports for test
import {} from 'src/firebase/products-api';
// end of extra imports

export const ProductsScreen = () => {
    // RTK Query Example/Test

    const [products, setProducts] = useState<BasicProductData[] | undefined>();
    const [lastDocID, setLastDocID] = useState<any>(undefined);

    // const [lastPostStatus, setLastPostStatus] = useState(false);

    /*
        Seth Notes for Pagination:
        First 3 --> take the last document/data data[2].id data[data.length - 1]
        Same destructing I did to add the old state to the new data array after refetch

        Make new state variable with all products, everytime data changes(useEffect) push data array inot this new state, 
        amd this new state is what is displaying

        Kekoa's Notes:
        Set the input to the query as a state undefined | string
        First 3 product --> Be loaded on moount (undefined query input)
        onEndReached --> refetch more data with lastDocID --> setLastDoc state RTK 

    */

    const { data, isFetching, isError, error, isSuccess, refetch } =
        useFetchProductsQuery(lastDocID);

    // 100% working infinite scrole WITHOUT RTK query

    useEffect(() => {
        // getPost();
        // if (data && lastDocSaved) {
        //     console.log(data.lastDoc === lastDocSaved);
        // }

        setProducts(data);
        console.log(data);
    }, []);

    useEffect(() => {
        if (!isFetching) {
            if (products !== undefined && data !== undefined) {
                setProducts([...products, ...data]);
            }
        }
    }, [data]);

    // const getPost = async () => {
    //     const { prod, lastDoc } = await fetchInitialData();
    //     setProducts(prod);
    //     setLastDocSaved(lastDoc);
    // };

    const getMorePosts = async () => {
        if (data) {
            const lastID = data[data.length - 1].id;
            setLastDocID(lastID);
        }

        // if (!lastPostStatus) {

        // const postData = await fetchMoreData(lastDocSaved);
        // setLastDocSaved(postData.lastDoc);
        // setProducts([...products, ...postData.prod]);

        // if (postData.prod.length === 0) {
        //     setLastPostStatus(true);
        // } else {
        //     setLastPostStatus(false);
        // }
        // }
    };

    // END of 100% working infinite scroll WITHOUT RTK query

    // if (isLoading) {
    //     return <ActivityIndicator color="#36d7b7" />;
    // }

    return (
        <>
            {/* {isLoading && <ActivityIndicator color="#36d7b7" />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && data && ( */}

            <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
                <FlatList
                    data={products}
                    renderItem={({ item }) => <Product productData={item} key={item.id} />}
                    showsVerticalScrollIndicator={false}
                    onEndReached={getMorePosts}
                    onEndReachedThreshold={0.01}
                    scrollEventThrottle={150}
                    // ListFooterComponent={() => (!lastPostStatus ? <Spinner /> : null)}
                    refreshing={isFetching}
                    onRefresh={() => refetch()}
                    ListFooterComponent={() => <Spinner />}
                />
            </Box>
        </>
    );
};
