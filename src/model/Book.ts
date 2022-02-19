import { Schema, model, Document } from "mongoose";

export interface IBook extends Document {
 
}

const BookSchema: Schema = new Schema({
 
});

export default model<IBook>("book", BookSchema);