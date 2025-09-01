import { useEffect, useState } from "react";
import type { IndexBundle, StatblockDataBundle } from "./types/bundlesZod";
import monsterIndexRaw from "./monsterIndex.json";
import SearchView from "./SearchView";
import MonsterView from "./MonsterView";

function App() {
  const [monsterIndex, setMonsterIndex] = useState<IndexBundle[]>([]);
  const [activeMonsterData, setActiveMonsterData] =
    useState<StatblockDataBundle>();

  useEffect(() => setMonsterIndex(monsterIndexRaw as IndexBundle[]), []);

  return (
    <div className="h-screen text-black text-sm flex flex-col gap-6">
      {activeMonsterData?.statblock ? (
        <MonsterView
          activeMonsterData={activeMonsterData}
          setActiveMonsterData={setActiveMonsterData}
        />
      ) : (
        <SearchView
          monsterIndex={monsterIndex}
          setActiveMonsterData={setActiveMonsterData}
        />
      )}
    </div>
  );
}

export default App;
