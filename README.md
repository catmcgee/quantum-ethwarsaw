<img src="./assets/logo.png" alt="Logo" width="300" height="auto">

# Quantum

### Small voices inspire big changes

There is a global attack on privacy, and a normalizing of censorship.

Quantum is the first chat app that protects your privacy while simultaneously allowing you to trust who you are talking to. Using the power of zero knowledge proofs, you can prove that you belong to a community and verify that others do too. These communities can be anything from being a citizen of Ukraine and being an accredited journalist to having a familial pattern of baldness! It is unable to be censored because it is e2e encrypted by defualt.

Quantum has three main features:

- **News channels** of 1000+ people, allowing verified journalists to anonymously post up to date information and news
- **Group chats** of 1000+ people, all sharing things in common that were decided by the admins. People can choose to be anonymous, but you can stil verify that they have proved they belong in that group
- **private private messages** between you and other wallets. all DMs are e2e encrypted by default and it is not possible to turn this off

## Deck

You can find the pitch deck [here](https://www.canva.com/design/DAGQE83ArOs/YV_Lh-MQ4Ln2WobN9ju1Mg/edit?utm_content=DAGQE83ArOs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

## How it works + tech stack

### Zero knowledge proofs

- A user can select a credential that they would like to prove that they have
- They will provide the relevent information to generate this proof
- This may be an .eml file or a photo of a passport, but can also be login information
- These are passed as private inputs to the circuit
- A proof is generated locally and stored locally
- The user can then call request to mint an NFT by sending their proof
- Their proof is verified onchain and the NFT is minted to them

**Tech stack**

- Circuits written in Noir
- Proofs generated and verified using ultraplonk currently (with an easy option to switch to honk)
- Solidity verifiers deployed onchain
- Other Solidity contracts are used to hold credentials and act as a factory for verifying proofs

### End-to-end encryption

- All private DMs are e2e encrypted by default and this cannot be switched off

**Tech stack**

- XMTP for private messaing and group chats (with the plan to update from XMTP to a non-encrypted protocol and allow for bigger chats)

### Client-side stack

- React Native with custom Swift libraries (swoir)

## Running the app

### Prerequisites

- Node v18
- Nargo
- bb (barretenburg)

Contracts are already deployed to EVM chains & zkverify (depending on the contract) and their addresses are hardcoded.

### Compiling contracts

This app uses hardhat. 

```bash
cd contracts & npx hardhat compile
```

This will compile contracts and generate ABIs.

### Compiling circuits

This app uses nargo and bb.

```bash
cd circuits/zkemail && nargo compile
```

You may also want to generate the solidity verifier:

```bash
bb contract
```

### Running the frontend

This app uses React Native. It has only been tested in ios. Unfortnately you cannot use simulators to run the app as swoir has only been developed for real devices.

With a device plugged in to your computer, run

```bash
cd client && npm install && npx react-native start
```

Open a new terminal and run

```bash
npx react-native run-ios
```

or 
```bash
npx react-native run-android
```

## Contact

If you have any questions, feel free to reach out to me on [X/Twitter](https://www.x.com/catmcgeecode).