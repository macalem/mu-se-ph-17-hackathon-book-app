import GenreService from './genres';
import genreData from '../../data/genres';

describe("GenreService", () => {

    describe("getAllGenres", () => {
        it("should return the list of genres", () => {
            expect(GenreService.getAllGenres()).toEqual(genreData);
        });
    });

    describe("getGenreByID", () => {
        it("should throw an error when genre ID was not provided", () => {
            expect(() => GenreService.getGenreByID()).toThrowError("Missing required parameter");
        });

        it("should return undefined if genre doesn't exist", () => {
            expect(GenreService.getGenreByID(100)).toBeUndefined();
        });

        it("should return specific genre when genre ID is provided", () => {
            expect(GenreService.getGenreByID("1")).toEqual(genreData[0]);
        });
    });

    describe("getGenreByName", () => {
        it("should throw an error when genre name was not provided", () => {
            expect(() => GenreService.getGenreByName()).toThrowError("Missing required parameter");
        });

        it("should return undefined if genre doesn't exist", () => {
            expect(GenreService.getGenreByName("Unit Test")).toBeUndefined();
        });

        it("should return specific genre when genre ID is provided", () => {
            expect(GenreService.getGenreByName("Science Fiction")).toEqual(genreData[0]);
        });
    });
});