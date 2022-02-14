const chogyejin = {
  name: "chogyejin",
  age: 27,
  gender: "male",
};

const resolvers = {
  Query: {
    // person: function () {
    //   return chogyejin;
    // },
    person: () => chogyejin,
  },
};

export default resolvers;
