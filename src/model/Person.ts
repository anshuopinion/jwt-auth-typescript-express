import { Schema, model, Document } from "mongoose";

export interface IPerson extends Document {
 
}

const PersonSchema: Schema = new Schema({
 
});

export default model<IPerson>("Person", PersonSchema);