import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// } 

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import BeforeLogin from './src/pages/before login';
import AfterLogin from './src/pages/AfterLogin';

export default function App() {

  return (
    <View style={styles.container}>
      {/* <BeforeLogin />; */}
      <AfterLogin />
    </View>
  );
  
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1f7',
  },
});
