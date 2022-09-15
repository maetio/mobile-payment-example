import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/types/user';
import { async } from '@firebase/util';

const initialUser: User = {
    uid: '',
    email: '',
    phoneNumber: '',
    isAnonymous: false,
    emailVerified: false,
    loggedIn: false,
    count: 0,
    cart: [
        {
            id: 1,
            name: 'house1',
            qty: 1,
            price: 1000,
            img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
            id: 2,
            name: 'house2',
            qty: 1,
            price: 2000,
            img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
    ],
};

export const userSlice = createSlice({
    /*
        Redux state management of the user component
    */
    name: 'user',
    initialState: initialUser,
    reducers: {
        emailSignIn: (state, action: PayloadAction<User>) => {
            // updates the user object
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.isAnonymous = action.payload.isAnonymous;
            state.emailVerified = action.payload.emailVerified;

            state.loggedIn = true;
        },
        guestSignIn: (state, action: PayloadAction<string>) => {
            state.uid = action.payload;

            state.isAnonymous = true;
            state.loggedIn = true;
        },
        signOut: () => initialUser, // reset to initial state
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.loggedIn = true;
        },
        incrementCount: (state) => {
            state.count += 1;
        },
        decrementCount: (state) => {
            state.count -= 1;
        },
    },
});

export const { emailSignIn, guestSignIn, signOut, updateEmail, incrementCount, decrementCount } =
    userSlice.actions;
export default userSlice.reducer;
