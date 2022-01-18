const truffleAssert = require("truffle-assertions");
const assert = require("chai").assert;
const docSign = artifacts.require("DocumentSignSimple");

contract("TestdocSign", async accounts => {

    let DocName = "doc1";
    let deployerAddress = accounts[0];
    let signerAddress = accounts[1];
    const docHash = web3.utils.soliditySha3(DocName);

    // Function Sign tests:

    it("Sign contract with Signer account.", async () => {
        
        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});
        await truffleAssert.passes(instance.Sign({from: signerAddress}));

    })

    it("Sign contract without Signer account.", async () => {

        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});
        await truffleAssert.fails(instance.Sign({from: deployerAddress}));

    })

    // Function MatchDocument tests:

    it("MatchDocument returns true after correct DocName.", async () => {
        
        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});
        
        var ret = await instance.MatchDocument(DocName);
        
        await assert(ret == true)           // Docname is correct

    })

    it("MatchDocument returns false after incorrect DocName.", async () => {

        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});
        
        var ret = await instance.MatchDocument("someWrongName");

        await assert(ret == false)          // Docname is incorrect
    })

    // Function GetDocument tests:

    it("GetDocument with signing.", async () => {

        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});
        await truffleAssert.passes(instance.Sign({from: signerAddress}));

        var ret = await instance.GetDocument.call();

        await assert(ret[0] == docHash)         // Contract hash is correct
        await assert(ret[1] == true);           // Contract is signed
    })

    it("Getdocument without signing.", async () => {

        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});

        var ret = await instance.GetDocument.call();

        await assert(ret[0] == docHash)         // Contract hash is correct
        await assert(ret[1] == false);          // Contract is not signed
    })

    // Function GetSignedInfo tests:

    /*
     *  A new contract cannot be already signed and therefore signed date must be 0 also the Signer address must be the same passed down to the cosntructor.
     */
    it("GetSignedInfo without signing.", async () => {

        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});

        var ret = await instance.GetSignedInfo.call();
        
        await assert(ret[0] == signerAddress)   // Signer address
        await assert(ret[1] == false);          // Contract is not signed
        await assert(ret[2] == 0);              // Never was signed
        
    })
    /*
     *  Signed contract must have signed == True and a valid signed date.
     */
    it("GetSignedInfo with signing.", async () => {

        const instance = await docSign.new(signerAddress, DocName, {from: deployerAddress});
        await instance.Sign({from: signerAddress});

        var ret = await instance.GetSignedInfo.call();

        await assert(ret[0] == signerAddress)   // Signer address
        await assert(ret[1] == true);           // Contract is signed
        await assert(ret[2] > 0);               // When was signed

    })
})