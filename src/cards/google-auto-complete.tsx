import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
    GOOGLE_API_KEY,
} from '@env';

export const GooglePlacesInput = () => {
    console.log(GOOGLE_API_KEY);
    return (
        <GooglePlacesAutocomplete
            styles={{
                container: {
                    flex: 0,
                },
                textInput: {
                    fontSize: 18,
                },
            }}

            placeholder="Search fsd afds fdas"
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: GOOGLE_API_KEY,
                language: 'en',
            }}
        />
    );
};
