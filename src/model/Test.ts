import { Schema, model, Document } from "mongoose";

export interface ITest extends Document {
 
}

const TestSchema: Schema = new Schema({
 
});

export default model<ITest>("test", TestSchema);