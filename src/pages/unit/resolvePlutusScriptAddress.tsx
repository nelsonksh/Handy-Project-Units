import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PlutusScript, resolvePlutusScriptAddress } from "@meshsdk/core";
import { useEffect, useState } from "react";
import { LuBinary } from "react-icons/lu";

export default function ResolvePlutusScriptAddress() {
  const { toast } = useToast();
  const [network, setNetwork] = useState("Preprod");
  const [plutusVersion, setPlutusVersion] = useState<"V2" | "V1">("V2");
  const [cborText, setCborText] = useState("");
  const [networkId, setNetworkId] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (network === "Mainnet") {
      setNetworkId(1);
    } else if (network === "Preprod") {
      setNetworkId(0);
    }
  }, [network]);

  const handleCborChange = (event: any) => {
    setCborText(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(
      `Network: ${networkId}, Plutus Version: ${plutusVersion}, Cbor: ${cborText}`
    );
    const script: PlutusScript = {
      code: cborText,
      version: plutusVersion,
    };
    try {
      const address = resolvePlutusScriptAddress(script, networkId);
      setAddress(address);
    } catch (e) {
      toast({
        title: "Error",
        description: JSON.stringify(e),
      });
    }
  };

  return (
    <form
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="font-extrabold text-3xl">
          Resolve Plutus Script Address
        </h1>
      </div>
      <Label className="font-extrabold text-xl">Network</Label>
      <RadioGroup
        defaultValue="Preprod"
        value={network}
        onValueChange={setNetwork}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Preprod" id="r2" />
          <Label htmlFor="r2">Preprod</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Mainnet" id="r1" />
          <Label htmlFor="r1">Mainnet</Label>
        </div>
      </RadioGroup>
      <Label className="font-extrabold text-xl">Plutus Version</Label>
      <RadioGroup
        defaultValue="V2"
        value={plutusVersion}
        onValueChange={(value: string) =>
          setPlutusVersion(value as "V2" | "V1")
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="V2" id="r2" />
          <Label htmlFor="r2">V2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="V1" id="r1" />
          <Label htmlFor="r1">V1</Label>
        </div>
      </RadioGroup>
      <Label className="font-extrabold text-xl">Cbor</Label>
      <Textarea
        className="w-1/3 h-36"
        placeholder="Paste your cbor here."
        value={cborText}
        onChange={handleCborChange}
      />
      <Button type="submit">Submit</Button>
      {address && (
        <Alert className="w-2/3">
        <LuBinary className="h-4 w-4" />
        <AlertTitle>The Contract Address is</AlertTitle>
        <AlertDescription>
          <code className="font-mono font-bold">{address}</code>
        </AlertDescription>
      </Alert>
      
      )}
    </form>
  );
}
