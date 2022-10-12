import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import { fetchDetailedData, fetchProducts } from 'src/firebase/products-api';

interface thisData {
    prod: string | undefined;
    time: string;
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<BasicProductData[], thisData | undefined>({
            async queryFn(lastDocID, timeStamp) {
                // console.log(lastDocID);
                console.log('from query');

                try {
                    const prod = await fetchProducts(lastDocID?.prod);
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
