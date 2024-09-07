# Contracts

This contains the contracts used in quantum. It is a hardhat project.

- `IrishSBT` - this is the soul-bound token (based on NFT standard) that is minted to a person when their irish passport proof is verified. Please note that the proving for this has not been fully implemented in quantum, but will likely utilize zkpassport
- `JournalistSBT` - this is the soul-bound token (based on NFT standard) that is minted to a person when their journalist accreditation is verified.
- `VerifierMinter` - this verifies proofs and calls the correct minting contract
- `zkemail_verifier` - this is the generated ultraplonk verifier for verifing a journalist's accreditation email
- `CredentialRegistry` - this is a registry to hold all the credentials and their zk verifier contracts onchain