const Book = require("./book.model");
const User = require("../user/user.model");

// LIST

exports.list = async (filter, paginated) => {
  let books;
  if (paginated?.page && paginated?.limit) {
    books = await Book.find({ ...filter })
      .skip((+paginated.page - 1) * paginated.limit)
      .limit(paginated.limit);
  } else {
    books = await Book.find({ ...filter });
  }
  return {
    code: 200,
    success: true,
    books,
  };
};

// CREATE

exports.create = async (form) => {
  let book = new Book(form);
  await book.save();
  await User.findByIdAndUpdate(form.userId, { $push: { books: book._id } });
  return {
    code: 200,
    success: true,
    book,
  };
};

// DELETE

exports.delete = async (id) => {
  let found = await this.getById(id);
  if (found.success) {
    await Book.findByIdAndDelete(id);
    await User.findByIdAndUpdate(found.book.userId, {
      $pull: { books: found.book._id },
    });
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Book Not Found!",
    };
  }
};

// UPDATE

exports.update = async (id, form) => {
  await Book.findByIdAndUpdate(id, form);
  let { book } = await this.getById(id);
  if (book) {
    return {
      code: 200,
      success: true,
      book,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "book Not Found!",
    };
  }
};

// GET_BY_ID

exports.getById = async (id) => {
  let book = await Book.findById(id);
  if (book) {
    return {
      code: 200,
      success: true,
      book,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Book Not Found!",
    };
  }
};

// GET_RECORDS

exports.get = async (filter) => {
  let book = await Book.findOne(filter);
  if (book) {
    return {
      code: 200,
      success: true,
      book,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Book Not Found!",
    };
  }
};

// GET_PAGINATED_SET

exports.getPaginated = async (page = 1, size = 5) => {
  let skipped = (+page - 1) * size;
  let books = await Book.find({}).skip(skipped).limit(size);
  return {
    code: 200,
    success: true,
    books,
  };
};
