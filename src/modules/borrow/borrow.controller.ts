import type { NextFunction, Request, Response } from "express";
import { Book } from "../book/book.model.js";
import { Borrow } from "./borrow.model.js";

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const bookDoc = await Book.findById(book);
    if (!bookDoc || bookDoc.copies < quantity) {
      throw new Error("Not enough copies available");
    }

    bookDoc.copies -= quantity;
    bookDoc.updateAvailability();
    await bookDoc.save();

    const borrow = await Borrow.create({ book, quantity, dueDate });

    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (err) {
    next(err);
  }
};

export const borrowSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
};

export const BorrowController = {
  borrowBook,
  borrowSummary,
};
