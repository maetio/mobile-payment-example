import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { BasicProductData, DetailedProductData } from 'src/types/products';

export const converters: { [t: string]: FirestoreDataConverter<any> } = {
    productData: {
        toFirestore: (productData: BasicProductData) => {
            return productData;
        },
        fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
            const parameters = snapshot.data(options);
            const productData: BasicProductData = {
                img: parameters.img || null,
                name: parameters.name || null,
                price: parameters.price || null,
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
            };
            return detailedProductData;
        },
    },
};
