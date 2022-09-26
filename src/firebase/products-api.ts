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
import { db } from 'src/firebase/firebase-config';
import { BasicProductData, DetailedProductData } from 'src/types/products';
import { converters } from './db-converters';

export const fetchProducts = async (lastDocumentID: string | undefined) => {
    const colRef = collection(db, 'basic-product-data').withConverter<BasicProductData>(
        converters.productData,
    );

    const lastVisible = lastDocumentID ? await getDoc(doc(colRef, lastDocumentID)) : null;

    const q = lastVisible
        ? query(colRef, orderBy('price'), startAfter(lastVisible), limit(3))
        : query(colRef, orderBy('price'), limit(3));
    const productData = await getDocs(q);

    const prod: BasicProductData[] = [];

    productData.docs.forEach((doc) => {
        const datas = { ...doc.data(), id: doc.id };
        prod.push(datas);
    });

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
