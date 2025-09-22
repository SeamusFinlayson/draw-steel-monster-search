import { useState } from "react";
import fuzzysort from "fuzzysort";
import type { IndexBundle } from "../types/bundlesZod";
import { validateStatblocks } from "../actions/validateStatblocks";
import { validateMalice } from "../actions/validatemalice";
import { generateIndex } from "../actions/generateIndex";
import { ListFilterIcon, XIcon } from "lucide-react";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { Checkbox } from "./ui/checkbox";
import Header from "./Header";
import { Slider } from "./ui/slider";

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
  const [open, setOpen] = useState(false);
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [levelRange, setLevelRange] = useState([1, 11]);
  const [evRange, setEvRange] = useState([0, 156]);

  return (
    <div className="grow flex flex-col">
      <nav>
        <Header />
        <div className="bg-zinc-100 ">
          <div className="flex gap-2 mx-auto max-w-6xl sm:gap-4 items-center flex-wrap p-4 sm:p-6  pt-0 sm:pt-0">
            <input
              placeholder="Search"
              className="grow border bg-zinc-50 border-zinc-300 focus:border-zinc-950 outline-none p-4 rounded-lg"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <button
              data-pressed={open}
              className=" hover:bg-zinc-200  shrink-0 p-2 data-[pressed=true]:bg-zinc-200 data-[pressed=true]:hover:bg-zinc-300 duration-100 rounded-full grid place-items-center gap-2"
              onClick={() => setOpen(!open)}
            >
              <div
                data-visible={
                  organizations.length > 0 ||
                  roles.length > 0 ||
                  keywords.length > 0 ||
                  !(levelRange.includes(1) && levelRange.includes(11)) ||
                  !(evRange.includes(0) && evRange.includes(156))
                }
                className="absolute translate-x-[14px] -translate-y-[14px] size-3.5 scale-0  data-[visible=true]:scale-100 duration-100 ease-in bg-rose-500 rounded-full"
              />
              <ListFilterIcon />
            </button>
            <button
              className=" hover:bg-red-200 shrink-0 p-2 duration-100 rounded-full grid place-items-center gap-2"
              onClick={() => {
                setInputValue("");
                setOrganizations([]);
                setRoles([]);
                setKeywords([]);
                setOpen(false);
                setLevelRange([1, 11]);
                setEvRange([0, 156]);
              }}
            >
              <XIcon />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex flex-col grow">
        <div className="border-b border-zinc-300">
          <Collapsible open={open}>
            <CollapsibleContent>
              <div className="bg-zinc-100">
                <div className="mx-auto max-w-6xl p-4 sm:p-6 pt-0 sm:pt-0 rounded-2xl @container">
                  <div className="sm:flex space-y-4">
                    <div className="grow">
                      <div className="mb-2 font-bold">Level</div>
                      <div className="p-4 flex gap-4">
                        <div className="font-semibold w-8">
                          {Math.min(...levelRange)}
                        </div>
                        <Slider
                          min={1}
                          max={11}
                          value={levelRange}
                          onValueChange={setLevelRange}
                        />
                        <div className="font-semibold w-8">
                          {Math.max(...levelRange)}
                        </div>
                      </div>
                    </div>
                    <div className="grow">
                      <div className="mb-2 font-bold">Encounter Value</div>
                      <div className="p-4 flex gap-4">
                        <div className="font-semibold w-8">
                          {Math.min(...evRange)}
                        </div>
                        <Slider
                          min={0}
                          max={156}
                          value={evRange}
                          onValueChange={setEvRange}
                        />
                        <div className="font-semibold w-8">
                          {Math.max(...evRange)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 mb-2 font-bold">Organization</div>
                  <div className="grid grid-cols-2 @min-[480px]:grid-cols-3 @min-[640px]:grid-cols-4 @min-[800px]:grid-cols-5 @min-[960px]:grid-cols-6">
                    {[
                      "Minion",
                      "Horde",
                      "Platoon",
                      "Elite",
                      "Leader",
                      "Solo",
                    ].map(val => (
                      <div key={val} className="flex items-center ">
                        <Checkbox
                          id={val}
                          checked={organizations.includes(val)}
                          onCheckedChange={checked => {
                            if (checked)
                              setOrganizations(prev => [...prev, val]);
                            else
                              setOrganizations(prev => [
                                ...prev.filter(item => item !== val),
                              ]);
                          }}
                        />
                        <label htmlFor={val}>{val}</label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 mb-2 font-bold">Role</div>
                  <div className="grid grid-cols-2 @min-[480px]:grid-cols-3 @min-[640px]:grid-cols-4 @min-[800px]:grid-cols-5 @min-[960px]:grid-cols-6">
                    {[
                      "Ambusher",
                      "Artillery",
                      "Brute",
                      "Controller",
                      "Defender",
                      "Harrier",
                      "Hexer",
                      "Mount",
                      "Support",
                    ].map(val => (
                      <div key={val} className="flex items-center ">
                        <Checkbox
                          id={val}
                          checked={roles.includes(val)}
                          onCheckedChange={checked => {
                            if (checked) setRoles(prev => [...prev, val]);
                            else
                              setRoles(prev => [
                                ...prev.filter(item => item !== val),
                              ]);
                          }}
                        />
                        <label htmlFor={val}>{val}</label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 mb-2 font-bold">Keywords</div>
                  <div className="grid grid-cols-2 @min-[480px]:grid-cols-3 @min-[640px]:grid-cols-4 @min-[800px]:grid-cols-5 @min-[960px]:grid-cols-6">
                    {[...new Set(monsterIndex.flatMap(val => val.ancestry))]
                      .sort((a, b) => a.localeCompare(b))
                      .map(val => (
                        <div key={val} className="flex items-center ">
                          <Checkbox
                            id={val}
                            checked={keywords.includes(val)}
                            onCheckedChange={checked => {
                              if (checked) setKeywords(prev => [...prev, val]);
                              else
                                setKeywords(prev => [
                                  ...prev.filter(item => item !== val),
                                ]);
                            }}
                          />
                          <label htmlFor={val}>{val}</label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="flex flex-col gap-6 p-4 sm:p-6 mx-auto h-full max-w-6xl">
          <div className="space-y-3 grow">
            <div className="flex gap-3 flex-wrap">
              {fuzzysort
                .go(
                  inputValue,
                  monsterIndex
                    .filter(item => {
                      if (item.level < Math.min(...levelRange)) return false;
                      if (item.level > Math.max(...levelRange)) return false;
                      return true;
                    })
                    .filter(item => {
                      let ev = parseFloat(item.ev);
                      if (Number.isNaN(ev)) ev = 0;
                      if (ev < Math.min(...evRange)) return false;
                      if (ev > Math.max(...evRange)) return false;
                      return true;
                    })
                    .filter(item => {
                      if (organizations.length <= 0) return true;
                      for (const str of item.roles) {
                        if (organizations.includes(str)) return true;
                      }
                      return false;
                    })
                    .filter(item => {
                      if (roles.length <= 0) return true;
                      for (const str of item.roles) {
                        if (roles.includes(str)) return true;
                      }
                      return false;
                    })
                    .filter(item => {
                      if (keywords.length <= 0) return true;
                      for (const str of item.ancestry) {
                        if (keywords.includes(str)) return true;
                      }
                      return false;
                    }),
                  {
                    keys: [
                      "name",
                      obj => obj.ancestry.join(" "),
                      obj => obj.roles.join(" "),
                    ],
                    all: true,
                    threshold: 0.3,
                  }
                )
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

          {devMode === "true" && (
            <div className="space-y-3">
              <div className="font-bold">Actions</div>
              <div className="flex gap-3 flex-wrap">
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

                <button
                  className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
                  onClick={() => {
                    const set = new Set(
                      monsterIndex.flatMap(val => val.ancestry)
                    );
                    console.log([...set].sort((a, b) => a.localeCompare(b)));
                  }}
                >
                  Generate Keywords List
                </button>

                <button
                  className="bg-zinc-100 hover:bg-zinc-200 py-2 px-3 duration-100 rounded-sm"
                  onClick={() => {
                    console.log(
                      Math.max(
                        ...monsterIndex
                          .map(val => {
                            if (Number.isNaN(parseFloat(val.ev)))
                              console.log(val.name);
                            return parseFloat(val.ev);
                          })
                          .filter(val => !Number.isNaN(val))
                      )
                    );
                  }}
                >
                  Find Highest EV
                </button>
              </div>
            </div>
          )}

          <footer className="mx-auto max-w-6xl">
            Draw Steel Monster Search is an independent product published under
            the DRAW STEEL Creator License and is not affiliated with MCDM
            Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.
          </footer>
        </div>
      </main>
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
