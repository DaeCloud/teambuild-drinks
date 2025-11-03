'use client';

import { useEffect, useState } from "react";
import Header from "./components/Header";
import InteractiveInput from "./components/InteractiveInput";
import ItemList from "./components/ItemList";

export default function Home() {
  const [deployment, setDeployment] = useState('undefined');

  useEffect(() => {
    fetch('/api/server')
      .then(r => r.json())
      .then(tmp => {
        setDeployment(tmp.deployment);
      });
  }, []);

  return (
    <div>
      <Header />

      <div className="flex min-h-screen items-center justify-center font-sans bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center w-full sm:items-start sm:text-left">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight w-full text-zinc-50">
              Add your drink preferences below!
            </h1>
            <p className="text-white">For the upcoming team build, please specify the drinks you would like so I can make sure we have something for everyone. I won&apos;t necessarily get everything requested but I&apos;d like to have something for everyone.</p>
            {deployment === 'azure' && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0078D4] via-[#5E5E5E] to-[#0078D4] px-3 py-2 text-sm text-white shadow-sm w-full">
                <span className="text-2xl leading-none">☁️</span>
                <div className="flex flex-col leading-tight">
                  <span>
                    Deployed on <b>Azure Container Apps</b> &amp; fueled by <b>Azure Cosmos DB</b>.
                  </span>
                  <span className="italic text-blue-200">
                    #LearningAzure
                  </span>
                </div>
              </div>
            )}
            <InteractiveInput />
            <ItemList />
          </div>
        </main>
      </div>
    </div>
  );
}
