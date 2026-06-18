import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
    seatId: string;
    ticketTypeId: string;
    price: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            state.items.push(action.payload);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                item => item.seatId !== action.payload
            );
        },
        toggleSeat(state, action: PayloadAction<CartItem>) {
            const exists = state.items.find(
                i => i.seatId === action.payload.seatId
            );

            if (exists) {
                state.items = state.items.filter(
                    i => i.seatId !== action.payload.seatId
                );
            } else {
                state.items.push(action.payload);
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    toggleSeat,
} = cartSlice.actions;

export default cartSlice.reducer;