import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Slider, FlatList } from 'native-base';
import MapView, { Marker, Circle } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { LocationArray } from 'src/types/products';
import { ActivityIndicator } from 'react-native';
import { DistanceProducts } from 'src/types/products';
import { useFetchLocationProductsQuery } from 'src/services/products-queries';
import { BasicProductData } from 'src/types/products';
import { Product } from 'src/cards/product';

export const MapViewTest = () => {
    const [location, setLocation] = useState<LocationArray>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [inputToRTK, setInputToRTK] = useState<DistanceProducts | undefined>();
    const [product, setProducts] = useState<BasicProductData[]>();
    const [distanceLabel, setDistanceLabel] = useState(50);
    const [distance, setDistance] = useState(50);
    const [regionChange, setRegionChange] = useState<any>();

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

            const datas = {
                loc: loxz,
                // dis: distance,
                dis: 1000,
            };
            setInputToRTK(datas);
        })();
    }, []);

    useEffect(() => {
        // getPost();
        setProducts(data);
        // console.log(product);
    }, [data]);

    useEffect(() => {
        const datas = {
            loc: location,
            dis: distance,
        };
        setInputToRTK(datas);
    }, [distance]);

    return (
        <Box style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    onRegionChangeComplete={(e) => {
                        console.log(e);
                        setRegionChange(e);
                    }}
                    initialRegion={{
                        latitude: location[0],
                        longitude: location[1],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        title="You Are Here"
                        coordinate={{ latitude: location[0], longitude: location[1] }}></Marker>
                    {product &&
                        product.map((prod) => {
                            return (
                                <Marker
                                    key={prod.id}
                                    title="Event"
                                    pinColor="gold"
                                    coordinate={{
                                        latitude: prod.lat,
                                        longitude: prod.long,
                                    }}></Marker>
                            );
                        })}
                    <Circle
                        center={{ latitude: location[0], longitude: location[1] }}
                        radius={1000 * distance}
                    />
                    {regionChange && (
                        <Circle
                            center={{
                                latitude: regionChange.latitude,
                                longitude: regionChange.longitude,
                            }}
                            radius={regionChange.latitudeDelta * 500 * 110.9472}
                        />
                    )}
                </MapView>
            ) : (
                <ActivityIndicator color="#36d7b7" />
            )}

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
            <Text>{location && `Location on Load, ${location[0]}, ${location[1]}`}</Text>
            <Text>
                {location &&
                    regionChange &&
                    `Changing Location, ${regionChange.latitude.toFixed(
                        6,
                    )}, ${regionChange.longitude.toFixed(6)}`}
            </Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        height: '50%',
    },
});
