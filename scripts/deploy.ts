// imports
import { ethers, run, network } from "hardhat"

// async main
/**
 * what it does is
 * deploys the code
 * verifies if we are on the testnet
 * sets the value to 7
 */
async function main() {
  console.log("Hello, Hardhat!")
  console.log(`Network RPC_URL: ${(network.config as any)?.url || "N/A"}`)
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)

  // when deploying to hardhat network, we do not need to verify the contract
  // when deploying to sepolia, we need to verify the contract
  console.log("chainId", network.config.chainId)
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log(`Verifying contract on ${network.name}...`)
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value: ${currentValue}`)

  // Update the current valueDeployed contract
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value: ${updatedValue}`)
}

/**
 * verifies the contract on etherscan
 */
async function verify(contractAddress: string, args: any[]) {
  // args will be wmpty since the SimpleStorage Contract does not have a constructor
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}

// call main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
