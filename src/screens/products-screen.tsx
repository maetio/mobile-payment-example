import React, { useState, useEffect } from 'react';
import { Box, Text } from 'native-base';
import { Product } from 'src/cards/product';
import { db } from 'src/firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { string } from 'yup';
import { number } from 'yup/lib/locale';
import { BasicProductData } from 'src/types/products';

export const ProductsScreen = () => {
    const [data, setData] = useState<BasicProductData[] | null>();
    const colRef = collection(db, 'basic-product-data');

    useEffect(() => {
        const getProducts = async () => {
            const prod: BasicProductData[] = [];
            const productData = await getDocs(colRef);
            productData.docs.forEach((doc) => {
                const data = { ...doc.data(), id: doc.id } as BasicProductData;
                prod.push(data);
            });
            setData(prod);
        };
        getProducts();
    }, []);

    // console.log(data);

    return (
        <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
            {data ? (
                data
                    .sort((a, b) => {
                        return a.price - b.price;
                    })
                    .map((el) => {
                        return <Product key={el.id} productData={el} />;
                    })
            ) : (
                <Text>Looks like there's no places to stay!</Text>
            )}
        </Box>
    );
};
