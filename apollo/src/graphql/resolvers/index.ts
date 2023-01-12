import * as userResolvers from  "./user.js" 
import * as accountResolvers  from  "./account.js" 
import * as  addressResolvers  from  "./address.js" 
import * as  bankResolvers  from  "./bank.js" 
import * as  commentResolvers  from  "./comment.js" 
import * as  countryResolvers  from  "./country.js" 
import * as employeeResolvers  from  "./employee.js" 
import * as  investorResolvers  from  "./investor.js" 
import * as  orderResolvers  from  "./order.js" 
import * as  panelResolvers  from  "./panel.js" 
import * as  projectResolvers  from  "./project.js" 
import * as  provinceResolvers  from  "./province.js" 
import * as  salaryResolvers  from  "./salary.js" 
import * as  supplierResolvers  from  "./supplier.js" 
import * as  transactionResolvers  from  "./transaction.js" 
import * as  villageResolvers  from  "./village.js" 

import { DateTimeResolver } from  'graphql-scalars' 

const customScalarResolver = {
  Date: DateTimeResolver,
}

export default  [
  accountResolvers,
  addressResolvers,
  bankResolvers,
  commentResolvers,
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
  transactionResolvers,
  userResolvers,
  villageResolvers,
]
