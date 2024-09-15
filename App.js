import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from './navigations/StackNavigation';
import MoviesContextProvider from './contexts/moviesContextProvider';
export default function App() {

  return (
    <>
      <MoviesContextProvider>
        <NavigationContainer>
          <StackNavigation></StackNavigation>
        </NavigationContainer>
      </MoviesContextProvider>
      <StatusBar backgroundColor="#ffffff" style="dark" />

    </>
  );
}

