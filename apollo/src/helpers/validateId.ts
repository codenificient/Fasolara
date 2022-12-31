const {
  Types: { ObjectId },
} = require( "mongoose" )

const isValid = async ( id: string ) =>
{
  return ObjectId.isValid( id ) && new ObjectId( id ).toString() === id
}

export { isValid }
