const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Book {
        bookId: ID!
        title: String!
        authors: [String]
        description: String
        image: String
        link: String
    }
    
    type Auth {
        token: String!
        user: User!
    }

    type Query {
        me(_id: ID, username: String): User
    }

    type Mutation {
        addUser(email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(book: BookInput!): User
        removeBook(bookId: ID!): User
    }

    input BookInput {
        bookId: ID!
        title: String!
        authors: [String]
        description: String
        image: String
        link: String
    }
`;

module.exports = typeDefs;