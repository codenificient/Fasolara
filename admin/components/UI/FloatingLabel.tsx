import
{
	FormControl, FormLabel
} from "@chakra-ui/react"
import React from "react"


interface IFloatingInputProps
{
	id: string
	label: string
	type: string
	padding?: number
}

const FloatingLabelInput: React.FC<IFloatingInputProps> = ( { id, label, type, padding } ) =>
{
	return (
		<FormControl variant="floating" id={id} isRequired isInvalid>
			<input type={type} placeholder=" " />
			<FormLabel>{label}</FormLabel>
		</FormControl>
	)
}

export default FloatingLabelInput
