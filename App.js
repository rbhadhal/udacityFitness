import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import reducer from './reducers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const RouteConfigs = {
      History: {
        screen: History,
        navigationOptions: {
          tabBarLabel: "History",
          tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />}},
      AddEntry: {
        screen: AddEntry,
        navigationOptions: {
          tabBarLabel: "Add Entry",
          tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />}},

  };

const TabNavigatorConfig = {
navigationOptions: {
header: null
},
tabBarOptions: {
activeTintColor: Platform.OS === "ios" ? purple : white,
style: {
height: 56,
backgroundColor: Platform.OS === "ios" ? white : purple,
shadowColor: "rgba(0, 0, 0, 0.24)",
shadowOffset: {
width: 0,
height: 3
},
shadowRadius: 6,
shadowOpacity: 1
}
}
};

const Tabs =
Platform.OS === "ios"
? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <Tabs/>
        </View>
      </Provider>
    )
  }
}
