import { useEffect, useState } from "react";
import { validator } from "steel-compendium-sdk";
import type { DrawSteelStatblock } from "./types/statblock";
import { StatBlock } from "./StatBlock";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [statBlockPaths, setStatBlockPaths] = useState<string[]>([]);
  const [statblock, setStatblock] = useState<DrawSteelStatblock>();

  useEffect(() => {
    async function fetchData() {
      // Get
      const response = await fetch(
        "https://api.github.com/repos/SeamusFinlayson/data-bestiary-json/git/trees/main?recursive=1"
      );
      const json = await response.json();

      // Handle
      const tree = json.tree.filter(
        (item: { type: string; path: string }) =>
          item.type === "blob" && (item.path as string).endsWith(".json")
      );
      console.log(tree);
      const paths = tree.map(
        (item: { path: string }) =>
          `https://raw.githubusercontent.com/SeamusFinlayson/data-bestiary-json/main/${item.path}`
      );
      setStatBlockPaths(paths);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-zinc-50 w-full h-full text-black overflow-auto text-sm space-y-6">
      {statblock && (
        <div className="w-full bg-zinc-50 top-0 left-0 fixed h-full ">
          <div className="h-full flex flex-col items-center">
            <div className="overflow-y-auto p-2 size-full grid  justify-items-center">
              <StatBlock statblock={statblock} />
            </div>
            <div className="p-2 pt-0  w-full">
              <button
                className=" bg-zinc-950 text-white size-full rounded-2xl p-4 grid place-items-center"
                onClick={() => setStatblock(undefined)}
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
          className="w-full border border-zinc-300 focus:border-zinc-950 outline-none p-4 rounded-2xl"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>

      <button
        className="bg-zinc-200 py-0.5 px-1.5 rounded-sm"
        onClick={() => {
          const badStatblocks: { file: string; errors: unknown }[] = [];
          statBlockPaths.forEach(async path => {
            // Get
            const response = await fetch(path);
            const json = await response.json();

            // Validate
            const validation = await validator.validateJSON(
              json,
              "statblock.schema.json"
            );
            if (!validation.valid) {
              badStatblocks.push({ file: path, errors: validation.errors });
            }
          });
          console.log(badStatblocks);
        }}
      >
        Validate All
      </button>

      <div className="flex gap-2 flex-wrap">
        {statBlockPaths
          .filter(path =>
            path.toLowerCase().includes(inputValue.toLowerCase().trim())
          )
          .map(path => {
            const lastSlash = path.lastIndexOf("/");
            return (
              <button
                className="bg-zinc-200 hover:bg-zinc-300 py-0.5 px-1.5 rounded-sm"
                key={path}
                onMouseDown={() => fetch(path)}
                onClick={async () => {
                  // Get
                  const response = await fetch(path);
                  const json = await response.json();

                  // Validate
                  const validation = await validator.validateJSON(
                    json,
                    "statblock.schema.json"
                  );
                  if (!validation.valid) {
                    console.error(json, validation.errors);
                    throw "stat block did not match schema";
                  } else console.log(json);

                  // Handle
                  const statBlock = json as DrawSteelStatblock;
                  setStatblock(statBlock);
                }}
              >
                {path.substring(lastSlash + 1, path.length - 5)}
              </button>
            );
          })}
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
