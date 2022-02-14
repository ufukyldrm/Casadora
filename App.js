import React, { Component } from "react";
import { View, Text } from "react-native";
import LoginPage from "./Screens/BarkodScreen";
import HomesPage from "./Screens/HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/core";

import { observer } from "mobx-react";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //    alert("anasayfa")
      // The screen is focused
      // Call any action
    });
  }, [navigation]);

  return <HomesPage></HomesPage>;
}
function LoginScreen() {
  return <LoginPage></LoginPage>;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="anasayfa"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="barkod" component={LoginScreen} />
          <Stack.Screen name="anasayfa" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default observer(App);
