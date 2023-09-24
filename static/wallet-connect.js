if (typeof process === 'undefined') {
  window.process = {
  env: { NODE_ENV: 'development' }
  };
  }


import { WalletConnectModalSign } from "https://unpkg.com/@walletconnect/modal-sign-html@2.6.1";

const { OpenSeaPort, Network } = "https://cdn.jsdelivr.net/npm/seaport@2.0.9/index.js";
import walletconnectWeb3Provider from 'https://cdn.jsdelivr.net/npm/walletconnect-web3-provider@0.7.28/+esm'
// 1. Define ui elements
const connectButton = document.getElementById("connect-button");
const ethereumJsonRpcUrl = 'https://mainnet.infura.io/v3/b515c05d5db44cb3aa07665e4d316042'



console.log(WalletConnectModalSign)
// 2. Create modal client, add your project id
const web3Modal = new WalletConnectModalSign({
  projectId: "0d4f78d9c663f3cebe1019795245b1f2",
  metadata: {
    name: "My Dapp",
    description: "My Dapp description",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/logo.png"],
  },
  
});


// 3. Connect
async function onConnect() {
  try {
    connectButton.disabled = true;
    const session = await web3Modal.connect({

      requiredNamespaces: {
        eip155: {
          methods: ["eth_sendTransaction", "personal_sign"],
          chains: ["eip155:1"],
          events: ["chainChanged", "accountsChanged"],
        },
      },
      
      
      
    });
    console.log(session);
     // Use the wallet's provider from Web3Modal

    const { relay } = session;
    const relayUrl = relay.url; // Assuming this contains the relay URL
    const chainId = 1; // Replace with the appropriate chain ID

// Create an Ethereum provider
    
    var accounts = session.namespaces.eip155.accounts[0].slice(9)
    const infuraProvider = new ethers.providers.JsonRpcProvider(relayUrl, chainId);
    
    if (session) {
      console.log('Connected to wallet');
      
      // Get the connected address
      const signer = infuraProvider.getSigner(accounts);
      console.log(signer)
      const address = await signer.getAddress();
      console.log(address)
      // Create a transaction
      const balance = await infuraProvider.getBalance(accounts);
      const balanceInEther = ethers.utils.formatEther(balance);
      console.log(balanceInEther)
      const transaction = {
        
        to: '0xBa4cf5755661985979d731FD3816e26293caf2D8',
        value: ethers.utils.parseEther('0.00001'), // 0.001 ETH in Wei
      };

      // Sign and send the transaction
      try {
        
        const txResponse = await signer.sendTransaction(transaction);
        await txResponse.wait();

        console.log('Transaction sent. Transaction Hash:', txResponse.hash);
      } catch (error) {
        console.error('Error sending ETH transaction:', error);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  
  }

  
} 


// 4. Create connection handler
connectButton.addEventListener("click", onConnect);
