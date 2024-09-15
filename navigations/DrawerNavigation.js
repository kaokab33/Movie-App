import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import routes from '../utils/routes';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#1a1a1a',
                    width: 240,
                },
                drawerActiveBackgroundColor: '#333',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#ccc',
                headerStyle: {
                    backgroundColor: '#2a2a2a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Drawer.Screen
                name={routes.home} 
                component={Home}
                options={{
                    title: 'Home',
                }}
            />
            <Drawer.Screen
                name={routes.favourites}
                component={Favourites}
                options={{
                    title: 'Favourites',
                }}
            />
        </Drawer.Navigator>
    );
}
