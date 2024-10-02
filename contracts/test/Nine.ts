import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";
  describe("Nine", function(){
    async function init()
    {
        const [owner, otherAccount] = await hre.ethers.getSigners();
        const Nine = await hre.ethers.getContractFactory("Nine");
        const nine = await Nine.deploy()
        return {owner, otherAccount, nine}
    }
    describe("Store Cid", function(){
        it("Should store a cid", async function(){
            const {owner, otherAccount, nine} = await init()
            await nine.storeCid("cid")
            expect(await nine.storeCid("cid")).to.emit(nine, "CidStored").withArgs(owner.address, "cid")
        })
    })
    describe("Pay", function()
{
    it("Should pay", async function()
    {
        const ONE_GWEI = 1_000;
        const {owner, otherAccount, nine} = await loadFixture(init)
        await nine.storeCid("cid")
        expect(await  nine.payForRequest(otherAccount,  ONE_GWEI, "cid", {value: ONE_GWEI})).to.emit(nine, "Paid").withArgs(owner.address, "cid")
    })
})

  })