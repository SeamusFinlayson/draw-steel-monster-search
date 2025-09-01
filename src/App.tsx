import { useEffect, useState } from "react";
import { StatBlock } from "./creatureBlockUI/StatBlock";
import fuzzysort from "fuzzysort";
import { MaliceBlock } from "./creatureBlockUI/MaliceBlock";
import type { IndexBundle, StatblockDataBundle } from "./types/bundlesZod";
import { validateStatblocks } from "./actions/validateStatblocks";
import { validateMalice } from "./actions/validatemalice";
import { generateIndex } from "./actions/generateIndex";
import { drawSteelMalice } from "./types/maliceZod";
import { drawSteelStatblock } from "./types/statblockZod";
import getUrl from "./helpers/getUrl";
import monsterIndexRaw from "./monsterIndex.json";
import getTypedData from "./helpers/getTypedData";

const params = new URLSearchParams(document.location.search);
const devMode = params.get("dev");

function App() {
  const [inputValue, setInputValue] = useState("");
  const [monsterIndex, setMonsterIndex] = useState<IndexBundle[]>([]);
  const [activeMonsterData, setActiveMonsterData] =
    useState<StatblockDataBundle>();
  const [invalidStatblockURLs, setInvalidStatblockURLs] = useState<string[]>(
    []
  );

  const [indexDownload, setIndexDownload] = useState<{
    href: string;
    download: string;
  }>();

  useEffect(() => setMonsterIndex(monsterIndexRaw as IndexBundle[]), []);

  return (
    <div className="p-6 bg-zinc-50 w-full h-dvh text-black overflow-auto text-sm flex flex-col gap-6">
      {activeMonsterData?.statblock && (
        <div className="w-full bg-zinc-50 top-0 left-0 fixed h-dvh">
          <div className="h-full flex flex-col items-center">
            <div className="overflow-y-auto p-6 size-full flex flex-col items-center gap-12">
              <StatBlock statblock={activeMonsterData.statblock} />
              {/* <LeafIcon className="shrink-0" /> */}
              {activeMonsterData.features.length > 0 &&
                activeMonsterData.features.map(item => (
                  <MaliceBlock key={item.name} malice={item} />
                ))}
            </div>
            <div className="p-2 pt-0  w-full">
              <button
                className=" bg-zinc-950 hover:bg-zinc-900 duration-100 text-white size-full rounded-2xl p-4 grid place-items-center"
                onClick={() => setActiveMonsterData(undefined)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <input
          placeholder="search"
          className="w-full border border-zinc-300 focus:border-zinc-950 outline-none p-4 rounded-lg"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>

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
                indexBundle={indexBundle}
                invalidStatblockURLs={invalidStatblockURLs}
                onClick={async () => {
                  const statblockUrl = getUrl(indexBundle.statblock);
                  const maliceUrls = indexBundle.features.map(item =>
                    getUrl(item)
                  );

                  const statblock = await getTypedData(
                    statblockUrl,
                    drawSteelStatblock.parse
                  );
                  const malice = await Promise.all(
                    maliceUrls.map(item =>
                      getTypedData(item, drawSteelMalice.parse)
                    )
                  );

                  console.log({ statblock, malice });
                  setActiveMonsterData({ statblock, features: malice });
                }}
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

export default App;

function MonsterItem({
  indexBundle,
  invalidStatblockURLs,
  onClick,
}: {
  indexBundle: IndexBundle;
  invalidStatblockURLs: string[];
  onClick: () => void;
}) {
  return (
    <button
      key={indexBundle.statblock}
      data-error={invalidStatblockURLs.includes(indexBundle.statblock)}
      className="bg-zinc-100 data-[error=true]:bg-red-100 hover:data-[error=true]:bg-red-200 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
      onClick={onClick}
    >
      {indexBundle.name}
    </button>
  );
}
