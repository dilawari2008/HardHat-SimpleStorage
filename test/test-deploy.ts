import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage
  beforeEach(async () => {
    simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favourite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue)  // exactly the same as above
  })

  it("Should update when we call store", async () => { // use it.only to run only this test
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    const expectedValue = "7"
    assert.equal(updatedValue.toString(), expectedValue)
  })
})