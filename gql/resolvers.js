const fetch = require("node-fetch");

const BOOKS_API_URL = process.env.BOOKS_API;
const USERS_API_URL = process.env.USERS_API;

const Query = {
  users: async (parent, args, context, info) => {
    try {
      return await (await fetch(`${USERS_API_URL}/users`)).json();
    } catch (e) {
      return null;
    }
  },

  user: async (parent, args, context, info) => {
    try {
      return await (await fetch(`${USERS_API_URL}/users/${args.id}`)).json();
    } catch (e) {
      return null;
    }
  },

  books: async (parent, args, context, info) => {
    try {
      let url = `${BOOKS_API_URL}/books`;

      if (args.filter.genre != "") {
        url = `${url}?genre=${args.filter.genre}`;
      }

      console.log(url);

      return await (await fetch(url)).json();
    } catch (e) {
      return null;
    }
  },

  book: async (parent, args, context, info) => {
    try {
      return await (await fetch(`${BOOKS_API_URL}/books/${args.id}`)).json();
    } catch (e) {
      return null;
    }
  },
};

module.exports = { Query };
