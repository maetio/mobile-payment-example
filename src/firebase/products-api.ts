import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    limit,
    orderBy,
    startAfter,
    where,
    collectionGroup,
    startAt,
    endAt,
} from 'firebase/firestore';
import { geohashForLocation, geohashQueryBounds } from 'geofire-common';
import { db } from 'src/firebase/firebase-config';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import { converters } from './db-converters';
import {
    StripeProducts,
    StripeProductDetailed,
    StripeProductBasic,
} from 'src/types/stripe-products';


export const fetchProducts = async (lastDocumentID: string | undefined) => {
    const colRef = collection(db, 'basic-product-data').withConverter<BasicProductData>(
        converters.productData,
    );

    // console.log('hellllllo');

    const lastVisible = lastDocumentID ? await getDoc(doc(colRef, lastDocumentID)) : null;

    // Make sure to change limit back to 3
    const q = lastVisible
        ? query(colRef, orderBy('price'), startAfter(lastVisible), limit(3))
        : query(colRef, orderBy('price'), limit(3));
    // Make sure to change limit back to 3
    const productData = await getDocs(q);

    const prod: BasicProductData[] = [];

    productData.docs.forEach((doc) => {
        const datas = { ...doc.data(), id: doc.id };
        prod.push(datas);
    });

    return prod;
};

export const fetchDetailedData = async (id: string) => {
    const docRef = doc(db, 'detailed-product-data', id).withConverter<DetailedProductData>(
        converters.detailedProductData,
    );
    const docSnap = await getDoc(docRef);
    const detailedProductData = { ...docSnap.data(), id };

    return detailedProductData;
};

export const fetchStripeProducts = async () => {
    const pricesCollecitonRef = collectionGroup(db, 'prices').withConverter<StripeProductDetailed>(
        converters.stripeProductsDetailed,
    );

    // const pricesCollecitonRef = collectionGroup(db, 'prices');
    const productsQuery = query(pricesCollecitonRef, where('active', '==', true));
    const productsQuerySnap = await getDocs(productsQuery);

    // const thing = await getDoc(productsRef);

    /// snapshot that contains all of the prices, that are active

    const products: StripeProducts[] = [];

    await Promise.all(
        productsQuerySnap.docs.map(async (document) => {
            const priceData = document.data();
            const productsRef = doc(
                db,
                'products',
                priceData.product,
            ).withConverter<StripeProductBasic>(converters.stripeProductsBasic);
            const basicProductRef = await getDoc(productsRef);
            const basicProductInfo = basicProductRef.data();
            const data = {
                priceID: document.id,
                ...document.data(),
                ...basicProductInfo,
            };

            products.push(data);
        }),
    );

    return products;
};

// export const fetchCloseData = async (location:any) => {
//     const radius = 2000 * 1000;
//     // const radius = Infinity;

//     if (location?.length === 2) {
//         const bounds = geohashQueryBounds(location, radius);
//         const promises = [];

//         for (const b of bounds) {
//             const colRef = collection(db, 'basic-product-data') as any;
//             const q = query(colRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));

//             const datas = (await getDocs(q)) as any;

//             promises.push(datas);
//         }

//         const thing = await Promise.all(promises)
//             .then((snapShots) => {
//                 const matchingDocs: any = [];

//                 for (const snap of snapShots) {
//                     for (const doc of snap.docs) {
//                         const lat = doc.get('lat');
//                         const lng = doc.get('long');

//                         // console.log(lat);
//                         // console.log(lng);

//                         // We have to filter out a few false positives due to GeoHash
//                         // accuracy, but most will match
//                         const distanceInKm = distanceBetween([lat, lng], location);
//                         const distanceInM = distanceInKm * 1000;
//                         if (distanceInM <= radius) {
//                             const locationProd = { ...doc.data(), id: doc.id };
//                             matchingDocs.push(locationProd);
//                         }
//                     }
//                 }
//                 // console.log(matchingDocs);
//                 return matchingDocs;
//             })
//             .then((matchingDocs) => {
//                 // console.log(matchingDocs);
//                 return matchingDocs;
//             });
//         // const thingers = await Promise.all(thing)
//         // console.log(thing);
//         return thing;
//     }
// };
