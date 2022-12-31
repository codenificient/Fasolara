const { gql } = require("apollo-server")
const accountTypes = require("./account")
const addressTypes = require("./address")
const bankTypes = require("./bank")
const commentTypes = require("./comment")
const countryTypes = require("./country")
const employeeTypes = require("./employee")
const investorTypes = require("./investor")
const orderTypes = require("./order")
const panelTypes = require("./panel")
const projectTypes = require("./project")
const provinceTypes = require("./province")
const salaryTypes = require("./salary")
const supplierTypes = require("./supplier")
const transactionTypes = require("./transaction")
const userTypes = require("./user")
const villageTypes = require("./village")

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`


export default [
  accountTypes,
  addressTypes,
  bankTypes,
  commentTypes,
  countryTypes,
  employeeTypes,
  investorTypes,
  orderTypes,
  panelTypes,
  projectTypes,
  provinceTypes,
  supplierTypes,
  salaryTypes,
  transactionTypes,
  villageTypes,
  typeDefs,
  userTypes,
]
