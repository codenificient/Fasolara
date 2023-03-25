import { StyleSheet } from 'react-native'
import Card from '../components/Card/Index'
import Footer from '../components/Footer'

import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen( { navigation }: RootTabScreenProps<'Home'> )
{
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FasoLara Mobile (WIP)</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Card />
      <Footer />
    </View>
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
