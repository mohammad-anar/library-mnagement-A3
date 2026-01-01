import type { NextFunction, Request, Response } from "express";
import { Book } from "./book.model.js";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create(req.body);
    res.json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
      page = "1",
    } = req.query;

    const query: any = {};
    if (filter) query.genre = filter;

    const limitNumber = Number(limit);
    const pageNumber = Number(page);
    const skip = (pageNumber - 1) * limitNumber;

    const [books, total] = await Promise.all([
      Book.find(query)
        .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limitNumber),
      Book.countDocuments(query).skip(skip).limit(limitNumber),
    ]);

    const totalPages = Math.ceil(total / limitNumber);

    res.json({
      success: true,
      message: "Books retrieved successfully",
      meta: {
        total,
        limit: limitNumber,
        page: pageNumber,
        totalPages,
        filter: filter || null,
        sortBy,
        sort,
      },
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
