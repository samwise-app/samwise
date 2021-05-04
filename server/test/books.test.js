// const knex = require('../src/knex');
// const { tableLibrary } = require('../knex/lib/tableLibrary');

// const BookAPI = require('../src/controllers/books/datasource');

// const api = new BookAPI();

// describe('Test get all books', () => {
//   it('responds with an array of books', async () => {
//     await expect(api.getAllBooks()).resolves.toEqual(expect.any(Array));
//   });
// });

// describe('Test get all books with authors', () => {
//   it('responds with an array of books with authors', async () => {
//     let books = await api.getAllBooksWithAuthors();
//     let firstBook = books[0];
//     expect(firstBook).toHaveProperty('authors');
//   });
// });

// describe('Test get one book with shortened title query', () => {
//   it('responds with A Short History of Nearly Everything', async () => {
//     let args = {
//       includeGoogleSearch:false,
//       book_input:{
//         title:"A Short History of Nearly"
//       }
//     }
//     let test = await api.getBook(args);
//     console.log(test);
//     // expect(test2).toHaveProperty('authors');
//   });
// });