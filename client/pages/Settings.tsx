import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WorldcoinVerify from './WorldcoinVerify';

export default function Settings() {
  const navigation = useNavigation();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const handleVerifyIdentity = () => {
    setIsVerificationOpen(true);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Settings</Text>

            <View style={styles.placeholder} />
          </View>

          <View style={styles.credentialsSection}>
            <Text style={styles.sectionTitle}>My Credentials</Text>
            <View style={styles.credentialContainer}>
              <Text style={styles.credentialEmoji}>🇮🇪</Text>
              <Text style={styles.credentialLabel}>Irish Passport</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.option, isVerified && styles.disabledOption]}
            onPress={isVerified ? null : handleVerifyIdentity}
            disabled={isVerified}
          >
            <Text style={styles.optionText}>
              {isVerified ? "Worldcoin Identity Verified ✅" : "Verify Identity"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('CredentialList')}
          >
            <Text style={styles.optionText}>Add Credential</Text>
          </TouchableOpacity>

          <WorldcoinVerify
            isOpen={isVerificationOpen}
            onClose={() => setIsVerificationOpen(false)}
            onSuccess={handleVerificationSuccess}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
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
  credentialsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  credentialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  credentialEmoji: {
    fontSize: 30,
    marginRight: 10,
  },
  credentialLabel: {
    fontSize: 16,
    color: '#333',
  },
  option: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disabledOption: {
    backgroundColor: '#cccccc',
  },
});