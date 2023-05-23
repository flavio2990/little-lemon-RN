// import React from 'react';
// import { StyleSheet, Text, View, TextInput } from 'react-native';

// export default function ProfileScreen({ route }) {
//     const { firstName, email } = route
  
//     return (
//         <View style={styles.container}>
//             <Text>Profile Screen</Text>
//             <TextInput style={styles.input}
//             placeholder={firstName}> {firstName}</TextInput>
//             <TextInput style={styles.input}>{email}</TextInput>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     input: {
//         height: 40,
//         width: 200,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
// });
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    checkData();
  }, []);

  const checkData = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');
      const firstName=await AsyncStorage.getItem('@firstName');
      setFirstName(firstName)
      const email= await AsyncStorage.getItem('@email');
      setEmail(email)
      setIsDataLoaded(onboardingStatus === 'completed');
    } catch (error) {
      console.log('Error checking onboarding status:', error.message);
    }
  };
  if (!isDataLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>     
      <TextInput style={styles.input} value={firstName} />
      <TextInput style={styles.input} value={email} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
