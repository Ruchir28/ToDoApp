import * as React from "react";
import { View, Text,StatusBar,StyleSheet } from "react-native";
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from './Reducers'
import middleware from './Middlewares'
import Home  from "./Components/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddTask from "./Components/AddTask";
import ViewTask from "./Components/ViewTask";
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants'

let store=createStore(reducer,middleware);

const Tab = createBottomTabNavigator();
function StatusBar1({backgroundColor,...props})
{
  return(
    <View style={{backgroundColor:{backgroundColor},height:Constants.statusBarHeight}}> 
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )

}
function Tabnavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon:()=><Icon size={32} color='orange' name='assignment'></Icon>}} />
        <Tab.Screen name="ViewTask" options={{tabBarIcon:()=><Icon size={32} color='orange'  name='list'></Icon>}} component={ViewTask} />
        <Tab.Screen name="AddTask" component={AddTask} options={{tabBarIcon:()=><Icon size={32} name='add' color='orange'></Icon>}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}



export default function App() {
 
  return (
    <Provider store={store}>
      <View style={styles.container}>
      <StatusBar1 backgroundColor='gray' barStyle='light-content'></StatusBar1>
      <Tabnavigation></Tabnavigation>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
