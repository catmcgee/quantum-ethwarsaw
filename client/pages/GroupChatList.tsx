import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock data for available group chats
const mockGroupChats = [
  { id: '1', name: 'Irish Passport Holders', requiredCredential: 'Irish Passport', emoji: '🇮🇪' },
  { id: '2', name: 'EU Citizens', requiredCredential: 'EU Passport', emoji: '🇪🇺' },
  { id: '3', name: 'Worldcoin Verified', requiredCredential: 'Worldcoin', emoji: '🌍' },
];

// Mock user credentials (replace with actual user data later)
const userCredentials = ['Irish Passport', 'Worldcoin'];

export default function GroupChatList() {
  const navigation = useNavigation();
  const [availableChats, setAvailableChats] = useState([]);

  useEffect(() => {
    // Filter chats based on user credentials
    const filteredChats = mockGroupChats.filter(chat => 
      userCredentials.includes(chat.requiredCredential) || chat.requiredCredential === 'Any Passport'
    );
    setAvailableChats(filteredChats);
  }, []);

  const joinChat = (chat) => {
    // Here you would typically handle the logic to join the chat
    // For now, we'll just show an alert and navigate back to the chat dashboard
    Alert.alert(
      "Joined Chat",
      `You've successfully joined the ${chat.name} chat!`,
      [
        { text: "OK", onPress: () => navigation.navigate('ChatDashboard') }
      ]
    );
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => joinChat(item)}>
      <Text style={styles.chatEmoji}>{item.emoji}</Text>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatCredential}>Required: {item.requiredCredential}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Available Group Chats</Text>
          <View style={styles.placeholder} />
        </View>

        <FlatList
          data={availableChats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 50,
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatCredential: {
    fontSize: 14,
    color: '#666',
  },
});