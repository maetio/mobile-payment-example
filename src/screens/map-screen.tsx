import React, { useState, useEffect } from 'react';
import { Box, Text, FlatList } from 'native-base';
import * as Location from 'expo-location';
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from 'src/firebase/firebase-config';
import {
    collection,
    startAt,
    endAt,
    orderBy,
    query,
    getDocs,
    getDoc,
    doc,
} from 'firebase/firestore';
import { async } from '@firebase/util';
import { Product } from 'src/cards/product';
import { BasicProductData } from 'src/types/products';
import { converters } from 'src/firebase/db-converters';

import { fetchCloseData } from 'src/firebase/map-api';
// import { useFetchLocationProductsQuery } from 'src/services/products-queries';

type Location = [number, number];

export const MapScreen = () => {
    const [location, setLocation] = useState<Location>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [product, setProducts] = useState<BasicProductData[]>();

    // const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
    //     useFetchLocationProductsQuery(location);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            // console.log(location.coords.latitude);

            setLocation([location.coords.latitude, location.coords.longitude]);
        })();

        // const lat = 51.5074;
        // const lng = 0.1278;
        // const hash = geohashForLocation([lat, lng]);

        // console.log(hash);

        // text = JSON.stringify(location);

        // console.log(text.latitude);
    }, []);

    useEffect(() => {
        getPost();
        console.log(product);
    }, [location]);

    // const fetchCloseData = async () => {
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

    const getPost = async () => {
        const thing: any = await fetchCloseData(location);
        console.log(`thing ${thing}`);
        console.log(thing);
        setProducts(thing);
        // console.log(product);
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
            <FlatList
                data={product}
                renderItem={({ item }) => <Product productData={item} key={item.id} />}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.01}
                scrollEventThrottle={150}
            />
        </Box>
    );
};
