import { assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;
  this.beforeEach(async () => {
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
    simpleStorage = (await simpleStorageFactory.deploy()) as SimpleStorage;
  });

  it("Should start with favourite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store function", async () => {
    await simpleStorage.store(9);
    const updatedValue = await simpleStorage.retrieve();
    const expectedValue = "9";
    assert.equal(updatedValue.toString(), expectedValue);
  });
});
