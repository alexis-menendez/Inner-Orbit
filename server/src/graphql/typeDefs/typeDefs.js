const { gql } = require('@apollo/server'); // or '@apollo/server-express' if that's what you're using

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

module.exports = typeDefs;
