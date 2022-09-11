import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome to FasoLara</Text>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#232323',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#aaa',
    fontSize: 'larger',
	}
})
