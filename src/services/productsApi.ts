import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from 'src/firebase/firebase-config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<any, void>({
            async queryFn() {
                try {
                    // const colRef = collection(db, 'basic-product-data');
                    const colRef = collection(db, 'fdeada');
                    const prod: any = [];
                    const productData = await getDocs(colRef);
                    productData.docs.forEach((doc) => {
                        const data = { ...doc.data(), id: doc.id };
                        prod.push(data);
                    });
                    return { data: prod };
                } catch (err) {
                    return { error: err };
                }
            },
            providesTags: ['Product'],
        }),
        fetchDetailedProduct: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'detailed-product-data', id);
                    const docSnap = await getDoc(docRef);
                    const thing = { ...docSnap.data(), id };
                    return { data: thing };
                } catch (err) {
                    return { error: err };
                }
            },
            providesTags: ['Product'],
        }),
    }),
});

export const { useFetchProductsQuery, useFetchDetailedProductQuery } = productsApi;

