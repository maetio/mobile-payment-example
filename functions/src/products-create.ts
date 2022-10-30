import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
// import * as admin from "firebase-admin";

initializeApp();
// const db = firestore();

export const createDetailedProduct = functions.firestore
    .document('basic-product-data/{productID}')
    .onWrite((change, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = change.after.data();

        // access a particular field as you would any JS property

        if (newValue) {
            const name = newValue.name;
            console.log(name);
        }

        console.log('hello');
        // perform desired operations ...
    });
