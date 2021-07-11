/* eslint-disable implicit-arrow-linebreak */
const fetch = require('node-fetch');
const Get = require('../../../models/get');
const { tableLibrary } = require('../../../lib/tableLibrary');

const { book: db_Book } = tableLibrary.knowledge.books;
const get = new Get(db_Book.tableName);

const noResultsString = 'No google results found';
const compareWithDB = true;

const parseAuthors = (authors) =>
  authors.map((author) => {
    const split = author.split(' ');
    const name = {
      first_name: split[0],
      last_name: split[split.length - 1],
      full_name: author,
    };
    return name;
  });

// eslint-disable-next-line object-curly-newline
const urlBuilder = (input, numberOfResultsRequested) => {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  url = input.title ? `${url}+intitle:${input.title}` : url;
  url = input.authors ? `${url}+inauthor:${input.authors}` : url;
  url = input.isbn ? `${url}+isbn:${input.isbn}` : url;
  url = `${url}&maxResults=${numberOfResultsRequested || 5}`;
  return url;
};

const createBook = async (input) => {
  // Parses google's isbn fields
  input.industryIdentifiers?.map((id) => (input[id.type.toLowerCase()] = id.identifier));
  const book = {
    title: input.title,
    authors: parseAuthors(input.authors),
    image: input.imageLinks?.thumbnail,
    description: input.description,
    from_database: false,
    isbn_10: input.isbn_10,
    isbn_13: input.isbn_13,
  };
  return book;
};

const findSimilarInDB = async (book) => {
  // Queries database using books from google API
  const dbResults = await get.filterForOneOfExact({
    title: book.title,
    isbn_10: book.isbn_10 || null,
    isbn_13: book.isbn_13 || null,
  });
  // Compares books to see how many keys match
  const res = {};
  dbResults.forEach((dbBook) => {
    Object.entries(book).forEach(([key]) => {
      res[key] = book[key] === dbBook[key];
    });
  });
  return res;
};

const performGoogleAPISearch = async ({ book_input: input, numberOfResultsRequested }) => {
  const url = urlBuilder(input, numberOfResultsRequested);
  const { items: books } = await fetch(url).then((raw) => raw.json());
  if (!books) return noResultsString;
  books.forEach(async ({ volumeInfo: book }, index) => {
    books[index] = await createBook(book);
    if (compareWithDB) books[index].similar_match = await findSimilarInDB(book);
  });
  return books;
};

module.exports = { performGoogleAPISearch };
