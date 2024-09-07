import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const verificationTypes = [
  { id: 'usa', name: 'USA', flag: '🇺🇸' },
  { id: 'eu', name: 'EU', flag: '🇪🇺' },
  { id: 'uk', name: 'UK', flag: '🇬🇧' },
];

export default function CredentialVerification() {
  const navigation = useNavigation();
  const route = useRoute();
  const { credential } = route.params;
  const [selectedType, setSelectedType] = useState(null);
  const [file, setFile] = useState(null);
  const [isProving, setIsProving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);

  const simulateFilePicker = () => {
    Alert.alert(
      "Select EML File",
      "An email file has already been picked for demo purposes :)",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Select 'example.eml'",
          onPress: () => setFile({ name: 'example.eml', size: '25 KB' })
        }
      ]
    );
  };

  const proveVerification = () => {
    setIsProving(true);
    // Simulate proof generation process
    setTimeout(() => {
      setIsProving(false);
      setProofGenerated(true);
      Alert.alert("Proof Generated", "You have successfully generated the proof of your credential!");
    }, 3000);
  };

  const verifyVerification = () => {
    setIsVerifying(true);
    // Simulate smart contract interaction
    setTimeout(() => {
      setIsVerifying(false);
      Alert.alert(
        "Verification Successful",
        "Your proof has been verified and you have been issued an NFT!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Settings', { credentialAdded: true })
          }
        ]
      );
    }, 3000);
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

            <Text style={styles.title}>Verify</Text>

            <View style={styles.placeholder} />
          </View>

          <Text style={styles.sectionTitle}>Accreditation Country</Text>
          <View style={styles.typeContainer}>
            {verificationTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeButton, selectedType === type.id && styles.selectedType]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={[styles.typeText, selectedType === type.id && styles.selectedTypeText]}>
                  {type.flag} {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.uploadButton} onPress={simulateFilePicker}>
            <Text style={styles.uploadButtonText}>Select EML File</Text>
          </TouchableOpacity>

          {file && (
            <View style={styles.fileInfoContainer}>
              <Text style={styles.fileInfoText}>Selected file: {file.name}</Text>
              <Text style={styles.fileInfoText}>Size: {file.size}</Text>
            </View>
          )}

          {selectedType && file && !proofGenerated && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={proveVerification}
              disabled={isProving}
            >
              {isProving ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.actionButtonText}>Prove Accreditation</Text>
              )}
            </TouchableOpacity>
          )}

          {proofGenerated && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={verifyVerification}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.actionButtonText}>Verify & Claim NFT</Text>
              )}
            </TouchableOpacity>
          )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
  },
  selectedType: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 16,
  },
  selectedTypeText: {
    color: 'white',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileInfoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  fileInfoText: {
    fontSize: 14,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});