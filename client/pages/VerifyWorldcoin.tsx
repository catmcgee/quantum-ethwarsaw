import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VerifyWorldcoin() {
  const navigation = useNavigation();

  const handleVerify = () => {
    // currently not real
    setTimeout(() => {
      Alert.alert(
        "Verification Successful",
        "This is a simulated success. In a real app, this would verify with Worldcoin.",
        [
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]
      );
    }, 2000); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Login with Worldcoin</Text>
      <TouchableOpacity 
        onPress={handleVerify}
        style={{
          backgroundColor: '#4CAF50',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Verify with World ID</Text>
      </TouchableOpacity>
    </View>
  );
}