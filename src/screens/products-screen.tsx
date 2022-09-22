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
import { fetchInitialData, fetchMoreData } from 'src/firebase/products-api';
// end of extra imports

export const ProductsScreen = () => {
    // RTK Query Example/Test

    const [products, setProducts] = useState<BasicProductData[] | null>();
    // const [lastDocument, setLastDocument] = useState<any>(null);
    const [lastDocSaved, setLastDocSaved] = useState<any>();
    const [lastPostStatus, setLastPostStatus] = useState(false);
    // const { data, isLoading, isError, error, isSuccess, refetch } = useFetchProductsQuery(null);

    // 100% working infinite scrole WITHOUT RTK query

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        const postData = await fetchInitialData();
        setProducts(postData.prod);
        setLastDocSaved(postData.lastDoc);
    };

    const getMorePosts = async () => {
        if (!lastPostStatus) {
            console.log('hey');
            const postData = await fetchMoreData(lastDocSaved);
            // console.log(postData.prod);
            setLastDocSaved(postData.lastDoc);
            setProducts([...products, ...postData.prod]);
            console.log(products);
            if (postData.prod.length === 0) {
                setLastPostStatus(true);
            } else {
                setLastPostStatus(false);
            }
        }
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
                    ListFooterComponent={() => (!lastPostStatus ? <Spinner /> : null)}
                />
            </Box>
        </>
    );
};
