import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { async } from '@firebase/util';
import { number, string } from 'yup';
import { DetailedProductData } from 'src/types/products';

interface Cart {
    cart: DetailedProductData[];
}

// const initialCart: DetailedProductData[] | [] = {
//     cart: [],
// };

const initialCart: Cart | [] = {
    cart: [],
};

export const cartSlice = createSlice({
    /*
        Redux state management of the user component
    */
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addToCart: (state, action: PayloadAction<DetailedProductData>) => {
            console.log('This is from cart state');
            const inCart = state.cart.find((item) => item.id === action.payload.id);

            state.cart = inCart
                ? state.cart.map((item) =>
                      item.id === action.payload.id ? { ...action.payload } : item,
                  )
                : [...state.cart, { ...action.payload }];
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        removeAll: (state) => {
            state.cart = [];
        },
        adjustQty: (state, action: PayloadAction<string>) => {
            state.cart;
        },
    },
});

export const { addToCart, removeFromCart, removeAll, adjustQty } = cartSlice.actions;
export default cartSlice.reducer;
