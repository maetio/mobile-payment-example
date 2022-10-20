import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { BasicProductData, BasicProductDataID, DetailedProductData } from 'src/types/products';
import { StripeProducts } from 'src/types/stripe-products';
import { fetchDetailedData, fetchProducts, fetchStripeProducts } from 'src/firebase/products-api';
import { fetchCloseData } from 'src/firebase/map-api';
import { LastDoc } from 'src/types/last-document';
import { DistanceProducts } from 'src/types/products';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<BasicProductDataID[], LastDoc | undefined>({
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
        fetchStripeProducts: builder.query<StripeProducts[], string>({
            async queryFn() {
                // console.log(lastDocID);
                console.log('from query');

                try {
                    const prod = await fetchStripeProducts();
                    console.log(prod);

                    return { data: prod };
                } catch (err) {
                    return { error: err };
                }
            },
            providesTags: ['Product'],
        }),

        fetchLocationProducts: builder.query<BasicProductDataID[], DistanceProducts | undefined>({
            async queryFn(obj) {
                // console.log(lastDocID);
                console.log('from query');

                try {
                    const prod = obj?.loc ? await fetchCloseData(obj?.loc, obj?.dis) : undefined;
                    console.log(prod);

                    return { data: prod };
                } catch (err) {
                    return { error: err };
                }
            },
            providesTags: ['Product'],
        }),
    }),
});

export const {
    useFetchProductsQuery,
    useFetchDetailedProductQuery,
    useFetchStripeProductsQuery,
    useFetchLocationProductsQuery,
} = productsApi;
