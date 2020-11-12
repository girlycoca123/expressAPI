const Book = require("../model/bookmodel")
const parseRequestBody = require("../utils/parseRequestBody")

//Adding new book
const addBook = async(req, response) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            yearPublished: req.body.yearPublished,
            price: req.body.price
        };

        const newBook = new Book(book);
        const result = await newBook.save();

        if (!result) {
            return response.status(400).json({
                error: "Add failed"
            })
        }
        response.status(200).json({
            message: "Book added successfully"
        });

    } catch (error) {
        return response.status(500).json({
            error
        })
    }

}

// get all books in the list
const getBooks = async(req, response) => {
    try {
        const books = await Book.find();
        if (!books) {
            return response.status(400).json({
                error: "Error in getting books"
            })
        }
        response.status(200).json({
            books
        })
    } catch (error) {
        return response.status(500).json({
            error
        })
    }
}

//Get specific book by id
const getBookById = async(req, response) => {
    try {
        const books = await Book.findOne({ _id: req.params.id })
        if (!books || books.length === 0) {
            return response.status(400).json({
                error: "Book not found"
            })
        }
        response.status(200).json({
            books
        })
    } catch (error) {
        return response.status(400).json({
            error
        })
    }
}

//Update details of a book
const updateBook = async(request, response) => {
    const updates = parseRequestBody(request.body);
    console.log(request.body);
    try {
        const result = await Book.updateOne({ _id: request.params.id }, { $set: updates }, { new: true });

        if (!result) {
            return response.status(400).json({
                error: "Error in updating a book"
            })
        }
        return response.status(200).json({
            result: result
        })


    } catch (e) {
        return response.status(400).json({
            error: e
        })
    }
}

//Delete a book in the store
const deleteBook = async(request, response) => {
    try {
        await Book.deleteOne({ _id: request.params.id }, (error, result) => {
            if (error) {
                return response.status(400).json({
                    error: error
                })
            }
            response.status(200).json({
                message: "Successfully deleted a book",
                result: result
            })

        })

    } catch (e) {
        return response.status(400).json({
            error: e
        })
    }
}


module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}