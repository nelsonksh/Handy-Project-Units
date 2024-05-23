import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState } from "react";
import { LuBinary } from "react-icons/lu";

export default function SignSimpleTx() {
  const { connected, wallet } = useWallet();
  const [cborText, setCborText] = useState("");
  const [signedTx, setSignedTx] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleCborChange = (event: any) => {
    setCborText(event.target.value);
  };

  async function handleSign(event: any) {
    event.preventDefault();
    try {
      const signedTx = await wallet.signTx(cborText, true);
      setSignedTx(signedTx);
    } catch (e) {
      toast({
        title: "Error",
        description: JSON.stringify(e),
      });
    }
  }

  async function handleSignAndSubmit(event: any) {
    event.preventDefault();
    try {
      const signedTx = await wallet.signTx(cborText, true);
      const txHash = await wallet.submitTx(signedTx);
      setTxHash(txHash);
    } catch (e) {
      toast({
        title: "Error",
        description: JSON.stringify(e),
      });
    }
  }

  return (
    <form className={`flex flex-col items-center justify-between p-24`}>
      <div className="p-10">
        <h1 className="font-extrabold text-3xl">
          Sign a MultiSig Transaction Cbor
        </h1>
      </div>
      {!connected ? (
        <CardanoWallet />
      ) : (
        <>
          <Label className="font-extrabold text-xl">Cbor</Label>
          <Textarea
            className="w-1/3 h-36 m-10"
            placeholder="Paste your cbor here."
            value={cborText}
            onChange={handleCborChange}
          />
          <div className="flex gap-4">
            <Button type="button" onClick={handleSign}>
              Sign
            </Button>
            <Button type="button" onClick={handleSignAndSubmit}>
              Sign and Submit
            </Button>
          </div>

          {signedTx && (
            <Alert className="w-2/3 m-10">
              <LuBinary className="h-4 w-4" />
              <AlertTitle>The Signed Tx Cbor is</AlertTitle>
              <AlertDescription>
                <code className="font-mono font-bold break-all">
                  {signedTx}
                </code>
              </AlertDescription>
            </Alert>
          )}

          {txHash && (
            <Alert className="w-2/3 m-10">
              <LuBinary className="h-4 w-4" />
              <AlertTitle>The Tx Hash is</AlertTitle>
              <AlertDescription>
                <code className="font-mono font-bold break-all">{txHash}</code>
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </form>
  );
}
