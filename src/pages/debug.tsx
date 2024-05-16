import { Button } from "@/components/ui/button";
import {
  PlutusScript,
  Transaction,
  resolvePlutusScriptAddress,
} from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";

export default function Debug() {
  const { wallet } = useWallet();
  const script: PlutusScript = {
    code: "58965894010000323232323222253335734666444660124660144c6eacc024c020c024c020004dd61aba1300735742600e0020060040022c2c46aae78dd500091aba135744002466600644446466600e600800260060020046600800600442c4446644a666ae6800858004c0100084c00c0048894ccd55cf8008018998011aba100135744002464600446600400400246004466004004003",
    version: "V2",
  };
  // const address = resolvePlutusScriptAddress(script, 0);
  const address =
    "addr_test1wp48k2z6ys2scwafehmmnl4pf6segfknxaevrct4xd5lh7q24syvt";
  console.log("address", address);

  async function click() {
    const tx = new Transaction({ initiator: wallet }).sendAssets(
      {
        address: address,
        datum: {
          value: "supersecret",
        },
      },
      [
        {
          unit: "lovelace",
          quantity: "30",
        },
      ]
    );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <CardanoWallet />
        <Button onClick={click}>Debug</Button>
      </div>
    </main>
  );
}
