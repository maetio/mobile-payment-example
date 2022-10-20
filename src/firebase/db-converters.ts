import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import {
    StripeProducts,
    StripeProductBasic,
    StripeProductDetailed,
} from 'src/types/stripe-products';

export const converters: { [t: string]: FirestoreDataConverter<any> } = {
    productData: {
        toFirestore: (productData: BasicProductData) => {
            return productData;
        },
        fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
            const data = snapshot.data(options);
            const productData: BasicProductData = {
                img: data.img || null,
                name: data.name || null,
                price: data.price || null,
                lat: data.lat || null,
                long: data.long || null,
                geohash: data.geohash || null,
            };
            return productData;
        },
    },
    detailedProductData: {
        toFirestore: (detailedProductData: DetailedProductData) => {
            return detailedProductData;
        },
        fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
            const data = snapshot.data(options);
            const detailedProductData: DetailedProductData = {
                amenities: data.amenities || null,
                desc: data.desc || null,
                img: data.img || null,
                name: data.name || null,
                price: data.price || null,
                id: data.id || null,
            };
            return detailedProductData;
        },
    },
    stripeProductsDetailed: {
        toFirestore: (stripeProductsDetailed: StripeProductDetailed) => {
            return stripeProductsDetailed;
        },
        fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
            const data = snapshot.data(options);
            const stripeProductsDetailed: StripeProductDetailed = {
                unit_amount: data.unit_amount || null,
                currency: data.currency || null,
                product: data.product || null,
            };
            return stripeProductsDetailed;
        },
    },
    stripeProductsBasic: {
        toFirestore: (stripeProductsBasic: StripeProductBasic) => {
            return stripeProductsBasic;
        },
        fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
            const data = snapshot.data(options);
            const stripeProductsBasic: StripeProductBasic = {
                description: data.description || null,
                images: data.images || null,
                name: data.name || null,
            };
            return stripeProductsBasic;
        },
    },
};
