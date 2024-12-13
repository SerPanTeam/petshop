import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/api";

type ProductPosition = {
  product: Product;
  count: number;
};

type CartState = {
  cartPositions: ProductPosition[];
};

// Загружаем сохранённое состояние из localStorage
const savedCart = localStorage.getItem("cartPositions");
const persistedCart = savedCart ? JSON.parse(savedCart) : [];

const initialState: CartState = {
  cartPositions: persistedCart,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductPosition>) {
      const curElement = state.cartPositions.find(
        (val) => val.product.id === action.payload.product.id
      );
      if (curElement) {
        if (curElement.count + action.payload.count > 0)
          curElement.count += action.payload.count;
      } else {
        state.cartPositions.push(action.payload);
      }
    },
    delProduct(state, action: PayloadAction<number>) {
      state.cartPositions = state.cartPositions.filter(
        (val) => val.product.id !== action.payload
      );
    },
    resetCart(state) {
      state.cartPositions = [];
    },
  },
});

export const { addProduct, delProduct, resetCart } = CartSlice.actions;
export default CartSlice.reducer;
