import { Schema, model, Document, Model, type SaveOptions } from "mongoose";

export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): void;
}

interface BookModel extends Model<IBook> {
  updateAvailabilityStatic(bookId: string): Promise<void>;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

bookSchema.statics.updateAvailabilityStatic = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) return;
  book.available = book.copies > 0;
  await book.save();
};

bookSchema.pre("save", function () {
  this.available = this.copies > 0;
});

export const Book = model<IBook, BookModel>("Book", bookSchema);
