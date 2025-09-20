import { useState } from "react";
import fuzzysort from "fuzzysort";
import type { IndexBundle } from "../types/bundlesZod";
import { validateStatblocks } from "../actions/validateStatblocks";
import { validateMalice } from "../actions/validatemalice";
import { generateIndex } from "../actions/generateIndex";

const params = new URLSearchParams(document.location.search);
const devMode = params.get("dev");

export default function SearchView({
  monsterIndex,
}: {
  monsterIndex: IndexBundle[];
}) {
  const [inputValue, setInputValue] = useState("");
  const [invalidStatblockURLs, setInvalidStatblockURLs] = useState<string[]>(
    []
  );
  const [indexDownload, setIndexDownload] = useState<{
    href: string;
    download: string;
  }>();

  return (
    <div className="flex flex-col gap-6 p-6">
      <input
        placeholder="search"
        className="w-full border border-zinc-300 focus:border-zinc-950 outline-none p-4 rounded-lg"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />

      {devMode === "true" && (
        <div className="space-y-3">
          <div>Actions</div>
          <div className="flex gap-3">
            <button
              className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
              onClick={() =>
                validateStatblocks(monsterIndex, urls =>
                  setInvalidStatblockURLs(urls)
                )
              }
            >
              Validate Statblocks
            </button>

            <button
              className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
              onClick={() => validateMalice(monsterIndex)}
            >
              Validate Malice
            </button>

            <button
              className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
              onClick={async () => setIndexDownload(await generateIndex())}
            >
              Generate Index
            </button>

            {indexDownload && (
              <a
                className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
                {...indexDownload}
              >
                Download Index
              </a>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3 grow">
        <div>Results</div>
        <div className="flex gap-3 flex-wrap">
          {fuzzysort
            .go(inputValue, monsterIndex, {
              keys: [
                "name",
                obj => obj.ancestry.join(),
                obj => obj.roles.join(),
                obj => "level " + obj.level.toString(),
              ],
              all: true,
              threshold: 0.3,
            })
            .map(val => val.obj)
            .map(indexBundle => (
              <MonsterItem
                key={indexBundle.statblock}
                indexBundle={indexBundle}
                invalidStatblockURLs={invalidStatblockURLs}
                statblock={indexBundle.statblock}
              />
            ))}
        </div>
      </div>

      <div>
        Draw Steel Monster Search is an independent product published under the
        DRAW STEEL Creator License and is not affiliated with MCDM Productions,
        LLC. DRAW STEEL © 2024 MCDM Productions, LLC.
      </div>
    </div>
  );
}

function MonsterItem({
  indexBundle,
  invalidStatblockURLs,
  statblock,
}: {
  indexBundle: IndexBundle;
  invalidStatblockURLs: string[];
  statblock: string;
}) {
  const url = new URL(window.location.href);
  url.searchParams.delete("statblock");
  url.searchParams.set("statblock", statblock);
  return (
    <a
      key={indexBundle.statblock}
      data-error={invalidStatblockURLs.includes(indexBundle.statblock)}
      className="bg-zinc-100 data-[error=true]:bg-red-100 hover:data-[error=true]:bg-red-200 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
      href={url.toString()}
    >
      {indexBundle.name}
    </a>
  );
}
