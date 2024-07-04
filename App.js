import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageCourse from './screens/ManageCourse';
import RecentCourses from './screens/RecentCourses';
import AllCourses from './screens/AllCourses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CourseOverview(){
  return(
    <Tab.Navigator 
      screenOptions={({ navigation })=>({
        headerStyle:{backgroundColor: 'pink'},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: 'pink'},
        tabBarActiveTintColor: 'darkblue',
        headerRight: ()=> (
          <Pressable 
            style={({pressed})=> pressed && styles.pressed} 
            onPress={() => {
              navigation.navigate('ManageCourse');
            }}
          >
            <View style={styles.iconContainer} >
              <AntDesign name="plus" size={24} color="white" />
            </View>
          </Pressable>
        )
      })} 
    >
      <Tab.Screen name="RecentCourses" component={RecentCourses}  
        options={{
          title: 'Signed Up Recently',
          tabBarLabel: 'Recently',
          tabBarIcon: ({ color, size })=> (
          <FontAwesome name="hourglass-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="AllCourses" component={AllCourses} 
      options={{
        title: 'All Courses',
        tabBarLabel: 'All Courses',
        tabBarIcon: ({ color, size })=> (
        <Entypo name="list"  size={size} color={color} />
        ),
      }}/>
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CourseOverview" component={CourseOverview} 
        options={{headerShown:false}}/>
        <Stack.Screen name="ManageCourse" component={ManageCourse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer:{
    marginHorizontal: 15,
    marginVertical: 10,
  },
  pressed:{
    opacity: 0.5
  },
});
