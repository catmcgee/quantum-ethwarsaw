// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JournalistSBT.sol";
import "./IrishSBT.sol";

interface IVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

contract SoulboundMinting {
    JournalistSoulboundToken public journalistToken;
    IrishCitizenSoulboundToken public irishCitizenToken;
    IVerifier public journalistVerifier;
    IVerifier public zkPassportVerifier;

    constructor(
        address _journalistToken,
        address _irishCitizenToken,
        address _journalistVerifier,
        address _zkPassportVerifier
    ) {
        journalistToken = JournalistSoulboundToken(_journalistToken);
        irishCitizenToken = IrishCitizenSoulboundToken(_irishCitizenToken);
        journalistVerifier = IVerifier(_journalistVerifier);
        zkPassportVerifier = IVerifier(_zkPassportVerifier);
    }

    // Function to mint Journalist or Irish Citizen NFT after verification
    function mintSoulboundNFT(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs,
        address to,
        bool isJournalist
    ) external {
        bool valid;
        
        if (isJournalist) {
            valid = journalistVerifier.verify(_proof, _publicInputs);
            require(valid, "Proof verification failed for journalist");
            journalistToken.mintJournalistNFT(to);
        } else {
            valid = zkPassportVerifier.verify(_proof, _publicInputs);
            require(valid, "Proof verification failed for Irish citizen");
            irishCitizenToken.mintIrishCitizenNFT(to);
        }
    }
}
