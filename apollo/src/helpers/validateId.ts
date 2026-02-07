import { Types } from "mongoose"

const isValid = async ( id: string ) =>
{
  return Types.ObjectId.isValid( id ) && new Types.ObjectId( id ).toString() === id
}

export { isValid }
