import { people, getById } from "./db";

const resolvers = {
  Query: {
    // person: function () {
    //   return chogyejin;
    // },
    people: () => people,
    person: (_, { id }) => getById(id), // {id} == agrs.id
  },
};

export default resolvers;
