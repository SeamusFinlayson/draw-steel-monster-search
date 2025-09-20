import { useEffect, useState } from "react";
import type { monsterDataBundle } from "./types/bundlesZod";
import monsterIndexRaw from "./monsterIndex.json";
import SearchView from "./components/SearchView";
import MonsterView from "./components/MonsterView";
import fetchTypedData from "./helpers/getTypedData";
import {
  DrawSteelFeatureBlockZod,
  DrawSteelStatblockZod,
} from "./types/DrawSteelZod";
import getUrl from "./helpers/getUrl";

const params = new URLSearchParams(document.location.search);
const statblockUrlParam = params.get("statblock");

function App() {
  const [statblockPath] = useState(statblockUrlParam);
  const [activeMonsterData, setActiveMonsterData] =
    useState<monsterDataBundle>();

  useEffect(() => {
    const addMonsterStatblock = async () => {
      if (statblockPath === null) return;

      const monster = monsterIndexRaw.find(
        val => val.statblock === statblockPath
      );

      if (monster === undefined) throw new Error("Could not find statblock");

      const statblockUrl = getUrl(monster.statblock);
      const maliceUrls = monster.features.map(item => getUrl(item));

      const statblock = await fetchTypedData(
        statblockUrl,
        DrawSteelStatblockZod.parse
      );
      const malice = await Promise.all(
        maliceUrls.map(item =>
          fetchTypedData(item, DrawSteelFeatureBlockZod.parse)
        )
      );

      console.log({ statblock, malice });
      setActiveMonsterData({
        key: monster.statblock,
        statblock,
        featuresBlocks: malice,
      });
    };
    addMonsterStatblock();
  }, [statblockPath]);

  return (
    <div className="h-screen text-black text-sm flex flex-col gap-6">
      {statblockPath ? (
        activeMonsterData && <MonsterView monsterData={activeMonsterData} />
      ) : (
        <SearchView monsterIndex={monsterIndexRaw} />
      )}
    </div>
  );
}

export default App;
