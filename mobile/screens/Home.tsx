import { VStack } from "native-base"
import { StyleSheet } from 'react-native'
import Card from '../components/Card/Index'
import Footer from '../components/Footer'

import NewCard from '../components/NewCard'
import AppBar from "../components/PageComponent/AppBar"
import { Text } from '../components/Themed'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen( { navigation }: RootTabScreenProps<'Home'> )
{
  return (
    <>
      <AppBar title="Home" />
      <VStack style={styles.container} space={4}>
        <Text style={styles.title}>Welcome to FasoLara Mobile (WIP)</Text>
        <NewCard />
      </VStack>
    </>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
} )
