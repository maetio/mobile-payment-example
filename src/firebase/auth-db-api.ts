import { setDoc, doc, getDoc } from 'firebase/firestore';
import { User } from 'src/types/user';
// import { QueryObject } from 'src/types/query-object';
import { converters } from './db-converters';
import { fbHandler, firestoreGetHandler } from './handler';
import { db } from './firebase-config';

export async function updateUser(user: User, newUser?: boolean) {
    /*
        Function will update the user with the input fields
        Will overwrite if newUser set to true
    */
    const userRef = doc(db, 'users', user.uid);
    return fbHandler(setDoc(userRef, user, { merge: !newUser }));
}

export async function getUser(userID: string) {
    /*
        Function will overwrite any users with the same uid
    */
    const uid = userID.startsWith('maet-') ? userID : `maet-user-${userID}`;
    const userRef = doc(db, 'users', uid).withConverter(converters.users);
    return firestoreGetHandler(getDoc(userRef));
}
