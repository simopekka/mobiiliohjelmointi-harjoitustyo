import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Etusivu from './Etusivu.js';
import Treenisivu from './Treenisivu.js';
import Kartta from './Kartta.js';

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
    activeColor="#B5EECB"
    inactiveColor="#0a0a0b"
    barStyle={{
      borderWidth: 0.5,
      borderBottomWidth: 1,
      backgroundColor:'#CBC7FC',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderColor: 'transparent',
      overflow: 'hidden',
      position: 'absolute',
      text:20
    }}
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Etusivu') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Treenit') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Kartta') {
            iconName = focused ? 'ios-map' : 'ios-map'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}
    >
      <Tab.Screen name="Etusivu" component={Etusivu} />
      <Tab.Screen name="Treenit" component={Treenisivu} />
      <Tab.Screen name="Kartta" component={Kartta} />
    </Tab.Navigator>
  );
}

export default Tabs;