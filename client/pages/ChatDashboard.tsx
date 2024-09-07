import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Pressable, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ALL_CHATS = 'All';
const GROUP_CHATS = 'Groups';
const DMS = 'DMs';
const NEWS = 'News';

export default function ChatDashboard() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState(ALL_CHATS);

  const [conversations, setConversations] = useState([
    { id: '1', type: DMS, name: '0x1234...5678', lastMessage: 'lol does it work', unreadCount: 2, image: `https://picsum.photos/seed/user1/200` },
    { id: '2', type: GROUP_CHATS, name: '👥 Irish Passport Holders', lastMessage: 'Welcome new members!', unreadCount: 5, image: `https://picsum.photos/seed/group1/200` },
    { id: '3', type: NEWS, name: '📢 Crypto Daily', lastMessage: 'Arthur Hayes does turnaround on Bitcoin with short and $50,000 target', unreadCount: 1, image: `https://picsum.photos/seed/news1/200` },
    { id: '4', type: DMS, name: '0x9876...5432', lastMessage: 'Lmao', unreadCount: 0, image: `https://picsum.photos/seed/user2/200` },
    { id: '5', type: GROUP_CHATS, name: '👥 EU Citizens', lastMessage: 'warsaw', unreadCount: 3, image: `https://picsum.photos/seed/group2/200` },
    { id: '6', type: NEWS, name: '📢 Tech Insider', lastMessage: 'UK signs AI safety treaty', unreadCount: 0, image: `https://picsum.photos/seed/news2/200` },
  ]);

  const filteredConversations = conversations.filter(conv => 
    activeFilter === ALL_CHATS || conv.type === activeFilter
  );

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ChatDetail', { conversation: item })}
    >
      <Image source={{ uri: item.image }} style={styles.conversationImage} />
      <View style={styles.conversationContent}>
        <Text style={styles.conversationName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderFilterItem = (filter) => (
    <TouchableOpacity
      style={[styles.filterItem, activeFilter === filter && styles.activeFilter]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
        {filter === GROUP_CHATS ? '👥' : filter === NEWS ? '📢' : filter === DMS ? '👤' : '🔄'} {filter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsText}>⚙️</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Chats</Text>

          <TouchableOpacity style={styles.writeButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.writeText}>✍️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          {[ALL_CHATS, GROUP_CHATS, DMS, NEWS].map(renderFilterItem)}
        </View>

        <FlatList
          data={filteredConversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

        {/* Modal for New Message Options */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Start New</Text>

              <Pressable style={styles.modalButton} onPress={() => {
                setModalVisible(false);
                navigation.navigate('GroupChatList');
              }}>
                <Text style={styles.modalButtonText}>Group Chat</Text>
              </Pressable>

              <Pressable style={styles.modalButton} onPress={() => console.log('Private Message selected')}>
                <Text style={styles.modalButtonText}>Private Message</Text>
              </Pressable>

              <Pressable style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  settingsButton: {
    padding: 10,
  },
  settingsText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  writeButton: {
    padding: 10,
  },
  writeText: {
    fontSize: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'white',
  },
  list: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  conversationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationContent: {
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    minWidth: 200,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});