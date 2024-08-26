import { createSlice } from "@reduxjs/toolkit";
enum OrderStatus {
  Initiated,
  Placed,
  Accepted,
  Packed,
  Transit,
  OutForDelivery,
  Delivered,
}
export enum PaymentStatus {
  Initiated,
  Success,
  Pending,
  Failed,
}

interface DataType {
  _id: string;
  userId: string;
  products: string;
  totalAmount: string;
  createdAt: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
}

const initialData: DataType[] = [];

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
export type { DataType };
