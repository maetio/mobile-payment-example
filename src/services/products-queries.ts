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
import { fetchInitialData, fetchMoreData, fetchDetailedData } from 'src/firebase/products-api';

interface Fetch {
    prod: BasicProductData[];
    lastDoc: QueryDocumentSnapshot<DocumentData>;
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<Fetch, void | null>({
            async queryFn(lastDocument) {
                console.log(lastDocument);
                if (lastDocument === null) {
                    try {
                        const { prod, lastDoc } = await fetchInitialData();

                        return { data: { prod, lastDoc } };
                    } catch (err) {
                        return { error: err };
                    }
                } else {
                    try {
                        const { prod, lastDoc } = await fetchMoreData(lastDocument);

                        return { data: { prod, lastDoc } };
                    } catch (err) {
                        return { error: err };
                    }
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
            providesTags: ['Product'],
        }),
    }),
});

export const { useFetchProductsQuery, useFetchDetailedProductQuery } = productsApi;
