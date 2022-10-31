// import { createDetailedProduct } from './products-create';
// import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// export { createDetailedProduct };

import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
// import {firestore} from "firebase-admin";

initializeApp();
// const db = firestore();

export const createDetailedProduct = functions.firestore
    .document("basic-product-data/{productID}")
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const name = newValue.name;
      console.log(name);

      // perform desired operations ...
    });
