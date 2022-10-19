import * as React from 'react';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { LocationArray } from 'src/types/products';
import { ActivityIndicator } from 'react-native';

export const MapViewTest = () => {
    const [location, setLocation] = useState<LocationArray>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        })();
    }, []);

    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location[0],
                        longitude: location[1],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            ) : (
                <ActivityIndicator color="#36d7b7" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
