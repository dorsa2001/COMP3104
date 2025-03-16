const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    first_name: String  
    last_name: String
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: String
    department: String!
    employee_photo: String
  }

  type Query {
    getAllUsers: [User]
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String

    addEmployee(
      first_name: String
      last_name: String!
      email: String!
      gender: String!
      designation: String!
      salary: Float!
      date_of_joining: String
      department: String!
      employee_photo: String
    ): Employee

    updateEmployee(
      id: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      designation: String
      salary: Float
      date_of_joining: String
      department: String
      employee_photo: String
    ): Employee

    deleteEmployee(id: ID!): String
  }
`;

module.exports = typeDefs;
