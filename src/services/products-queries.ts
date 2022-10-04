import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
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
    QueryDocumentSnapshot,
    DocumentData,
} from 'firebase/firestore';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import { fetchDetailedData, fetchProducts } from 'src/firebase/products-api';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<BasicProductData[], string | undefined>({
            async queryFn(lastDocID) {
                console.log(lastDocID);
                console.log('from query');

                try {
                    const prod = await fetchProducts(lastDocID);

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
                    const detailedProductData = await fetchDetailedData(id);

                    return { data: detailedProductData };
                } catch (err) {
                    return { error: err };
                }
            },
            // providesTags: ['Product'],
        }),
    }),
});

export const { useFetchProductsQuery, useFetchDetailedProductQuery } = productsApi;
