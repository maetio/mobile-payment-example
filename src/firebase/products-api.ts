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

interface Thing {
    QueryDocumentSnapshot: DocumentData;
    id: string;
}

export const fetchInitialData = async () => {
    const colRef = collection(db, 'basic-product-data');
    const q = query(colRef, orderBy('price'), limit(3));
    const productData = await getDocs(q);

    const prod: BasicProductData[] = [];

    const lastDoc = productData.docs[productData.docs.length - 1];

    console.log(lastDoc);

    productData.docs.forEach((doc) => {
        const datas = { ...doc.data(), id: doc.id };
        prod.push(datas);
    });

    return { prod, lastDoc };
};

export const fetchMoreData = async (lastItemDocument: any) => {
    const colRef = collection(db, 'basic-product-data');
    const q = query(colRef, orderBy('price'), startAfter(lastItemDocument), limit(3));
    const prod: BasicProductData[] = [];
    const productData = await getDocs(q);

    const lastDoc = productData.docs[productData.docs.length - 1];

    productData.docs.forEach((doc: any) => {
        const data = { ...doc.data(), id: doc.id } as BasicProductData;
        prod.push(data);
    });
    return { prod, lastDoc };
};

export const fetchDetailedData = async (id: string) => {
    const docRef = doc(db, 'detailed-product-data', id);
    const docSnap = await getDoc(docRef);
    const detailedProductData = { ...docSnap.data(), id } as DetailedProductData;

    return detailedProductData;
};
