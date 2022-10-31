import {
    collection,
    getDocs,
    query,
    orderBy,
    startAt,
    endAt,
    limit,
    GeoPoint,
} from 'firebase/firestore';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from './firebase-config';
import { BasicProductDataID } from 'src/types/products';
// import { GeoPoint } from 'firebase/firestore';
import { Geopoint } from 'geofire-common';
import { BasicProductData } from 'src/types/products';
import { converters } from './db-converters';
import { LatLng } from 'react-native-maps';

export const fetchCloseData = async (location: LatLng, distance: number) => {
    const radius = distance;

    console.log('radius');
    console.log(radius / 1000);

    const locationGeopoint: Geopoint = [location.latitude, location.longitude];

    const bounds = geohashQueryBounds(locationGeopoint, radius);
    console.log('bounds');
    console.log(bounds);
    const promises = [];

    // Docs way

    for (const b of bounds) {
        const colRef = collection(db, 'basic-product-data').withConverter<BasicProductData>(
            converters.productData,
        );

        // add switch case that makes query bases off distance/bounds

        let q;
        if (radius/1000 < 4) {
            q = query(colRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));
        } else {
            q = query(colRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]), limit(3));
        }

        // const q = query(colRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]), limit(3));
        // const q = query(colRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));

        // const q = query(colRef, orderBy('geohash'));

        const datas = await getDocs(q);

        promises.push(datas);
    }

    const promiseSnapshot = await Promise.all(promises);

    const matchingDocs: BasicProductDataID[] = [];

    for (const snap of promiseSnapshot) {
        for (const doc of snap.docs) {
            const lat = doc.get('lat');
            const lng = doc.get('long');

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween([lat, lng], locationGeopoint);
            const distanceInM = distanceInKm * 1000;
            console.log(distanceInKm);
            if (distanceInM <= radius) {
                const locationProd = { ...doc.data(), id: doc.id, distanceInKm };
                matchingDocs.push(locationProd);
            }
        }
    }
    // console.log(matchingDocs);

    return matchingDocs.sort((el1, el2) => {
        return (
            distanceBetween([el1.lat, el1.long], locationGeopoint) -
            distanceBetween([el2.lat, el2.long], locationGeopoint)
        );
    });
};
