import { useQuery } from "@apollo/client"
import TwInput from "@c/UI/TwInput"
import styles from "@cs/orders.module.scss"
import { GET_VILLAGES } from "lib/queries"

const CreateNewOrder = () =>
{
	// const {data: supplier} = useQuery(GET_VILLAGES)
	return (
		<div className={styles.FormWrapper}>
			<h2 className="text-2xl font-semibold text-gray-300 p-3">Create New Order</h2>
			<form className="mt-12 w-full" action="" method="POST">
				<select id="itemId" name="itemId" className="w-full mt-8 h-10">
					<option value="1">Selectionner un produit</option>
					<option value="1">Plaque solaire</option>
					<option value="2">Inverteur Solaire</option>
					<option value="3">Ecrous</option>
					<option value="3">Kites d'installation</option>
				</select>

				<TwInput id="name" label="name" name="name" placeholder="Enter order name" inputType="text" />

				<TwInput id="orderDate" label="Order Date" name="orderDate" placeholder="Select order date" inputType="date" />

				<select id="supplierId"  name="supplierId" placeholder="Select order supplier" className="w-full mt-8 h-10">
					<option value="1">Select Supplier</option>
					<option value="1">LG</option>
					<option value="2">Samsung Solar</option>
					<option value="3">Canadian Solar</option>
				</select>

				<TwInput id="quantity" label="Quantité" name="quantity" inputType="number" min={10} max={100} />

				<input type="sumbit" value="Sign in" className="mt-20 px-4 py-2 rounded  text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2  focus:ring-opacity-80 cursor-pointer" />
			</form>
			<br />
			{/* <TwSampleForm /> */}
		</div>
	)
}

export default CreateNewOrder
