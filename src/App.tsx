import { useEffect, useState } from "react";
import type { StatblockDataBundle } from "./types/bundlesZod";
import monsterIndexRaw from "./monsterIndex.json";
import SearchView from "./SearchView";
import MonsterView from "./MonsterView";
import getTypedData from "./helpers/getTypedData";
import { drawSteelStatblock } from "./types/statblockZod";
import { drawSteelMalice } from "./types/maliceZod";
import getUrl from "./helpers/getUrl";

const params = new URLSearchParams(document.location.search);
const statblockUrlParam = params.get("statblock");

function App() {
  const [statblockPath] = useState(statblockUrlParam);
  const [activeMonsterData, setActiveMonsterData] =
    useState<StatblockDataBundle>();

  useEffect(() => {
    const addMonsterStatblock = async () => {
      if (statblockPath === null) return;

      const monster = monsterIndexRaw.find(
        val => val.statblock === statblockPath
      );

      if (monster === undefined) throw new Error("Could not find statblock");

      const statblockUrl = getUrl(monster.statblock);
      const maliceUrls = monster.features.map(item => getUrl(item));

      const statblock = await getTypedData(
        statblockUrl,
        drawSteelStatblock.parse
      );
      const malice = await Promise.all(
        maliceUrls.map(item => getTypedData(item, drawSteelMalice.parse))
      );

      console.log({ statblock, malice });
      setActiveMonsterData({ statblock, features: malice });
    };
    addMonsterStatblock();
  }, [statblockPath]);

  return (
    <div className="h-screen text-black text-sm flex flex-col gap-6">
      {statblockPath ? (
        activeMonsterData && (
          <MonsterView activeMonsterData={activeMonsterData} />
        )
      ) : (
        <SearchView monsterIndex={monsterIndexRaw} />
      )}
    </div>
  );
}

export default App;
