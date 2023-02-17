"use client"
import
{
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl, FormErrorMessage, FormLabel, Input,
	VStack
} from "@chakra-ui/react"
import "@s/variables.scss"
import { Field, Formik } from "formik"
import { signIn } from "next-auth/react"



const LoginPage = () =>
{

	const loginUser = async ( values ) =>
	{
		const result = await signIn( "credentials", {
			email: values.email,
			password: values.password,
			redirect: true,
			callbackUrl: "/"
		} )
	}

	return (
		<Flex align="center" justify="center" h="100vh">
			<Box bg={"#272727"} p={6} rounded="md" w={64}>
				<Formik
					initialValues={{
						email: "christ@fasolara.com",
						password: "Testing2023",
						rememberMe: false
					}}
					onSubmit={( values ) =>
					{
						loginUser( values )
					}}
				>
					{( { handleSubmit, errors, touched } ) => (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="flex-start">
								<FormControl>
									<FormLabel htmlFor="email">Email Address</FormLabel>
									<Field
										as={Input}
										id="email"
										name="email"
										type="email"
										variant="filled"
									/>
								</FormControl>
								<FormControl isInvalid={!!errors.password && touched.password}>
									<FormLabel htmlFor="password">Password</FormLabel>
									<Field
										as={Input}
										id="password"
										name="password"
										type="password"
										variant="filled"
										validate={( value ) =>
										{
											let error

											if ( value.length < 6 )
											{
												error = "Password must contain at least 6 characters"
											}

											return error
										}}
									/>
									<FormErrorMessage>{errors.password}</FormErrorMessage>
								</FormControl>
								<Field
									as={Checkbox}
									id="rememberMe"
									name="rememberMe"
									colorScheme="purple"
								>
									Remember me?
								</Field>
								<Button type="submit" colorScheme="yellow" width="full">
									Login
								</Button>
							</VStack>
						</form>
					)}
				</Formik>
			</Box>
		</Flex>
	)
}

export default LoginPage
