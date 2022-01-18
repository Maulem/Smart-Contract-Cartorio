// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract DocumentSignSimple {

    bytes32 document;       // Hash do documento
    address owner;          // Address do Cartório
    address signer;         // Address de quem está assinando o documento
    bool signed;            // Indica se o documento foi assinado
    uint256 signedDate;     // Data que foi assinado
    uint256 creationDate;   // Data de criação do documento

    constructor(address _signer, string memory _document){
        owner = msg.sender;
        signer = _signer;
        document = keccak256(abi.encodePacked(_document));
        creationDate = block.timestamp;
    }

    function Sign() external {
        require(signer == msg.sender, "You're not the one meant to sign this contract!");
        require(signed == false, "Contract is already signed!");
        signedDate = block.timestamp;
        signed = true;
    }

    function MatchDocument(string memory _document) external view returns (bool) {
        return keccak256(abi.encodePacked(_document)) == document;
    }

    function GetDocument() external view returns (bytes32, bool) {
        return (document, signed);
    }

    function GetSignedInfo() external view returns (address, bool, uint256) {
        return (signer, signed, signedDate);
    }
}