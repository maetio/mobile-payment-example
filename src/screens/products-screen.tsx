import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text, useToast, FlatList, useSafeArea, Spinner } from 'native-base';
import { Product } from 'src/cards/product';
// import { db } from 'src/firebase/firebase-config';
// import { collection, getDocs } from 'firebase/firestore';
import { string } from 'yup';
import { number } from 'yup/lib/locale';
import { BasicProductData } from 'src/types/products';
import { useFetchProductsQuery } from 'src/services/products-queries';
import { AlertToast } from 'src/components/feedback/alert-toast';
import { async } from '@firebase/util';

// New Imports for async function
import { db } from 'src/firebase/firebase-config';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    limit,
    orderBy,
    startAfter,
} from 'firebase/firestore';
// END New Imports for async function

export const ProductsScreen = () => {
    // RTK Query Example/Test

    const [products, setProducts] = useState<BasicProductData[] | null>();
    // const [lastDocument, setLastDocument] = useState<any>(null);
    const [lastDocSaved, setLastDocSaved] = useState<any>();
    const [lastPostStatus, setLastPostStatus] = useState(false);
    const { data, isLoading, isError, error, isSuccess, refetch } = useFetchProductsQuery(null);
    console.log(data?.lastDoc);

    useEffect(() => {
        if (data) {
            setProducts(data.prod);
            setLastDocSaved(data.lastDoc);
        }
    }, []);

   

    // console.log(lastDocSaved);
    console.log(data?.lastDoc)

    // const getPost = async () => {
    //     const postData = await fetchData();
    //     setProducts(postData.prod);
    //     setLastDocSaved(postData.lastDoc);
    // };

    // const fetchData = async () => {
    //     const colRef = collection(db, 'basic-product-data');
    //     const q = query(colRef, orderBy('price'), limit(3));
    //     const prod: BasicProductData[] = [];
    //     const productData = await getDocs(q);

    //     const lastDoc = productData.docs[productData.docs.length - 1];

    //     productData.docs.forEach((doc: any) => {
    //         const datas = { ...doc.data(), id: doc.id } as BasicProductData;
    //         prod.push(datas);
    //     });

    //     return { prod, lastDoc };
    // };

    const fetchMorePosts = async (lastDocument: any) => {
        const colRef = collection(db, 'basic-product-data');
        const q = query(colRef, orderBy('price'), startAfter(lastDocument), limit(3));
        const prod: BasicProductData[] = [];
        const productData = await getDocs(q);

        const lastDoc = productData.docs[productData.docs.length - 1];

        productData.docs.forEach((doc: any) => {
            const datas = { ...doc.data(), id: doc.id } as BasicProductData;
            prod.push(datas);
        });
        return { prod, lastDoc };
    };

    const getMorePosts = async () => {
        if (!lastPostStatus) {
            console.log('hey');
            const postData = await fetchMorePosts(lastDocSaved);
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

    // useEffect(() => {
    //     if (data) {
    //         setProducts(data.prod);
    //         setLastDocSaved(data.lastDoc);
    //     }
    // }, []);

    // const getMorePosts = () => {
    //     setLastDocument(lastDocSaved);
    //     refetch();

    //     if (data) {
    //         setProducts(data.prod);
    //     }
    // };

    // end of RTK Query

    // oriinal

    // const [data, setData] = useState<BasicProductData[] | null>();
    // const colRef = collection(db, 'basic-product-data');

    // useEffect(() => {
    //     const getProducts = async () => {
    //         const prod: BasicProductData[] = [];
    //         const productData = await getDocs(colRef);
    //         productData.docs.forEach((doc) => {
    //             const data = { ...doc.data(), id: doc.id } as BasicProductData;
    //             prod.push(data);
    //         });
    //         setData(prod);
    //     };
    //     getProducts();
    // }, []);

    // console.log(data);

    // if (isLoading) {
    //     return <ActivityIndicator color="#36d7b7" />;
    // }

    // console.log(data);
    // console.log(error);

    // nativebase flat list, props called data

    // if (isLoading) {
    //     return <ActivityIndicator />;
    // }

    // console.log(isError);

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
