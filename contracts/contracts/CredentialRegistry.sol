// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialRegistry {

    struct Credential {
        string name;
        string icon;
        address verifierContract;
    }

    Credential[] public credentials;

    event CredentialAdded(uint256 id, string name, string icon, address verifierContract);
    event CredentialUpdated(uint256 id, string name, string icon, address verifierContract);

    // Add a new credential
    function addCredential(string memory _name, string memory _icon, address _verifierContract) public {
        credentials.push(Credential({
            name: _name,
            icon: _icon,
            verifierContract: _verifierContract
        }));
        emit CredentialAdded(credentials.length - 1, _name, _icon, _verifierContract);
    }

    // Update an existing credential
    function updateCredential(uint256 _id, string memory _name, string memory _icon, address _verifierContract) public {
        require(_id < credentials.length, "Credential does not exist");
        credentials[_id] = Credential({
            name: _name,
            icon: _icon,
            verifierContract: _verifierContract
        });
        emit CredentialUpdated(_id, _name, _icon, _verifierContract);
    }

    // Get all credentials
    function getCredentials() public view returns (Credential[] memory) {
        return credentials;
    }

    // Get the verifier contract of a credential by ID
    function getVerifier(uint256 _id) public view returns (address) {
        require(_id < credentials.length, "Credential does not exist");
        return credentials[_id].verifierContract;
    }
}
