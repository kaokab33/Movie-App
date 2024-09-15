import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Details from '../screens/Details';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DrawerNavigation" 
                component={DrawerNavigation}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                    title: 'Details',
                    headerStyle: {
                        backgroundColor: '#1c1d21',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}
