// i havent been able to run this because i dont have funds on zkverify :( 
// but i read the docs and would love to try it out! i hope i can still qualify for a bounty <3

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { vk, proof, publicInputs } = require('./proofData'); 

async function submitProofToZkVerify() {
  const wsProvider = new WsProvider('wss://testnet-rpc.zkverify.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  const keyring = new Keyring({ type: 'sr25519' });
  const account = keyring.addFromMnemonic('test test test'); // not my real mnemonic obvs

  try {
    const txHash = await api.tx.settlementUltraplonkPallet.submitProof(vk, proof, publicInputs)
      .signAndSend(account);

    console.log(`Proof submitted with transaction hash: ${txHash}`);

    let attestationId, proofDigest;
    await new Promise((resolve) => {
      api.query.system.events((events) => {
        events.forEach((record) => {
          const { event } = record;
          if (api.events.poe.NewElement.is(event)) {
            [proofDigest, attestationId] = event.data;
            console.log(`Proof included in attestation: ${attestationId.toString()}`);
            console.log(`Proof digest: ${proofDigest.toString()}`);
            resolve();
          }
        });
      });
    });

    const merklePath = await api.rpc.poe.proofPath(attestationId, proofDigest);
    console.log('Merkle path:', merklePath.toHuman());

    await new Promise((resolve) => {
      api.query.system.events((events) => {
        events.forEach((record) => {
          const { event } = record;
          if (api.events.poe.NewAttestation.is(event)) {
            const [id, attestation] = event.data;
            console.log(`New attestation created: ${id.toString()}`);
            console.log(`Attestation (Merkle root): ${attestation.toString()}`);
            resolve();
          }
        });
      });
    });

  } catch (error) {
    console.error('Error submitting proof:', error);
  } finally {
    await api.disconnect();
  }
}

submitProofToZkVerify().catch(console.error);