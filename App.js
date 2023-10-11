import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './appNavigation';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
   
  );
}


export default App;