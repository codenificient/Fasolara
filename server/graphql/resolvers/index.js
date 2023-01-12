const userResolvers = require("./user");
const accountResolvers = require("./account");
const addressResolvers = require("./address");
const bankResolvers = require("./bank");
const commentResolvers = require("./comment");
const conversationResolvers = require("./conversation");
const countryResolvers = require("./country");
const employeeResolvers = require("./employee");
const investorResolvers = require("./investor");
const orderResolvers = require("./order");
const panelResolvers = require("./panel");
const projectResolvers = require("./project");
const provinceResolvers = require("./province");
const salaryResolvers = require("./salary");
const supplierResolvers = require("./supplier");
const teamResolvers = require("./team");
const transactionResolvers = require("./transaction");
const villageResolvers = require("./village");

const { DateTimeResolver } = require("graphql-scalars");

const customScalarResolver = {
  Date: DateTimeResolver,
};

module.exports = [
  accountResolvers,
  addressResolvers,
  bankResolvers,
  commentResolvers,
  conversationResolvers,
  countryResolvers,
  customScalarResolver,
  employeeResolvers,
  investorResolvers,
  orderResolvers,
  panelResolvers,
  projectResolvers,
  provinceResolvers,
  salaryResolvers,
  supplierResolvers,
  teamResolvers,
  transactionResolvers,
  userResolvers,
  villageResolvers,
];
