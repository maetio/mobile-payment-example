import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text, useToast } from 'native-base';
import { Product } from 'src/cards/product';
import { db } from 'src/firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { string } from 'yup';
import { number } from 'yup/lib/locale';
import { BasicProductData } from 'src/types/products';
import { useFetchProductsQuery } from 'src/services/productsApi';
import { AlertToast } from 'src/components/feedback/alert-toast';

export const ProductsScreen = () => {
    const { data, isLoading, isError, error, isSuccess } = useFetchProductsQuery();

    const toast = useToast();
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

    return (
        <>
            {isLoading && <ActivityIndicator color="#36d7b7" />}
            {isError && (
                <AlertToast
                    title={`${error}`}
                    type="primary"
                    toExit={() => toast.close('guestToast')}
                />
            )}
            {isSuccess && data && (
                <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
                    {[...data]
                        .sort((productPrice1, productPrice2) => {
                            return productPrice1.price - productPrice2.price;
                        })
                        .map((product) => {
                            return <Product key={product.id} productData={product} />;
                        })}
                </Box>
            )}
        </>
    );
};
