import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from "native-base"
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MyDrawer from './components/DrawerNavigation'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export default function App()
{
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if ( !isLoadingComplete )
  {
    return null
  } else
  {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <MyDrawer />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    )
  }
}
