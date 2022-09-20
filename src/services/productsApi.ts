import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from 'src/firebase/firebase-config';
import { collection, getDocs, doc, getDoc, Query } from 'firebase/firestore';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import { Id } from '@reduxjs/toolkit/dist/query/tsHelpers';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<BasicProductData[], void>({
            async queryFn(id) {
                console.log('hi');
                try {
                    const colRef = collection(db, 'basic-product-data');
                    // add limit to products 10 items to start
                    // const colRef = collection(db, 'fdeada');
                    const prod: BasicProductData[] = [];
                    const productData = await getDocs(colRef);
                    productData.docs.forEach((doc) => {
                        const data = { ...doc.data(), id: doc.id } as BasicProductData;
                        prod.push(data);
                    });
                    console.log(prod);
                    return { data: prod };
                } catch (err) {
                    return { error: err };
                }
            },
            providesTags: ['Product'],
        }),
        fetchDetailedProduct: builder.query<DetailedProductData, string>({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'detailed-product-data', id);
                    const docSnap = await getDoc(docRef);
                    const thing = { ...docSnap.data(), id } as DetailedProductData;
                    return { data: thing };
                } catch (err) {
                    return { error: err };
                }
            },
            // providesTags: ['Product'],
        }),
    }),
});

export const { useFetchProductsQuery, useFetchDetailedProductQuery } = productsApi;
