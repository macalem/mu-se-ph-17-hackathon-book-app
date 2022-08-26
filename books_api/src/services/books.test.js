

const createBooks = require('./books');
const books = require('../../data/books.js');

describe("createBooks", () => {
    it("should add new book", () => {
        //arrange
        const params = {
                "name": "book test",
                "dewey_decimal": "10101",
                "description": "this is book 21",
                "author": "My Author",
                "published_date": "1999-01-01",
                "genre_id": 2,
                "premium": 0,
                "file": "http://fileshare/book1.pdf",
                "isbn": "55555"
            
        }
        //act
       
       const result = createBooks.createBooks(params);
   
    
        //assert
       
        expect(result).toEqual(books);
    })
})