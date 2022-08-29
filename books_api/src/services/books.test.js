import BookService from "./books";
import bookData from "../../data/books";
import genres from "../../data/genres";

const testBook = {
  ...bookData[0],
  genre: genres.find((genre) => genre.id == bookData[0].genre_id).name,
};

describe("BookService", () => {
  describe("getAllBooks", () => {
    it("should return the list of users", () => {
      expect(BookService.getAllBooks()).toContainEqual(testBook);
    });
  });

  describe("getBookByID", () => {
    it("should throw an error when books ID was not provided", () => {
      expect(() => BookService.getBookByID()).toThrowError(
        "Missing required parameter"
      );
    });

    it("should return undefined if book doesn't exist", () => {
      expect(BookService.getBookByID(100)).toBeUndefined();
    });

    it("should return specific user when user ID is provided", () => {
      expect(BookService.getBookByID("1")).toEqual(testBook);
    });
  });

  describe("createBook", () => {
    let testData = [
      {
        name: "Name",
        params: {
          author: "Pepe",
          file: "http://fileshare/book1.pdf",
          isbn: "00000",
        },
        errMsg: "Missing required parameters",
      },
      {
        name: "Author",
        params: {
          name: "Noli Me Tangere",
          file: "http://fileshare/book1.pdf",
          isbn: "00000",
        },
        errMsg: "Missing required parameters",
      },
      {
        name: "File",
        params: {
          name: "Noli Me Tangere",
          author: "Pepe",
          isbn: "00000",
        },
        errMsg: "Missing required parameters",
      },
      {
        name: "ISBN",
        params: {
          name: "Noli Me Tangere",
          author: "Pepe",
          file: "http://fileshare/book1.pdf",
        },
        errMsg: "Missing required parameters",
      },
    ];
    testData.map((test) => {
      it(`should throw an error when ${test.name} param was not provided`, () => {
        expect(() => BookService.createBook(test.params)).toThrowError(
          test.errMsg
        );
      });
    });

    it("should throw an error when book already exists", () => {
      expect(() =>
        BookService.createBook({
          name: "Noli Me Tangere",
          dewey_decimal: "10101",
          description: "this is book one",
          author: "Pepe",
          published_date: "1999-01-01",
          genre_id: 2,
          premium: 0,
          file: "http://fileshare/book1.pdf",
          isbn: "00000",
          cover: "/assets/image 5.png",
          status: "PENDING",
        })
      ).toThrowError("Book already exists");
    });

    it("should return a book", () => {
      expect(
        BookService.createBook({
          name: "Unit Test",
          dewey_decimal: "10101",
          description: "this is book one",
          author: "Pepe",
          published_date: "1999-01-01",
          genre_id: 2,
          premium: 0,
          file: "http://fileshare/book1.pdf",
          isbn: "202020",
          cover: "/assets/image 5.png",
          status: "PENDING",
        })
      ).toHaveProperty("id");
    });
  });
});
