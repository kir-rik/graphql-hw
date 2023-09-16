import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./typeDefs.js";

type Book = {
  title: string,
  author: string,
}

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers =  {
  Query: {
    books: (): Book[] => books,
  },
  Mutation: { 
    addBook: (_, { title, author}): Book => {
      const book = { title, author }
      books.push({ title, author })

      return book
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
