import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
 
}

const OrderSchema: Schema = new Schema({
 
});

export default model<IOrder>("order", OrderSchema);