import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });
    return res.status(200).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      message: "All books",
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!book) return res.status(404).send("Book not found");
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
