var contract2 = artifacts.require("./DocumentSignSimple.sol");

module.exports = function(deployer) {
    deployer.deploy(contract2, "0x34C34527Ad51697AED0aA712A65A9B3c84CbA7B4", "doc1");
};