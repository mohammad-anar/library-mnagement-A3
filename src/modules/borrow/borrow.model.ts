import { Schema, model, Document } from "mongoose";

interface IBorrow extends Document {
  book: Schema.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be positive"],
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
