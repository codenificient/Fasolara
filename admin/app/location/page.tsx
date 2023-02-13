"use client"
import Address from "@c/addresses/Address"
import Country from "@c/countries/Country"
import Province from "@c/provinces/Province"
import Village from "@c/villages/Village"
import { Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styles from '@cs/locations.module.scss'
import client from "lib/client"
import { GET_ADDRESSES, GET_COUNTRIES, GET_PROVINCES, GET_VILLAGES } from "lib/queries"


const Location = ( { villages, addresses, countries, provinces } ) =>
{
	if ( !villages ) return <h2>No villages</h2>
	if ( !addresses ) return <h2>No addresses</h2>
	if ( !countries ) return <h2>No countries</h2>
	if ( !provinces ) return <h2>No provinces</h2>

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
							addresses.map( (address, idx) => <Address key={address.id} address={address} index={idx} /> )
						}
					</Grid>
				</TabPanel>
				<TabPanel>
					<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
						{
							countries.map( (country, idx) => <Country key={country.id} country={country} index={idx} /> )
						}
					</Grid>
				</TabPanel>
				<TabPanel>
					<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
						{
							provinces.map( ( province, idx ) => <Province key={province.id} province={province} index={idx} /> )
						}
					</Grid>
				</TabPanel>
				<TabPanel>
					<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
						{
							villages.map( (village, idx) => <Village key={village.id} village={village} index={idx} /> )
						}
					</Grid>
				</TabPanel>
			</TabPanels>
		</Tabs>


	</div>
}

export default Location



