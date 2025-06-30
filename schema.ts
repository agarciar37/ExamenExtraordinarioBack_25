export const typeDefs = `#graphql
  type Character {
    id: ID!
    name: String!
    alternate_names: [String!]!
    species: String!
    gender: String!
    house: House
  }

  type House {
    name: String!
    characters: [Character!]!
  }

  type Query {
    getCharacter(id: ID!): Character
    getCharacters(ids: [ID!]): [Character!]!
  }
`;
