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

      if (args.filter != "") {
        url = `${url}?filter=${args.filter}`;
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
  }
};

const Mutation = {
  async register(parent, args, context, info) {
    const input = args.input;

    try {
      const result = await fetch(`${USERS_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const user = await result.json();

      if (user.error) {
        throw new Error(user.error);
      }

      return user;
    } catch (e) {
      throw new Error(e);
    }
  },

  login: async (parent, args, context, info) => {
    const input = args.input;

    try {
      return await (
        await fetch(`${USERS_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })
      ).json();
    } catch (e) {
      return null;
    }
  },
};

module.exports = { Query, Mutation };
