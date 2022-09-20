import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from 'src/firebase/firebase-config';
import { collection, getDocs, doc, getDoc, query, limit } from 'firebase/firestore';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import { Id } from '@reduxjs/toolkit/dist/query/tsHelpers';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<BasicProductData[], void>({
            async queryFn() {
                console.log('hi');
                try {
                    const colRef = collection(db, 'basic-product-data');
                    const q = query(colRef, limit(3));
                    // add limit to products 10 items to start
                    // const colRef = collection(db, 'fdeada');
                    const prod: BasicProductData[] = [];
                    const productData = await getDocs(q);
                    productData.docs.forEach((doc: any) => {
                        const data = { ...doc.data(), id: doc.id } as BasicProductData;
                        prod.push(data);
                    });

                    console.log(q);
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
