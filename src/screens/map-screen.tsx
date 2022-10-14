import React, { useState, useEffect } from 'react';
import { Box, Text, FlatList } from 'native-base';
import * as Location from 'expo-location';
import { geohashForLocation, geohashQueryBounds } from 'geofire-common';
import { db } from 'src/firebase/firebase-config';
import { collection, startAt, endAt, orderBy, query, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';
import { Product } from 'src/cards/product';

type Geopoint = [number, number];

export const MapScreen = () => {
    const [location, setLocation] = useState<Geopoint>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [product, setProducts] = useState();

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

    const fetchCloseData = async () => {
        const radius = 4 * 1000;

        if (location?.length === 2) {
            const bounds = geohashQueryBounds(location, radius);
            const promises = [];
            for (const b of bounds) {
                const colRef = collection(db, 'basic-product-data');
                const q = query(colRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));
                const data = await getDocs(q);
                // console.log(data);
                const matchingDocs = [];
                data.docs.forEach((doc) => {
                    console.log(doc.data());
                });
            }

            // return promises;
        }
    };

    const getPost = async () => {
        const thing: any = await fetchCloseData();
        setProducts(thing);
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <Box>
            <Text>Hello map</Text>
            <Text>{text}</Text>
            <Text>{product}</Text>
            {/* <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
                <FlatList
                    data={product}
                    renderItem={({ item }) => <Product productData={item} key={item.id} />}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.01}
                    scrollEventThrottle={150}
                />
            </Box> */}
        </Box>
    );
};
