import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../../shared/src/services/authService';
import { RegisterFormData } from '../../../shared/src/types/auth';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
      username: '',
      email: '',
      password: '',
    });
    const navigation = useNavigation();

    const handleChange = (name: string, value: string) => {
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
      try {
        await register(formData.username, formData.email, formData.password);
        navigation.navigate('Login' as never);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(value) => handleChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
        />
        <Button title="Register" onPress={handleSubmit} />
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

  export default Register;