import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text, useToast, FlatList, Spinner } from 'native-base';
import { Product } from 'src/cards/product';
import { string } from 'yup';
import { number } from 'yup/lib/locale';
import { BasicProductData } from 'src/types/products';
import { useFetchProductsQuery } from 'src/services/products-queries';

export const ProductsScreen = () => {
    // RTK Query Example/Test

    const [products, setProducts] = useState<BasicProductData[] | undefined>();
    const [lastDocID, setLastDocID] = useState<string | undefined>(undefined);
    const [lastPostStatus, setLastPostStatus] = useState(false);

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

    const {
        data = [],
        isFetching,
        isLoading,
        isError,
        error,
        isSuccess,
        refetch,
    } = useFetchProductsQuery(lastDocID);


    // useEffect(() => {
    //     // getPost();
    //     // if (data && lastDocSaved) {
    //     //     console.log(data.lastDoc === lastDocSaved);
    //     // }

    //     setProducts(data);
    // }, []);

    useEffect(() => {
        if (!lastDocID) {
            setProducts(data);
            console.log('fired from !lastDoc');
        } else {
            if (!isFetching && products && data) {
                console.log('fired');

                setProducts([...products, ...data]);

                // console.log('fired from lastDoc');
            }
        }

        data?.length === 0 ? setLastPostStatus(true) : setLastPostStatus(false);

        console.log(data?.length);
        console.log(data);
    }, [data]);

    // useEffect(() => {
    //     // console.log(data);
    //     // console.log('isFetching');
    // }, [isFetching]);

    useEffect(() => {
        if (!lastDocID) {
            refetch();
        }
    }, [lastDocID]);

    // const getPost = async () => {
    //     const { prod, lastDoc } = await fetchInitialData();
    //     setProducts(prod);
    //     setLastDocSaved(lastDoc);
    // };

    const getMorePosts = async () => {
        console.log(lastPostStatus);

        const lastID = data[data.length - 1].id;
        console.log('getmore');
        setLastDocID(lastID);
    };

    const refreshFuntion = () => {
        setLastPostStatus(false);
        setLastDocID(undefined);
        refetch();
    };


    // if (isLoading) {
    //     return <ActivityIndicator color="#36d7b7" />;
    // }

    console.log(error);
    console.log(data);
    console.log(lastDocID);
    console.log(lastPostStatus);

    return (
        <>
            {/* {isLoading && <ActivityIndicator color="#36d7b7" />} */}
            {/* {isError && <Text>Something went wrong, Error</Text>} */}
            {/* {isSuccess && data && ( */}
            <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
                <FlatList
                    data={products}
                    renderItem={({ item }) => <Product productData={item} key={item.id} />}
                    showsVerticalScrollIndicator={false}
                    onEndReached={!lastPostStatus ? getMorePosts : null}
                    onEndReachedThreshold={0.01}
                    scrollEventThrottle={150}
                    ListFooterComponent={() => (!lastPostStatus ? <Spinner /> : null)}
                    refreshing={isFetching}
                    onRefresh={refreshFuntion}
                />
            </Box>
            {/* )} */}
        </>
    );
};
