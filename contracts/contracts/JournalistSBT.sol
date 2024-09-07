// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JournalistSoulboundToken is ERC721, Ownable {
    uint256 private _tokenIds;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("JournalistSoulboundToken", "JOURNALIST") Ownable(msg.sender) {}

    function mintJournalistNFT(address to) external onlyOwner {
        require(!hasMinted[to], "Already minted a soulbound journalist NFT");
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;

        _safeMint(to, newItemId);
        hasMinted[to] = true;
    }

    // Prevent transfer by adding a custom restriction on any token transfer
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        // Check if this is a minting operation (from address zero)
        require(to == address(0) || auth == address(0), "Soulbound tokens cannot be transferred");

        return super._update(to, tokenId, auth);
    }

    // Metadata about minting date and image
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);  // Ensure the token exists

        return string(
            abi.encodePacked(
                '{"name": "Journalist Token #', 
                uint2str(tokenId), 
                '", "description": "Journalist Soulbound NFT", "image": "https://example.com/journalist.png", "attributes": [{"trait_type": "Minted On", "value": "',
                uint2str(block.timestamp),
                '"}]}'
            )
        );
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bstr[k] = bytes1(temp);
            _i /= 10;
        }
        return string(bstr);
    }
}
