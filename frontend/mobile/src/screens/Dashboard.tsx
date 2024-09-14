import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard: React.FC = () => {

    const [token, setToken] = useState('');

    const getToken = async () => {
        const value = await AsyncStorage.getItem('token');
        return value !== null ? value : 'no token';

    };

    useEffect(() => {
        getToken().then((value) => {
          setToken(value);
        });
       //use effect will run after the screen complete render,
       //and rerender if there is a state change
     },[]);

    return (
        <View style={styles.container}>
            <Text>{token}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Dashboard;