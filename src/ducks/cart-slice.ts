import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { async } from '@firebase/util';
import { number, string } from 'yup';

interface Cart {
    cart: {
        id: number;
        name: string;
        qty: number;
        price: number;
        img: string;
    }[];
}

const initialCart: Cart = {
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

export const cartSlice = createSlice({
    /*
        Redux state management of the user component
    */
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            
        },
        removeFromCart: (state, action: PayloadAction<any>) => {
            cart: state.cart.filter((item) => item.id !== action.payload);
        },
        adjustQty: (state, action: PayloadAction<string>) => {},
    },
});

export const { addToCart, removeFromCart, adjustQty } = cartSlice.actions;
export default cartSlice.reducer;
