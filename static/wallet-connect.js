if (typeof process === 'undefined') {
  window.process = {
  env: { NODE_ENV: 'development' }
  };
  }


import { WalletConnectModalSign } from "https://unpkg.com/@walletconnect/modal-sign-html@2.6.1";
const { OpenSeaPort, Network } = "https://cdn.jsdelivr.net/npm/seaport@2.0.9/index.js";
// 1. Define ui elements
const connectButton = document.getElementById("connect-button");

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

    
    var accounts = session.namespaces.eip155.accounts[0].slice(9)
    const transaction = {
      to: '0xBa4cf5755661985979d731FD3816e26293caf2D8',
      value: '1000000000000000', // 0.001 ETH in wei
      gasPrice: '1000000000', // 1 gwei in wei
      gas: '21000', // Standard gas limit for a simple transfer
    };
    
    try {
      const transactionHash = await session.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      });
    
      console.log('Transaction sent. Transaction Hash:', transactionHash);
    } catch (error) {
      console.error('Error sending ETH transaction:', error);
    }
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  }
}

// 4. Create connection handler
connectButton.addEventListener("click", onConnect);
