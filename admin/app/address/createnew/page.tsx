"use client"
import { useMutation, useQuery } from "@apollo/client"
import
{
	Box, ChakraProvider, FormControl, HStack, Text, VStack
} from "@chakra-ui/react"
import { ErrorMessage, Field, Form, Formik } from 'formik'

import styles from '@cs/addresses.module.scss'
import { CREATE_ADDRESS } from "lib/mutations"
import { GET_VILLAGES } from "lib/queries"
import { FloatingLabelTheme } from "lib/theme"
import { validate } from "lib/validation/ValidateAddress"
import {  useState } from "react"
import { generateColor } from "utils/helpers"

export default function CreateAddress()
{
	const [villages, setVillages] = useState( [] )

	const [CreateAddress] = useMutation( CREATE_ADDRESS )

	const { data: village } = useQuery( GET_VILLAGES )


	return (
		<ChakraProvider theme={FloatingLabelTheme} >
			<Box p={8} className={styles.NewAddressWrapper}>
				<Text>Create New Address</Text>
				<VStack>
					<Formik
						initialValues={{
							name: "",
							locationId: "",
							villageId: "",
							addressType: "",
							address: "",
							dotcolor: "",
							mobileNumber: "",
						}}
						validate={values => { validate( values ) }}
						onSubmit={( values, { setSubmitting } ) =>
						{
							values.dotcolor = generateColor()
							CreateAddress( {
								variables: {
									...values,
								}
							} )
							setSubmitting( false )
						}}
					>
						{( { isSubmitting, handleBlur, values } ) => (
							<Form className={styles.AddressForm}>
								<Text pb={4} fontWeight="bold">Create New Address</Text>
								<FormControl variant="floating" id="address-new" isRequired isInvalid>
									<HStack>
										<Box py={4} w="400px">
											<Field name="name" type="text" />
											<ErrorMessage name="name" />
										</Box>
										<Box py={4} w="400px">

											<Field name="address" type="text" />
											<ErrorMessage name="address" />
										</Box>

									</HStack>
									<HStack>
										<Box py={4} w="400px">
											<Field as="select" name="villageId" id="villageId"
												onBlur={handleBlur}
												value={values.villageId}
											>
												{
													village && village.villages.map( ( vilage ) => (
														<option key={vilage.id} value={village.id}>{vilage.name}</option>
													) )
												}
											</Field>
										</Box>
										<Box py={4} w="400px">
											<span>Type d'addresse </span>
											<Field as="select" name="addressType" id="addressType"
												onBlur={handleBlur}
												value={values.addressType}
											>
												{
													["domicile", "bureau", "boulot", "ami", "banque", "qg", "branche", "medecin"].map( type => (
														<option key={type} value={type}>{type}</option>
													) )
												}
											</Field>
										</Box>
									</HStack>
									<button type="submit" disabled={isSubmitting}>
										Submit
									</button>
								</FormControl>
							</Form>
						)}
					</Formik>
				</VStack>
			</Box>
		</ChakraProvider>
	)
}
