import React, { useState, useEffect } from 'react';
import { Box, Text } from 'native-base';
import * as Location from 'expo-location';

export const MapScreen = () => {
    const [location, setLocation] = useState<object | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

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
        </Box>
    );
};
