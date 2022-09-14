import React, { useState, useEffect, SetStateAction } from 'react';
import { db } from 'src/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Text } from 'native-base';
import { DetailedProductData } from 'src/types/products';

interface routeID {
    children: React.ReactNode;
    route: {
        children: React.ReactNode;
        params: {
            id: string;
        };
    };
}

export const ProductViewScreen: React.FC<routeID> = ({ route }) => {
    const [detailedData, setDetailedData] = useState<DetailedProductData | null>();
    const id = route.params.id;
    const docRef = doc(db, 'detailed-product-data', id);

    useEffect(() => {
        const getProducts = async () => {
            const docSnap = await getDoc(docRef);
            const thing = docSnap.data();

            setDetailedData(thing);
        };

        getProducts();
    }, []);

    console.log(detailedData);

    return (
        <Box>
            {/* {route.params.id} */}
            {detailedData ? (
                <>
                    <Text>{detailedData.name}</Text>
                    <Text>{detailedData.price}</Text>
                </>
            ) : (
                <Text>Something went wrong</Text>
            )}
            {/* <Text>{detailedData.name}</Text> */}
        </Box>
    );
};
