import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
 
}

const ProductSchema: Schema = new Schema({
 
});

export default model<IProduct>("product", ProductSchema);