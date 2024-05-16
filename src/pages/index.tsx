import { Button } from "@/components/ui/button";
import { Unit } from "@/components/unit";
import { CardanoWallet } from "@meshsdk/react";
import Image from "next/image";
import React from "react";
import { LuBinary } from "react-icons/lu";

function Projects() {
  return (
    <>
      <Unit
        icon={React.createElement(LuBinary)}
        title="Resolve Plutus Script Address "
        description="Resolve the address of the Plutus Smart Contract you have compiled."
        buttonText="Resolve Now"
        path="unit/resolvePlutusScriptAddress "
      />
    </>
  );
}

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between px-24 py-24 pt-14`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Image
          src="/pbl-logo.png"
          alt="PBL Logo"
          className="dark:invert"
          width={200}
          height={200}
          priority
        />
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Handy Project Units &nbsp;
          <code className="font-mono font-bold">built for convinience</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          By &nbsp;
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://gimbalabs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/gimbalabs-logo.svg"
              alt="Gimbalabs Logo"
              className="dark:invert"
              width={24}
              height={24}
              priority
            />
          </a>&nbsp;
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://meshjs.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/mesh-logo.svg"
              alt="Mesh Logo"
              className="dark:invert"
              width={48}
              height={48}
              priority
            />
          </a>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 lg:p-8 mb-24">
        <Projects />
      </section>
    </main>
  );
}
