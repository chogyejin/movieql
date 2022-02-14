import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
  // 설정
  typeDefs: "graphql/schema.graphql",
  resolvers,
});

server.start(() => console.log("Server is running"));
