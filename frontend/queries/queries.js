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

export {
    getUserQuery,
    getUsersQuery,
    getProvincesQuery,
    getVillagesQuery
}