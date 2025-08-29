import { useEffect, useState } from "react";
import { StatBlock } from "./creatureBlockUI/StatBlock";
import {
  drawSteelStatblock,
  type DrawSteelStatblock,
} from "./types/statblockZod";
import fuzzysort from "fuzzysort";
import { githubTree } from "./types/githubZod";
import { drawSteelMalice, type DrawSteelMalice } from "./types/maliceZod";
import { MaliceBlock } from "./creatureBlockUI/MaliceBlock";
import { LeafIcon } from "lucide-react";

type PathBundle = {
  path: string;
  url: string;
  maliceUrl?: string;
};

type jsonBundle = {
  statblock: DrawSteelStatblock;
  malice?: DrawSteelMalice;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [pathBundles, setPathBundles] = useState<PathBundle[]>([]);
  const [activeJsonBundle, setActiveJsonBundle] = useState<jsonBundle>();
  const [invalidStatblockURLs, setInvalidStatblockURLs] = useState<string[]>(
    []
  );

  useEffect(() => {
    async function fetchData() {
      // Get
      const getGithubTree = async (url: string, recursive = false) => {
        const request = await fetch(url + (recursive ? "?recursive=1" : ""));
        const json = await request.json();
        const tree = githubTree.parse(json.tree);
        return tree;
      };
      const rootTree = await getGithubTree(
        "https://api.github.com/repos/SeamusFinlayson/data-bestiary-json/git/trees/main?recursive=1"
      );

      const groups = rootTree.filter(
        item =>
          item.path.startsWith("Monsters/") &&
          item.path.match(/\//g)?.length === 1
      );

      const pathBundles: PathBundle[] = [];
      for (let i = 0; i < groups.length; i++) {
        const groupMalice = rootTree
          .filter(
            val =>
              val.path.startsWith(groups[i].path) &&
              val.path.includes("Features/") &&
              val.path.includes("Malice") &&
              val.path.endsWith(".json")
          )
          .map(
            val =>
              `https://raw.githubusercontent.com/SeamusFinlayson/data-bestiary-json/main/${val.path}`
          )[0];

        pathBundles.push(
          ...rootTree
            .filter(
              val =>
                val.path.startsWith(groups[i].path) &&
                val.path.includes("Statblocks/") &&
                val.path.endsWith(".json")
            )
            .map(val => ({
              path: val.path,
              url: `https://raw.githubusercontent.com/SeamusFinlayson/data-bestiary-json/main/${val.path}`,
              maliceUrl: groupMalice,
            }))
        );
      }
      setPathBundles(pathBundles);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-zinc-50 w-full h-full text-black overflow-auto text-sm space-y-6">
      {activeJsonBundle?.statblock && (
        <div className="w-full bg-zinc-50 top-0 left-0 fixed h-full ">
          <div className="h-full flex flex-col items-center">
            <div className="overflow-y-auto p-6 size-full flex flex-col items-center gap-6">
              <StatBlock statblock={activeJsonBundle.statblock} />
              <LeafIcon className="shrink-0" />
              {activeJsonBundle.malice && (
                <MaliceBlock malice={activeJsonBundle.malice} />
              )}
            </div>
            <div className="p-2 pt-0  w-full">
              <button
                className=" bg-zinc-950 hover:bg-zinc-900 duration-100 text-white size-full rounded-2xl p-4 grid place-items-center"
                onClick={() => setActiveJsonBundle(undefined)}
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

      <div className="space-y-3">
        <div>Results</div>
        <div className="flex gap-3 flex-wrap">
          {fuzzysort
            .go(inputValue, pathBundles, {
              key: "path",
              all: true,
              threshold: 0.2,
            })
            .map(val => val.obj)
            .map(val => {
              const lastSlash = val.url.lastIndexOf("/");
              return (
                <button
                  data-error={invalidStatblockURLs.includes(val.url)}
                  className="bg-zinc-100 data-[error=true]:bg-red-100 hover:data-[error=true]:bg-red-200 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
                  key={val.url}
                  onMouseDown={() => fetch(val.url)}
                  onClick={async () => {
                    const getData = async <T,>(
                      url: string,
                      typeGuard: (json: unknown) => T
                    ): Promise<T> => {
                      const response = await fetch(url);
                      const json = await response.json();
                      return typeGuard(json);
                    };

                    const statblock = await getData(
                      val.url,
                      drawSteelStatblock.parse
                    );
                    const malice = val.maliceUrl
                      ? await getData(val.maliceUrl, drawSteelMalice.parse)
                      : undefined;

                    console.log({ statblock, malice });
                    setActiveJsonBundle({ statblock, malice });
                  }}
                >
                  {val.url.substring(lastSlash + 1, val.url.length - 5)}
                </button>
              );
            })}
        </div>
      </div>

      <div className="space-y-3">
        <div>Actions</div>
        <button
          className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
          onClick={async () => {
            const badStatblocks: { file: string; errors: unknown }[] = [];
            await Promise.all(
              pathBundles.map(async bundle => {
                // Get
                const response = await fetch(bundle.url);
                const json = await response.json();

                // Validate
                const result = drawSteelStatblock.safeParse(json);
                if (!result.success) {
                  badStatblocks.push({
                    file: bundle.url,
                    errors: result.error,
                  });
                }
              })
            );

            if (badStatblocks.length > 0) console.error(badStatblocks);
            else console.log("All statblock pass validation");
            setInvalidStatblockURLs([...badStatblocks].map(val => val.file));

            alert("Check console for audit details");
          }}
        >
          Validate Statblocks
        </button>

        <button
          className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
          onClick={async () => {
            const badStatblocks: {
              file: string;
              errors: unknown;
            }[] = [];
            await Promise.all(
              pathBundles
                .map(val => val.maliceUrl)
                .filter(val => typeof val === "string")
                .map(async val => {
                  // Get
                  const response = await fetch(val);
                  const json = await response.json();

                  // Validate
                  const result = drawSteelMalice.safeParse(json);
                  if (!result.success) {
                    badStatblocks.push({
                      file: val,
                      errors: result.error,
                    });
                  }
                })
            );

            const noRepeats = [...new Set(badStatblocks)];
            if (noRepeats.length > 0) console.error(noRepeats);
            else console.log("All malice pass validation");
            setInvalidStatblockURLs([...noRepeats].map(val => val.file));

            alert("Check console for audit details");
          }}
        >
          Validate Malice
        </button>
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
