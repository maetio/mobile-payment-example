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
    where,
    collectionGroup,
} from 'firebase/firestore';
import { db } from 'src/firebase/firebase-config';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import { converters } from './db-converters';

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

    // console.log('hello');
    // console.log(prod);
    return prod;
};

export const fetchDetailedData = async (id: string) => {
    const docRef = doc(db, 'detailed-product-data', id).withConverter(
        converters.detailedProductData,
    );
    const docSnap = await getDoc(docRef);
    const detailedProductData = { ...docSnap.data(), id };

    return detailedProductData;
};

export const fetchStripeProducts = async () => {
    // const productsRef = doc(db, 'products', 'prod_MW3R41nnioaoQO');
    const pricesCollecitonRef = collectionGroup(db, 'prices');
    const productsQuery = query(pricesCollecitonRef, where('active', '==', true));
    const productsQuerySnap = await getDocs(productsQuery);

    // const thing = await getDoc(productsRef);

    /// snapshot that contains all of the prices, that are active

    const products: any = [];

   

    await Promise.all(productsQuerySnap.docs.map(async (document:any) => {
        // console.log(document.id, ' => ', document.data());r
        const priceData = document.data();
        // console.log(priceData.product);
        const productsRef = doc(db, 'products', priceData.product);
        const basicProductRef = await getDoc(productsRef);
        const basicProductInfo = basicProductRef.data();
        // console.log(basicProductInfo);
        const data = {
            priceID: document.id,
            price: document.data(),
            ...basicProductInfo,
        };

        // console.log(data)

        products.push(data);
    }))

    // console.log(thing.data())

    // productsQuerySnap.docs.forEach(async (doc) => {
    //     // const pricesRef = collection(db, 'products', doc.id, 'prices');
    //     // const q = query(pricesRef);
    //     // const pricesQuerySnap = await getDocs(q);

    //     const pricesRef = collection(db, 'products', doc.id, 'prices');
    //     const pricesQuerySnap = await getDocs(pricesRef);

    //     try {
    //         let thing;

    //         pricesQuerySnap.forEach((price) => {
    //             thing = {
    //                 id: price.id,
    //                 ...price.data(),
    //             };
    //         });

    //         const datas = {
    //             id: doc.id,
    //             ...doc.data(),

    //             prices: thing,
    //         };

    //         products.push(datas);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    return products;
};
