const {
  Types: { ObjectId },
} = require("mongoose")

module.exports.isValid = async (id) => {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id
}
