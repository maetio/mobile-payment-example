import { collection, getDocs, query, orderBy, startAt, endAt } from 'firebase/firestore';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from './firebase-config';

export const fetchCloseData = async (location: any) => {
    const radius = 1000 * 1000;
    // const radius = Infinity;

    if (location?.length === 2) {
        const bounds = geohashQueryBounds(location, radius);
        const promises = [];

        for (const b of bounds) {
            const colRef = collection(db, 'basic-product-data') as any;
            const q = query(colRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));

            const datas = (await getDocs(q)) as any;

            promises.push(datas);
        }

        const thing = await Promise.all(promises)
            .then((snapShots) => {
                const matchingDocs: any = [];

                for (const snap of snapShots) {
                    for (const doc of snap.docs) {
                        const lat = doc.get('lat');
                        const lng = doc.get('long');

                        // console.log(lat);
                        // console.log(lng);

                        // We have to filter out a few false positives due to GeoHash
                        // accuracy, but most will match
                        const distanceInKm = distanceBetween([lat, lng], location);
                        const distanceInM = distanceInKm * 1000;
                        if (distanceInM <= radius) {
                            const locationProd = { ...doc.data(), id: doc.id };
                            matchingDocs.push(locationProd);
                        }
                    }
                }
                // console.log(matchingDocs);
                return matchingDocs;
            })
            .then((matchingDocs) => {
                // console.log(matchingDocs);
                return matchingDocs;
            });
        // const thingers = await Promise.all(thing)
        // console.log(thing);
        return thing;
    }
};
