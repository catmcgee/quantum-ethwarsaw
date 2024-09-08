# zkemail in noir

Library for proving emails in Noir. Use the EML parser to generate a Prover.toml that
1. Authenticates the DKIM signature over an email header
2. Extracts the body hash from the authenticated body header
3. Authenticates a body that is hashed in circuit as matching the body hash in the header
4. Asserts the email is received by a specified domain (gmail.com as demo)
5. Outputs the pedersen hash of the DKIM pubkey modulus for verification

### Dependencies
0. Ensure you have `noirup` (circuit compiler) and `bbup` (circuit prover) installed:
```console
# Install noirup
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
# Install bbup
curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/master/barretenberg/cpp/installation/install | bash

# On Mac:
source ~/.zshrc
# On Linux 🗿: 
source ~/.bashrc
```
1. Install the correct versions of `bb` and `nargo` (if later than shown below probably works)
```
# Install nargo
noirup -v 0.32.0
# Install bb
bbup -v 0.46.1
```
### Running ZKEmail.nr
1. Install the repository with `git clone https://github.com/mach-34/zkemail.nr && cd zkemail.nr`
2. The CLI is set up to read `src/demo.eml`. Change the email here if needed. You can generate a `Prover.toml` file by running the cli
```
cd eml_parser && cargo run --release && cd -

## OUTPUTS
global EMAIL_HEADER_LENGTH: u32 = 472;
global EMAIL_BODY_LENGTH: u32 = 24;
```
3. Shown above are outputs for exact header and body lengths for the emails. Eventually, a max size for each can be provided, but in the meantime, you must replace these in `main.nr`

4. Prove the circuit and verify the authenticity of an email:
```console
# Prove with ultraplonk (verifier-contract friendly)
./prove_ultraplonk.sh
# Prove with megahonk (quicker but non-constant proof size)
./prove_megahonk.sh
```

## Credits
[ZK Email](https://github.com/zkemail) - repo is derived entirely from this work
[Noir-RSA (V1)](https://github.com/richardliang/noir-rsa/) - body hash base64, insights into how to implement (i thought dkim was over body hash not header until reading this repo)
[Noir_RSA (V2)](https://github.com/noir_lang/noir_rsa) - Makes ZKEmail possible in reasonable amount of time in Noir
