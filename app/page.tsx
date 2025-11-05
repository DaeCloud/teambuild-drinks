'use client';

import { useEffect, useState } from "react";
import Header from "./components/Header";
import InteractiveInput from "./components/InteractiveInput";
import ItemList from "./components/ItemList";

export default function Home() {
  const [deployment, setDeployment] = useState('undefined');
  const [version, setVersion] = useState('undefined');
  const [joke, setJoke] = useState<string | null>(null); 

  useEffect(() => {
    fetch('/api/server')
      .then(r => r.json())
      .then(tmp => {
        setDeployment(tmp.deployment);
        setVersion(tmp.version);
      });

    fetch('/api/joke')
      .then(r => r.json())
      .then(data => {
        if (data.joke) {
          setJoke(data.joke);
        }
      });
  }, []);

  return (
    <div>
      <Header />

      <div className="flex min-h-screen items-center justify-center font-sans bg-black text-white">
        <main className="flex min-h-screen w-full max-w-6xl flex-col sm:flex-row justify-between py-20 px-6 sm:px-16 gap-10">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 w-full sm:w-1/2 text-left">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-zinc-50">
              Please add your drink requests for the team build!
            </h1>
            <p className="text-zinc-200">
              For the upcoming team build, please specify the drinks you would like so I can make sure we have something for everyone.
              I won&apos;t necessarily get everything requested, but I&apos;d like to have something for everyone.
            </p>

            {/* Team build info card */}
            <div className="rounded-lg border border-blue-500/40 bg-blue-950/40 p-4 text-white shadow-md backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-blue-300 mb-1">
                ☕ Team Build Details
              </h2>
              <div className="text-sm text-blue-100 space-y-2">
                <p>
                  <b>Date:</b> 13 November 2025<br />
                  <b>Time:</b> 15:30 — 19:30
                </p>

                <div>
                  <p className="font-semibold text-blue-200">🧩 15:30 — 16:30: Escape Room</p>
                  <p>
                    Venue:{" "}
                    <a
                      href="https://thegr8escape.co.za"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-300 hover:text-blue-100"
                    >
                      The Gr8 Escape
                    </a>
                    <br />
                    Expect 60 minutes of puzzles, teamwork, and arguing over who’s holding the last key.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-blue-200">🎮 16:30 — 19:30: Games & Food</p>
                  <p>
                    Location: <b>Daelin’s house</b>
                    <br />
                    Casual hangout with food, drinks, and possibly questionable competitiveness.
                    <br /><br />
                    Activities may include: 🎱 pool/snooker, 🏓 table tennis, ⚽ foosball, 🎯 darts, 🃏 poker
                  </p>
                </div>

                <p className="italic text-blue-200 pt-2">
                  #TeamBonding #EscapedAndReloaded
                </p>
              </div>
            </div>

            {joke && (
              <div className="rounded-lg border border-blue-500/40 bg-blue-950/40 p-4 text-white shadow-md backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-blue-300 mb-1">
                    Random Dad Joke
                </h2>
                <div className="text-sm text-blue-100 space-y-2">
                  {joke}
                </div>
              </div>
            )}

            {deployment.toLocaleLowerCase().includes('azure') && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0078D4] via-[#5E5E5E] to-[#0078D4] px-3 py-2 text-sm text-white shadow-sm">
                <span className="text-2xl leading-none">☁️</span>
                <div className="flex flex-col leading-tight">
                  <span>
                    Deployed on <b>Azure Container Apps</b><br />Fueled by <b>Azure Cosmos DB</b>.
                  </span>
                  <span className="italic text-blue-200">
                    #LearningAzure — so why not build this elaborate &amp; unnecessary drink request app? ¯\_(ツ)_/¯
                  </span>

                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6 w-full sm:w-1/2">
            <InteractiveInput />
            <ItemList />
          </div>

        </main>
      </div>

      <div className="w-full bg-gray-900 text-center py-4 text-sm text-gray-500">
        <span>Deployment: <b>{deployment}</b>&nbsp; |&nbsp; Version: <b>{version}</b></span>
      </div>
    </div>
  );
}
