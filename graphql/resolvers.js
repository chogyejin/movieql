import { getMovies, getById, addMovie, deleteMovie } from "./db";

const resolvers = {
  Query: {
    // person: function () {
    //   return chogyejin;
    // },
    movies: () => getMovies(),
    movie: (_, { id }) => getById(id), // {id} == agrs.id
  },
  Mutation: {
    addMovie: (_, { name, score }) => addMovie(name, score),
    deleteMovie: (_, { id }) => deleteMovie(id),
  },
};

export default resolvers;
