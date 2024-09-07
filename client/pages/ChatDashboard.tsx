import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChatDashboard() {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake data to simulate conversations
    const fakeConversations = [
      { peerAddress: '0x1234...5678', lastMessage: 'Hey, how are you?', messages: [], id: '1' },
      { peerAddress: '0x9876...5432', lastMessage: 'Long time no see!', messages: [], id: '2' },
      { peerAddress: '0x4321...8765', lastMessage: 'Let’s catch up later.', messages: [], id: '3' },
    ];
    setConversations(fakeConversations);
    setLoading(false);
  }, []);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ChatDetail', { conversation: item })}
    >
      <Text style={styles.peerAddress}>{item.peerAddress}</Text>
      <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Chats</Text>
      {loading ? (
        <Text>Loading conversations...</Text>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
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
