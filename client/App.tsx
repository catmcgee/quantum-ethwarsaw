import React from 'react';
import "@thirdweb-dev/react-native-adapter";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native';
import '@walletconnect/react-native-compat';

import Home from './pages/Home';
import LoginWithWallet from './pages/LoginWithWallet';
import ChatDashboard from './pages/ChatDashboard';
import ChatDetail from './pages/ChatDetail';
import Settings from './pages/Settings';
import CredentialList from './pages/CredentialList';
import CredentialVerification from './pages/CredentialVerification';
import GroupChatList from './pages/GroupChatList';


const Stack = createNativeStackNavigator();

// Setup queryClient
const queryClient = new QueryClient();

const projectId = '036f8ec36d473a84b8eaf816d1476811';

// Create config
const metadata = {
  name: 'Quantum',
  description: 'Quantum Connections',
  url: 'https://quantum.io',
  icons: ['https://your-project-icon.com'],
  redirect: {
    native: 'quantum://',
    universal: 'https://quantum.io'
  }
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

function App(): React.JSX.Element {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LoginWithWallet" component={LoginWithWallet} />
            <Stack.Screen 
              name="ChatDashboard" 
              component={ChatDashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ChatDetail" 
              component={ChatDetail}
              options={({ route }) => ({ 
                title: route.params?.conversation?.peerAddress || 'Chat'
              })}
            />
            <Stack.Screen 
              name="Settings" 
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="GroupChatList" 
              component={GroupChatList}
              options={{ headerShown: false }}
            />
             <Stack.Screen 
              name="CredentialList" 
              component={CredentialList}
              options={{ headerShown: false }}
            />
             <Stack.Screen 
              name="CredentialVerification" 
              component={CredentialVerification}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Web3Modal />
        </NavigationContainer>
      </QueryClientProvider>
    </WagmiConfig>
  );
}


export default App;