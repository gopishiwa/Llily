import 'react-native-gesture-handler';

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import App from './src/app/App';
import {name as appName} from './app.json';

function Main() {
  return (
    <PaperProvider
      settings={{
        icon: (props) => <Ionicons {...props} />,
      }}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
