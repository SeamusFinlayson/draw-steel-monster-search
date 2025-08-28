import { useEffect, useState } from "react";
import { StatBlock } from "./StatBlock";
import {
  drawSteelStatblock,
  type DrawSteelStatblock,
} from "./types/statblockZod";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [statBlockPaths, setStatBlockPaths] = useState<string[]>([]);
  const [statblock, setStatblock] = useState<DrawSteelStatblock>();
  const [invalidStatblockURLs, setInvalidStatblockURLs] = useState<string[]>(
    []
  );

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
            <div className="overflow-y-auto p-6 size-full grid  justify-items-center">
              <StatBlock statblock={statblock} />
            </div>
            <div className="p-2 pt-0  w-full">
              <button
                className=" bg-zinc-950 hover:bg-zinc-900 duration-100 text-white size-full rounded-2xl p-4 grid place-items-center"
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
        className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
        onClick={async () => {
          const badStatblocks: { file: string; errors: unknown }[] = [];
          await Promise.all(
            statBlockPaths.map(async path => {
              // Get
              const response = await fetch(path);
              const json = await response.json();

              // Validate
              const result = drawSteelStatblock.safeParse(json);
              if (!result.success) {
                badStatblocks.push({ file: path, errors: result.error });
              }
            })
          );

          if (badStatblocks.length > 0) console.error(badStatblocks);
          else console.log("All statblock pass validation");
          setInvalidStatblockURLs([...badStatblocks].map(val => val.file));
        }}
      >
        Fetch and Validate All
      </button>

      <div className="flex gap-3 flex-wrap">
        {statBlockPaths
          .filter(path =>
            path.toLowerCase().includes(inputValue.toLowerCase().trim())
          )
          .map(path => {
            const lastSlash = path.lastIndexOf("/");
            return (
              <button
                data-error={invalidStatblockURLs.includes(path)}
                className="bg-zinc-100 data-[error=true]:bg-red-100 hover:data-[error=true]:bg-red-200 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
                key={path}
                onMouseDown={() => fetch(path)}
                onClick={async () => {
                  // Get
                  const response = await fetch(path);
                  const json = await response.json();

                  // Validate
                  const result = drawSteelStatblock.safeParse(json);

                  if (!result.success) {
                    console.error(json, result.error);
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
