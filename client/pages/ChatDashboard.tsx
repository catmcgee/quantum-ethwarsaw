import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccount, useDisconnect } from 'wagmi'; 
import { Client } from '@xmtp/react-native-sdk';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal'; 

export default function ChatDashboard() {
  const navigation = useNavigation();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [xmtpClient, setXmtpClient] = useState(null);

  useEffect(() => {
    if (isConnected && address) {
      initXmtpClient();
    } else {
      navigation.navigate('LoginWithWallet');
    }
  }, [isConnected, address]);

  const initXmtpClient = async () => {
    try {
      console.log('Attempting to initialize XMTP client...');
      
      const web3Modal = new Web3Modal();
      const provider = new ethers.providers.Web3Provider(await web3Modal.connect());
      const signer = provider.getSigner();
      console.log('Signer:', signer);

      const client = await Client.create(signer, { env: 'production' });

      setXmtpClient(client);
      fetchConversations(client);
    } catch (error) {
      console.error('Error initializing XMTP client:', error);
    }
  };

  const fetchConversations = async (client) => {
    try {
      const convos = await client.conversations.list();
      setConversations(convos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      navigation.navigate('LoginWithWallet');
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ChatDetail', { conversation: item, xmtpClient })}
    >
      <Text style={styles.peerAddress}>{item.peerAddress}</Text>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {item.messages[item.messages.length - 1]?.content || 'No messages'}
      </Text>
    </TouchableOpacity>
  );

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text>Please connect your wallet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Chats</Text>
      {loading ? (
        <Text>Loading conversations...</Text>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.peerAddress}
          style={styles.list}
        />
      )}
      <TouchableOpacity onPress={handleDisconnect} style={styles.disconnectButton}>
        <Text style={styles.disconnectButtonText}>Disconnect Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  conversationItem: { backgroundColor: 'white', padding: 15, marginBottom: 10 },
  peerAddress: { fontSize: 16, fontWeight: 'bold' },
  lastMessage: { fontSize: 14, color: '#666' },
});
