import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Box, Slider, FlatList } from 'native-base';
import MapView, { Marker, Circle, LatLng } from 'react-native-maps';
import { Geopoint } from 'geofire-common';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { BasicProductDataID } from 'src/types/products';
import { ActivityIndicator } from 'react-native';
import { DistanceProducts } from 'src/types/products';
import { useFetchLocationProductsQuery } from 'src/services/products-queries';
import { Product } from 'src/cards/product';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { ProductStackParam } from 'src/navigation/product-stack';
import { Region } from 'react-native-maps';
import { MapStackParams } from 'src/navigation/map-stack';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_API_KEY } from '@env';

// type ProductScreenProps = StackNavigationProp<ProductStackParam, 'Product'>;
type ProductScreenProps = StackNavigationProp<MapStackParams, 'MapExploreProducts'>;

export const MapViewScreen = () => {
    const navigation = useNavigation<ProductScreenProps>();

    const mapRef = useRef<MapView | null>(null);

    // const [initialLocation, setInitialLocation] = useState<Geopoint | undefined>();
    const [initialLocation, setInitialLocation] = useState<LatLng | undefined>();

    const [currentLocation, setCurrentLocation] = useState<Region>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [inputToRTK, setInputToRTK] = useState<DistanceProducts>();
    const [product, setProducts] = useState<BasicProductDataID[]>();
    // const [distanceLabel, setDistanceLabel] = useState(50);
    const [distance, setDistance] = useState(50);

    const [regionChange, setRegionChange] = useState<Region>();

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
            // const loxz: Geopoint = [locationz.coords.latitude, locationz.coords.longitude];

            setInitialLocation({
                latitude: locationz.coords.latitude,
                longitude: locationz.coords.longitude,
            });

            setCurrentLocation({
                latitude: locationz.coords.latitude,
                longitude: locationz.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    useEffect(() => {
        setProducts(data);
    }, [data]);

    // for using slider

    // useEffect(() => {
    //     const datas = {
    //         loc: location,
    //         dis: distance,
    //     };
    //     setInputToRTK(datas);
    // }, [distance]);

    // END of using slider effect

    // New way to get  it off of the current location of map

    useEffect(() => {
        if (regionChange) {
            const locGeopoint: Geopoint = [regionChange.latitude, regionChange.longitude];
            const datas = {
                loc: locGeopoint,
                dis: regionChange.latitudeDelta * 500 * 110.9472,
            };

            console.log(datas);

            // setInitialLocation(locx);

            setInputToRTK(datas);
        }
    }, [regionChange]);

    useEffect(() => {
        if (currentLocation) {
            mapRef.current?.animateToRegion(currentLocation);
        }
    }, [currentLocation]);

    // END of NEW way

    return (
        <Box style={styles.container} flex={1} alignItems="center">
            {initialLocation && currentLocation ? (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    onRegionChangeComplete={(e) => {
                        console.log('e');
                        console.log(e);

                        setRegionChange(e);
                    }}
                    initialRegion={{
                        latitude: initialLocation.latitude,
                        longitude: initialLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        title="You Are Here"
                        coordinate={{
                            latitude: initialLocation.latitude,
                            longitude: initialLocation.longitude,
                        }}></Marker>
                    {product &&
                        product.map((prod) => {
                            return (
                                <Marker
                                    onPress={() => {
                                        if (prod.id) {
                                            navigation.navigate('Product', {
                                                id: prod.id,
                                            });
                                        }
                                    }}
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
                        center={{
                            latitude: initialLocation.latitude,
                            longitude: initialLocation.longitude,
                        }}
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
            {/* 
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
            </Slider> */}

            {/* <Text>{distanceLabel}Km</Text> */}
            <Text>
                {initialLocation &&
                    `Your Location, ${initialLocation.latitude}, ${initialLocation.longitude}`}
            </Text>
            <Text>
                {regionChange &&
                    `Map Location, ${regionChange.latitude.toFixed(
                        6,
                    )}, ${regionChange.longitude.toFixed(6)}`}
            </Text>

            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0,
                        width: '100%',
                    },
                    textInput: {
                        fontSize: 18,
                    },
                }}
                textInputProps={{
                    returnKeyType: 'string',
                }}
                minLength={2}
                enablePoweredByContainer={false}
                placeholder="Search Bar"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                onPress={(data, details = null) => {
                    if (details) {
                        setCurrentLocation({
                            latitude: details?.geometry.location.lat,
                            longitude: details?.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        });
                    }
                }}
                fetchDetails={true}
                onFail={(error) => console.error(error)}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                }}
            />

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

// Styles

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        height: '50%',
    },
    containerz: {
        // padding: 10,
        // alignSelf: 'flex-start',
        backgroundColor: '#ecf0f1',
    },
});

// End of styles
