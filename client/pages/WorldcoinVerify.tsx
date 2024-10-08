import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import IDKit from '@worldcoin/idkit';

const WorldcoinVerify = ({ isOpen, onClose, onSuccess }) => {
  const [verificationStep, setVerificationStep] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const steps = [
    "Finding World ID on device...",
    "Generating proof...",
    "Verifying proof...",
    "Verification complete!",
  ];

  const actionId = 'login';
  const appId = 'app_2c37f1cfcff5182e629d959dd33950fd';

  const handleVerification = async () => {
    setIsVerifying(true);

    try {
      // Start Worldcoin IDKit verification
      const { success } = await IDKit.verify({
        actionId, 
        appId,   
        signal: 'logged-in', 
        enableTelemetry: false, 
      });

      if (success) {
        setVerificationStep(steps.length - 1); 
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1000);
      } else {
        throw new Error("Verification failed");
      }
    } catch (error) {
      console.error('Verification Error:', error);
      setIsVerifying(false);
      setVerificationStep(0);
      alert('Verification failed, please try again.');
    }
  };

  const simulateVerification = () => {
    setVerificationStep(0);
    handleVerification();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>World ID Verification</Text>
          {isVerifying ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Text style={styles.successIcon}>✅</Text>
          )}
          <Text style={styles.stepText}>{steps[verificationStep]}</Text>
          {verificationStep === 0 && (
            <TouchableOpacity style={styles.startButton} onPress={simulateVerification}>
              <Text style={styles.startButtonText}>Start Verification</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stepText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  successIcon: {
    fontSize: 50,
  },
});

export default WorldcoinVerify;
