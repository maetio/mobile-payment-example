import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text, useToast, FlatList, Spinner } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Product } from 'src/cards/product';
import { BasicProductDataID } from 'src/types/products';
import { useFetchProductsQuery } from 'src/services/products-queries';
import { LastDoc } from 'src/types/last-document';

// new imports
import { fetchProducts } from 'src/firebase/products-api';
import { BottomTabParams } from 'src/navigation/bottom-tab';
import { ExploreStackParams } from 'src/navigation/explore-stack';
// end newimports

// All commented out code is for RTK query, however for testing, I used this.

type ExploreScreenParams = StackScreenProps<ExploreStackParams, "ExploreProducts">;

export const ExploreScreen: React.FC<ExploreScreenParams> = ({ route }) => {
    const [products, setProducts] = useState<BasicProductDataID[] | undefined>();
    const [lastPostStatus, setLastPostStatus] = useState(false);

    const timeStampRef = useRef(String(Date.now())).current;
    const [lastDocID, setLastDocID] = useState<LastDoc>({
        prod: undefined,
        time: timeStampRef,
    });

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

    const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
        useFetchProductsQuery(lastDocID);

    // useEffect(() => {
    //     getPost();
    // }, []);

    // used for RTK

    useEffect(() => {
        // console.log(typeof timeStampRef);

        if (!lastDocID.prod) {
            setProducts(data);
            // refetch();
            console.log('fired from !lastDoc');
        } else {
            if (!isFetching && products && data) {
                // refetch();
                console.log('fired');

                setProducts([...products, ...data]);

                // console.log('fired from lastDoc');
            }
        }

        data?.length === 0 ? setLastPostStatus(true) : setLastPostStatus(false);

        // console.log(data?.length);
        console.log(products);
        // console.log(data);
    }, [data]);

    // End used for RTK

    // useEffect(() => {
    //     if (lastDocID) {
    //         refetch();
    //     }
    // }, [lastDocID]);

    // Get post for no RTK

    // const getPost = async () => {
    //     // for RTK
    //     // const products = await fetchProducts(lastDocID);
    //     // setProducts(products);
    //     // setLastDocSaved(lastDoc);
    //     // End RTK

    //     const products = await fetchProducts(lastDocID);
    //     setProducts(products);
    //     console.log(products);
    // };

    // end of Getposts

    const getMorePosts = async () => {
        console.log(lastPostStatus);

        // const lastID = data[data.length - 1].id;
        if (products) {
            const lastID = { prod: products[products.length - 1].id };
            setLastDocID(lastID);
        }
    };

    const refreshFuntion = () => {
        setLastPostStatus(false);
        setLastDocID({
            prod: undefined,
            time: timeStampRef,
        });
        // refetch();
    };

    if (isLoading) {
        return <ActivityIndicator color="#36d7b7" />;
    }

    return (
        <>
            {isLoading && <ActivityIndicator color="#36d7b7" />}
            {isError && <Text>Something went wrong, Error</Text>}
            {isSuccess && data && (
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
            )}
        </>
    );
};
