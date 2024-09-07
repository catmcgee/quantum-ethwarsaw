import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const credentials = [
  { id: '1', name: 'Journalist Accreditation', icon: '🚗' },
  { id: '2', name: 'Passport', icon: '🛂' },
  { id: '3', name: 'Ancestory.com', icon: '🆔' },
  { id: '4', name: 'Prescription', icon: '👶' },
];

export default function CredentialList() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.credentialItem}
      onPress={() => navigation.navigate('CredentialVerification', { credential: item })}
    >
      <Text style={styles.credentialIcon}>{item.icon}</Text>
      <Text style={styles.credentialName}>{item.name}</Text>
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

          <Text style={styles.title}>Add Credential</Text>

          <View style={styles.placeholder} />
        </View>

        <FlatList
          data={credentials}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 50,
  },
  credentialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  credentialIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  credentialName: {
    fontSize: 18,
  },
});