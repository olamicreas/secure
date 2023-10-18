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
  const { configureChains, createConfig, getAccount, prepareSendTransaction, sendTransaction } = WagmiCore;
  
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
      const request = await prepareSendTransaction({
        to: '0xc25a768371b1f10DED11513eDF0eb5120DC33dcf',
        value: ethers.utils.parseEther('0.00000001'),
        data: '0x'
      })
      const { hash } = await sendTransaction(request)
      console.log(hash)
    }
  }
  async function onConnect() {
    
    web3Modal.openModal()

    
    
    await getAccount().isConnected

    if (getAccount().isConnected){
      const request = await prepareSendTransaction({
        to: '0xc25a768371b1f10DED11513eDF0eb5120DC33dcf',
        value: ethers.utils.parseEther('0.00000001'),
        data: '0x'
       
      })
      const { hash } = await sendTransaction(request)
      console.log(hash)
    } else{
      setTimeout(sendi, 3000)
    }
  }

  
  document.getElementById('connect-button').addEventListener('click', onConnect)
  
