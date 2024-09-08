// SPDX-License-Identifier: MIT
// sepolia: 0x50573B13a4c86fd32DEF3dDE3CBd068669D7291B
// mantle:
// celo: 0x20E48D609670bc7aF3266F2acd6dFFf7606d0155
// zircuit: 0x20E48D609670bc7aF3266F2acd6dFFf7606d0155
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract JournalistSoulboundToken is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _tokenIds;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("JournalistSoulboundToken", "JOURNALIST") Ownable(msg.sender) {}

    function mintJournalistNFT(address to) external onlyOwner {
        require(!hasMinted[to], "Already minted a soulbound journalist NFT");
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _safeMint(to, newItemId);
        hasMinted[to] = true;
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0) || to == address(0), "Soulbound tokens cannot be transferred");
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);

        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "Journalist Token #', 
                    tokenId.toString(),
                    '", "description": "Journalist Soulbound NFT", "image": "https://example.com/journalist.png", "attributes": [{"trait_type": "Minted On", "value": "',
                    block.timestamp.toString(),
                    '"}]}'
                )
            ))
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }
}