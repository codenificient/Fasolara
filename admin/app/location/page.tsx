"use client"
import { useQuery } from "@apollo/client"
import Address from "@c/addresses/Address"
import Country from "@c/countries/Country"
import Province from "@c/provinces/Province"
import Village from "@c/villages/Village"
import { Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styles from '@cs/locations.module.scss'
import { GET_ADDRESSES, GET_COUNTRIES, GET_PROVINCES, GET_VILLAGES } from "lib/queries"

const Location = () =>
{
	const { data: address } = useQuery( GET_ADDRESSES )
	const { data: country } = useQuery( GET_COUNTRIES )
	const { data: province } = useQuery( GET_PROVINCES )
	const { data: village } = useQuery( GET_VILLAGES )

	// console.log( { address } )

	if ( !address ) return <h2>No addresses</h2>
	if ( !country ) return <h2>No countries</h2>
	if ( !province ) return <h2>No provinces</h2>
	if ( !village ) return <h2>No villages</h2>

	return <div className={styles.LocationWrapper} >
		<Tabs isFitted variant='enclosed' color={"whiteAlpha.500"}>
			<TabList mb='1em' className={styles.TabList}>
				<Tab>Addresses</Tab>
				<Tab>Countries</Tab>
				<Tab>Provinces</Tab>
				<Tab>Villages</Tab>
			</TabList>
			<TabPanels>

				<TabPanel>
					<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
						{
							address?.addresses?.map( ( address, idx ) => <Address key={address.id} address={address} index={idx} /> )
						}
					</Grid>
				</TabPanel>
				<TabPanel>
					<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
						{
							country?.countries.map( ( country, idx ) => <Country key={country.id} country={country} index={idx} /> )
						}
					</Grid>
				</TabPanel>
				<TabPanel>
					<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
						{
							province?.provinces.map( ( province, idx ) => <Province key={province.id} province={province} index={idx} /> )
						}
					</Grid>
				</TabPanel>
				<TabPanel>
					<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
						{
							village?.villages.map( ( village, idx ) => <Village key={village.id} village={village} index={idx} /> )
						}
					</Grid>
				</TabPanel>
			</TabPanels>
		</Tabs>

	</div>
}

export default Location
