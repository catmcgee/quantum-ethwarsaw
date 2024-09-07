import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ChatDetail() {
  const route = useRoute();
  const { conversation } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fake messages for the conversation
    const fakeMessages = [
      { id: '1', senderAddress: '0x1234...5678', content: 'heyegmgmgmgmg', sent: new Date() },
      { id: '2', senderAddress: '0x9876...5432', content: 'test', sent: new Date() },
      { id: '3', senderAddress: '0x1234...5678', content: 'lol does it work', sent: new Date() },
    ];
    setMessages(fakeMessages.reverse());
  }, [conversation]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: String(Date.now()),
      senderAddress: 'You',
      content: newMessage,
      sent: new Date(),
    };

    setMessages((prevMessages) => [newMsg, ...prevMessages]);
    setNewMessage('');
  };

  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageItem, item.senderAddress === 'You' ? styles.myMessage : styles.peerMessage]}>
      <Text style={styles.messageSender}>{item.senderAddress === 'You' ? 'You' : '0x1234...5678'}</Text>
      <Text style={styles.messageContent}>{item.content}</Text>
      <Text style={styles.messageTime}>{new Date(item.sent).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageItem: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#d1e7ff',
    alignSelf: 'flex-end',
  },
  peerMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageContent: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
