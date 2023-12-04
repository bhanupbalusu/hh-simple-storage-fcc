import { error } from "console"
import { ethers, network, run } from "hardhat"

async function main() {
    // Deploy
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    const contractAddr = await simpleStorage.getAddress()
    console.log(`Contract deployed at : ${contractAddr}`)
    // console.log(network.config)
    // Verify
    // if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    //     const txResp = simpleStorage.deploymentTransaction()
    //     console.log("Waiting for block confirmations")
    //     await txResp?.wait(10)
    //     await verify(contractAddr, [])
    // }
    // Interact
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is : ${currentValue}`)

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is : ${updatedValue}`)
}

async function verify(contractAddress: string, args: any[]) {
    console.log("Verifying contract....")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
