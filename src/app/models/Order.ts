// src/app/models/Order.ts
import mongoose, { models, model, Model, Document } from "mongoose";

export interface IOrder extends Document {
  userEmail?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  cartProducts?: any;
  paid?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new mongoose.Schema(
  {
    userEmail: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    cartProducts: { type: Object },
    paid: { type: Boolean, default: true},
  },
  { timestamps: true }
);

// Use existing model if it exists (prevents overwrite errors in dev hot-reload)
export const Order: Model<IOrder> =
  (models && (models.Order as Model<IOrder>)) ||
  model<IOrder>("Order", OrderSchema);

// also export default for consumers using `import Order from "..."`
export default Order;
