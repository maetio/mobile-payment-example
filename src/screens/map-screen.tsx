import React, { useState, useEffect } from 'react';
import { Box, Text, FlatList, Slider } from 'native-base';
import * as Location from 'expo-location';
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from 'src/firebase/firebase-config';
import { async } from '@firebase/util';
import { Product } from 'src/cards/product';
import { BasicProductData } from 'src/types/products';
import { converters } from 'src/firebase/db-converters';

import { fetchCloseData } from 'src/firebase/map-api';
import { useFetchLocationProductsQuery } from 'src/services/products-queries';
import { LocationArray } from 'src/types/products';
import { DistanceProducts } from 'src/types/products';

// type Location = [number, number];

export const MapScreen = () => {
    const [location, setLocation] = useState<LocationArray>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [product, setProducts] = useState<BasicProductData[]>();
    const [distance, setDistance] = useState<number>(50);
    const [inputToRTK, setInputToRTK] = useState<DistanceProducts | undefined>();
    const [distanceLabel, setDistanceLabel] = useState(50);

    const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
        useFetchLocationProductsQuery(inputToRTK);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let locationz = await Location.getCurrentPositionAsync({});

            // console.log(location.coords.latitude);
            const loxz: LocationArray = [locationz.coords.latitude, locationz.coords.longitude];

            setLocation(loxz);

            console.log(location);

            const datas = {
                loc: loxz,
                dis: distance,
            };
            setInputToRTK(datas);
        })();

        // const lat = 51.5074;
        // const lng = 0.1278;
        // const hash = geohashForLocation([lat, lng]);

        // console.log(hash);

        // text = JSON.stringify(location);

        // console.log(text.latitude);

        // const datas = {
        //     loc: location,
        //     dis: distance,
        // };
        // setInputToRTK(datas);
    }, []);

    useEffect(() => {
        // getPost();
        setProducts(data);
        console.log(product);
    }, [data]);

    useEffect(() => {
        const datas = {
            loc: location,
            dis: distance,
        };
        setInputToRTK(datas);
    }, [distance]);

    // const getPost = async () => {
    //     const thing: any = await fetchCloseData(location);
    //     console.log(`thing ${thing}`);
    //     console.log(thing);
    //     setProducts(thing);
    //     // console.log(product);
    // };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around" alignItems="center">
            <Text>Distance from your location</Text>
            <Slider
                w="3/4"
                maxW="300"
                defaultValue={distance}
                minValue={10}
                maxValue={2000}
                accessibilityLabel="hello world"
                step={100}
                onChangeEnd={(v) => {
                    setDistance(v);
                }}
                onChange={(v) => {
                    setDistanceLabel(v);
                }}>
                <Slider.Track>
                    <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
            </Slider>
            <Text>{distanceLabel}Km</Text>
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
