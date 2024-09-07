import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setupCircuit, clearCircuit, generateProof, verifyProof, extractProof } from '../lib/noir';
import circuit from '../../circuits/zkemail/target/noir_zkemail'; 

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
  const [circuitId, setCircuitId] = useState<string | null>(null);
  const [proofAndInputs, setProofAndInputs] = useState('');
  const [proof, setProof] = useState('');
  const [verifyingProof, setVerifyingProof] = useState(false);

  useEffect(() => {
    setupCircuit(circuit).then(id => setCircuitId(id));
    return () => {
      if (circuitId) clearCircuit(circuitId);
    };
  }, []);

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

  const proveVerification = async () => {
    if (!file || !selectedType) {
      Alert.alert("Error", "Please select a file and accreditation country");
      return;
    }

    setIsProving(true);
    try {
      const start = Date.now();
      const { proofWithPublicInputs, vkey } = await generateProof(
        {
          credential,  
          fileSize: file.size, 
          country: selectedType,
        },
        circuitId!,
        'plonk'
      );
      const end = Date.now();
      setProofAndInputs(proofWithPublicInputs);
      setProof(extractProof(circuit, proofWithPublicInputs));
      Alert.alert("Proof Generated", `Proof generated in ${end - start} ms!`);
      setProofGenerated(true);
    } catch (err) {
      Alert.alert("Error", "Something went wrong while generating proof");
    }
    setIsProving(false);
  };

  const verifyVerification = async () => {
    setIsVerifying(true);
    try {
      const verified = await verifyProof(proofAndInputs, circuitId!, 'plonk');
      
      if (verified) {
        Alert.alert("Verification Successful", "Proof is valid and NFT issued!");
        navigation.navigate('Settings', { credentialAdded: true });
      } else {
        Alert.alert("Verification Failed", "Proof is invalid");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong during verification");
    }
    setIsVerifying(false);
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
              disabled={isProving || !circuitId}
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
