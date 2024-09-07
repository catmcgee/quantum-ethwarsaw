import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../layouts/MainLayout';

export default function Home() {
  const navigation = useNavigation();

  return (
    <MainLayout>
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 20, textAlign: 'center', color: '#6B7280' }}>
        Where small voices inspire big change
      </Text>
      <View style={{ gap: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginWithWallet')}
          style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>
            Login with Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}