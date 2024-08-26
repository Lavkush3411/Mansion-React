import { createSlice } from "@reduxjs/toolkit";
enum OrderStatus {
  Initiated = "Initiated",
  Accepted = "Accepted",
  Transit = "Transit",
  Delivered = "Delivered",
}

export enum PaymentStatus {
  Initiated = "Initiated",
  Success = "Success",
  Pending = "Pending",
  Failed = "Failed",
}

interface productType {
  productId: string;
  productName: string;
  productPrice: number;
  size: string;
  qty: number;
  image: string;
}

interface OrderType {
  _id: string;
  userId: string;
  products: productType[];
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
}

const initialData: OrderType[] = [];

const transactionListSlice = createSlice({
  name: "transactions",
  initialState: initialData,
  reducers: {
    updateTransactionsData(_, payload) {
      return payload.payload;
    },
  },
});

export default transactionListSlice.reducer;
export const { updateTransactionsData } = transactionListSlice.actions;
export type { OrderType };
