import { gql } from 'apollo-boost'

const getUsersQuery = gql`
	{
		users {
			fullname
			id
		}
	}
`
const getProvincesQuery = gql`
	{
		provinces {
			name
			region
			villages {
				id
				name
			}
			seat
			id
		}
	}
`
const getVillagesQuery = gql`
	{
		villages {
			name
			population
			id
			urbanCommune
			province {
				id
				name
				seat
				region
			}
		}
	}
`
const getUserQuery = gql`
	query($id: ID) {
		user(id: $id) {
			name
			genre
			id
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`

export { getUserQuery, getUsersQuery, getProvincesQuery, getVillagesQuery }

// TODO Complete GET Query
/* 
    #TODO get village
    #TODO get user
   #TODO  get users
    #TODO get  panels
    #TODO get  address
    #TODO get bank
    #TODO get account
    #TODO get project
    #TODO get supplier
    #TODO get salary
    #TODO get location

*/

// TODO Complete CREATE queries

/* 
    #TODO CREATE village
    #TODO CREATE user
   #TODO  CREATE users
    #TODO CREATE  panels
    #TODO CREATE  address
    #TODO CREATE bank
    #TODO CREATE account
    #TODO CREATE project
    #TODO CREATE supplier
    #TODO CREATE salary
    #TODO CREATE location

*/

// TODO Complete UPDATE queries

/* 
    #TODO UPDATE village
    #TODO UPDATE villageS
    #TODO UPDATE user
   #TODO  UPDATE users
    #TODO UPDATE  panel
    #TODO UPDATE  panels
    #TODO UPDATE  address
    #TODO UPDATE  addressES
    #TODO UPDATE bank
    #TODO UPDATE bankS
    #TODO UPDATE account
    #TODO UPDATE accountS
    #TODO UPDATE project
    #TODO UPDATE projectS
    #TODO UPDATE supplier
    #TODO UPDATE supplierS
    #TODO UPDATE salary 
    #TODO UPDATE salaries
    #TODO UPDATE location
    #TODO UPDATE locations

*/

// TODO Complete DELETE queries
/* 
    #TODO DELETE village
    #TODO DELETE villageS
    #TODO DELETE user
   #TODO  DELETE users
    #TODO DELETE  panel
    #TODO DELETE  panels
    #TODO DELETE  address
    #TODO DELETE  addressES
    #TODO DELETE bank
    #TODO DELETE bankS
    #TODO DELETE account
    #TODO DELETE accountS
    #TODO DELETE project
    #TODO DELETE projectS
    #TODO DELETE supplier
    #TODO DELETE supplierS
    #TODO DELETE salary
    #TODO DELETE salarIES
    #TODO DELETE location
    #TODO DELETE locationS

*/
