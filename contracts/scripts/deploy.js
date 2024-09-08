const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const JournalistSBT = await hre.ethers.getContractFactory("JournalistSoulboundToken");
  const IrishSBT = await hre.ethers.getContractFactory("IrishCitizenSoulboundToken");
  const SBTMinting = await hre.ethers.getContractFactory("SoulboundMinting");
  const CredentialRegistry = await hre.ethers.getContractFactory("CredentialRegistry");

  const journalistSBT = await JournalistSBT.deploy();
  await journalistSBT.waitForDeployment();
  console.log("JournalistSBT deployed to:", await journalistSBT.getAddress());

  const irishSBT = await IrishSBT.deploy();
  await irishSBT.waitForDeployment();
  console.log("IrishCitizenNFT deployed to:", await irishSBT.getAddress());

  const credentialFactory = await CredentialRegistry.deploy();
  await credentialFactory.waitForDeployment();
  console.log("CredentialRegistry deployed to:", await credentialFactory.getAddress());

  const journalistVerifier = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const zkPassportVerifier = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; 
  const sbtMinting = await SBTMinting.deploy(
    await journalistSBT.getAddress(),
    await irishSBT.getAddress(),
    journalistVerifier,
    zkPassportVerifier
  );
  await sbtMinting.waitForDeployment();
  console.log("NFTMinting deployed to:", await sbtMinting.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });