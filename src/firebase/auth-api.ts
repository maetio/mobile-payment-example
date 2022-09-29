// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signInAnonymously,
//     signOut,
//     fetchSignInMethodsForEmail,
//     deleteUser,
//     sendPasswordResetEmail,
//     sendEmailVerification,
// } from 'firebase/auth';
// import { auth } from './firebase-config';
// import { fbHandler, FirebaseError } from './handler';

// export { FirebaseError };

// /*
//   AUTH FUNCTIONS: https://firebase.google.com/docs/reference/js/auth.md#auth_package
// */
// // Sign In Anonymously
// export async function anonymousSignIn() {
//     console.log(auth.config);
//     // https://firebase.google.com/docs/reference/js/auth.md#signinanonymously
//     return fbHandler(signInAnonymously(auth));
// }

// // Check Sign In Methods
// export async function fetchSignInMethods(email: string) {
//     // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#fetchsigninmethodsforemail
//     return fbHandler(fetchSignInMethodsForEmail(auth, email));
// }

// // Sign In With Email
// export async function signInWithEmail(email: string, password: string) {
//     // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
//     return fbHandler(signInWithEmailAndPassword(auth, email, password));
// }

// // Sign Up With Email
// export async function signUpWithEmail(email: string, password: string) {
//     return fbHandler(createUserWithEmailAndPassword(auth, email, password));
// }

// // Email Verifcation:
// export async function verifyEmail() {
//     // https://firebase.google.com/docs/reference/js/auth.md#sendemailverification
//     if (auth.currentUser) {
//         return fbHandler(sendEmailVerification(auth.currentUser));
//     }
//     const error: FirebaseError = {
//         name: 'Firebase Error',
//         message: 'User does not exist',
//         code: 'auth/user-not-found',
//         errorCause: 'account',
//     };
//     return error;
// }

// // Delete user
// export async function deleteCurrentUser() {
//     if (auth.currentUser) {
//         console.log('deleting user');
//         // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
//         return fbHandler(deleteUser(auth.currentUser));
//     }
//     const error: FirebaseError = {
//         name: 'Firebase Error',
//         message: 'User does not exist',
//         code: 'auth/user-not-found',
//         errorCause: 'account',
//     };
//     return error;
// }

// // Sign Out
// export async function signOutUser() {
//     // Delete user if anonymous
//     if (auth.currentUser?.isAnonymous) {
//         return deleteCurrentUser();
//     }
//     return fbHandler(signOut(auth));
// }

// // Handle password reset
// export async function resetPassword(email: string) {
//     // https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
//     return fbHandler(sendPasswordResetEmail(auth, email));
// }

// NEW

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
    signOut,
    fetchSignInMethodsForEmail,
    deleteUser,
    sendPasswordResetEmail,
    sendEmailVerification,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateEmail,
    updatePassword,
} from 'firebase/auth';
import { auth } from './firebase-config';
import { fbHandler, FirebaseError } from './handler';

export { FirebaseError };

/*
AUTH FUNCTIONS: https://firebase.google.com/docs/reference/js/auth.md#auth_package
*/
// Sign In Anonymously
export async function anonymousSignIn() {
    // https://firebase.google.com/docs/reference/js/auth.md#signinanonymously
    return fbHandler(signInAnonymously(auth));
}

// Check Sign In Methods
export async function fetchSignInMethods(email: string) {
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#fetchsigninmethodsforemail
    return fbHandler(fetchSignInMethodsForEmail(auth, email));
}

// Sign In With Email
export async function signInWithEmail(email: string, password: string) {
    if (auth.currentUser?.isAnonymous) {
        console.log('deleting guest user');
        await signOutUser();
    }
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
    return fbHandler(signInWithEmailAndPassword(auth, email, password));
}

// Sign Up With Email
export async function signUpWithEmail(email: string, password: string) {
    if (auth.currentUser?.isAnonymous) {
        console.log('deleting guest user');
        await signOutUser();
    }
    return fbHandler(createUserWithEmailAndPassword(auth, email, password));
}

// Email Verifcation:
export async function verifyEmail() {
    // https://firebase.google.com/docs/reference/js/auth.md#sendemailverification
    if (auth.currentUser) {
        return fbHandler(sendEmailVerification(auth.currentUser));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

export async function reauthenticate(email: string, password: string) {
    const credential = EmailAuthProvider.credential(email, password);
    if (auth.currentUser) {
        return fbHandler(reauthenticateWithCredential(auth.currentUser, credential));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

// Delete user
export async function deleteCurrentUser() {
    if (auth.currentUser) {
        console.log('deleting user');
        // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
        return fbHandler(deleteUser(auth.currentUser));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

// Sign Out
export async function signOutUser() {
    // Delete user if anonymous
    if (auth.currentUser?.isAnonymous) {
        return deleteCurrentUser();
    }
    return fbHandler(signOut(auth));
}

// Handle password reset
export async function resetPassword(email: string) {
    // https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
    return fbHandler(sendPasswordResetEmail(auth, email));
}

// set new password
export async function setNewPassword(password: string) {
    // https://firebase.google.com/docs/reference/js/auth.md#updatepassword
    if (auth.currentUser) {
        console.log('Updating password');
        // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
        return fbHandler(updatePassword(auth.currentUser, password));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

// update email
export async function setNewEmail(email: string) {
    // https://firebase.google.com/docs/reference/js/auth.md#updateemail
    if (auth.currentUser) {
        console.log('Updating email');
        // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
        return fbHandler(updateEmail(auth.currentUser, email));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

export async function reloadUser() {
    // https://firebase.google.com/docs/reference/js/auth.user.md#userreload
    if (auth.currentUser) {
        await auth.currentUser.reload();
        return auth.currentUser;
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    throw error;
}
