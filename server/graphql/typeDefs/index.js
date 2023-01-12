const { gql } = require("apollo-server")
const accountTypes = require("./account")
const addressTypes = require("./address")
const bankTypes = require("./bank")
const commentTypes = require("./comment")
const conversationTypes = require("./conversation")
const countryTypes = require("./country")
const employeeTypes = require("./employee")
const investorTypes = require("./investor")
const orderTypes = require("./order")
const panelTypes = require("./panel")
const projectTypes = require("./project")
const provinceTypes = require("./province")
const salaryTypes = require("./salary")
const supplierTypes = require("./supplier")
const teamTypes = require("./team")
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
module.exports = [
  accountTypes,
  addressTypes,
  bankTypes,
  commentTypes,
  conversationTypes,
  countryTypes,
  employeeTypes,
  investorTypes,
  orderTypes,
  panelTypes,
  projectTypes,
  provinceTypes,
  supplierTypes,
  salaryTypes,
  teamTypes,
  transactionTypes,
  villageTypes,
  typeDefs,
  userTypes,
]
