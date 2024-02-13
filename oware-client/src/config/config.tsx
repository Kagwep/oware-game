import { connect, disconnect } from 'starknetkit'
import contractJson from '../abi/starkpaycontract_StarkPay.contract_class.json'

import pragma_abi from '../assets/pragmaabi.json'
import { Abi } from 'starknet'

// const PRIVATE_KEY = "0x819033027885bc1840b6d564b6e8f68c"
const ACCOUNT_ADDRESS = "0x77a6390ab3dc3045df373b93bf8b93899c3ad5111da9b66c54b62ddc98e7d4"

// const CONTRACT_ADDRESS = "0x010a09eb11dd5cc68012039a1923209413a96eafdefd635ac406231627464328" // main contract address
const CONTRACT_ADDRESS = "0x03ef1030d02bbc012ef82d10d123d2b3a5d33bbcadec7fafe5fa0f337972cc86"
const CONTRACT_ABI: Abi = contractJson.abi;
const ERC20_ABI = ''
// Pragma configs
const PRAGMA_ABI = pragma_abi
const PRAGMA_CONTRACT_ADDRESS = "0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167"



async function connectWallet() {
    return await connect({ webWalletUrl: "https://web.argent.xyz" })
}

async function disconnectWallet() {
    await disconnect()
}

// export {contract, provider, account}
export { ACCOUNT_ADDRESS, CONTRACT_ADDRESS, disconnectWallet, CONTRACT_ABI, ERC20_ABI, PRAGMA_ABI, PRAGMA_CONTRACT_ADDRESS }
export default connectWallet 