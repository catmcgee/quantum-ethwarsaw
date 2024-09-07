import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { W3mButton } from '@web3modal/wagmi-react-native';
import { useAccount } from 'wagmi';

export default function LoginWithWallet() {
  const navigation = useNavigation();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    console.log("Wallet connection status:", isConnected);
    console.log("Wallet address:", address);

    if (isConnected && address) {
      console.log("Navigating to ChatDashboard...");
      navigation.navigate('ChatDashboard', { walletAddress: address });
    }
  }, [isConnected, address, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Login with Wallet</Text>
      {}
      <W3mButton />
    </View>
  );
}
