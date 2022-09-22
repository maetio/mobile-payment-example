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
import { fetchInitialData, fetchDetailedData } from 'src/firebase/products-api';

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
                        const colRef = collection(db, 'basic-product-data');
                        const q = query(
                            colRef,
                            orderBy('price'),
                            startAfter(lastDocument),
                            limit(3),
                        );
                        const prod: BasicProductData[] = [];
                        const productData = await getDocs(q);

                        const lastDoc = productData.docs[productData.docs.length - 1];

                        productData.docs.forEach((doc: any) => {
                            const data = { ...doc.data(), id: doc.id } as BasicProductData;
                            prod.push(data);
                        });

                        return { data: { prod: prod, lastDoc: lastDoc } };
                    } catch (err) {
                        return { error: err };
                    }
                }
            },
            providesTags: ['Product'],
        }),
        // fetchMoreProducts: builder.query<BasicProductData[], void>({
        //     async queryFn() {
        //         console.log('hi');
        //         try {
        //             const colRef = collection(db, 'basic-product-data');
        //             const q = query(colRef, orderBy('price'), limit(3));
        //             const prod: BasicProductData[] = [];
        //             const productData = await getDocs(q);
        //             productData.docs.forEach((doc: any) => {
        //                 const data = { ...doc.data(), id: doc.id } as BasicProductData;
        //                 prod.push(data);
        //             });
        //             return { data: prod };
        //         } catch (err) {
        //             return { error: err };
        //         }
        //     },
        //     providesTags: ['Product'],
        // }),
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
