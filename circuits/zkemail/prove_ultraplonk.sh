#!/bin/bash

## Set the date utility depending on OSX or Linux
if command -v gdate &> /dev/null
then
    # Set variable for gdate
    date_cmd='gdate'
else
    # Set variable for date (Linux typically)
    date_cmd='date'
fi

## Force recompilation of the circuit
echo "Compiling circuit..."
nargo compile --force &> /dev/null
bb write_vk -b ./target/noir_zkemail.json -o ./target/noir_zkemail.up.vkey
echo "Calculating witness..."
start_time=$($date_cmd +%s.%N)

## Calculate the witness of the circuit
nargo execute witness &> /dev/null
witness_end=$($date_cmd +%s.%N)
duration_witness=$(echo "$witness_end - $start_time" | bc)
echo "Witness generated in: $duration_witness seconds"
echo "Proving with UltraPlonk..."

## Generate the proof
bb prove -b ./target/noir_zkemail.json -w ./target/witness.gz -o ./target/noir_zkemail.up.proof
end_time=$($date_cmd +%s.%N)
duration_prover=$(echo "$end_time - $witness_end" | bc)
duration_total=$(echo "$end_time - $start_time" | bc)
echo "Proof generated in: $duration_prover seconds"
echo "Total time for client: $duration_total seconds"

## Verify
echo "Verifying proof..."
bb verify -k ./target/noir_zkemail.up.vkey -p ./target/noir_zkemail.up.proof
verify_time=$($date_cmd +%s.%N)
duration_verify=$(echo "$verify_time - $end_time" | bc)
echo "Proof verified in: $duration_verify seconds"