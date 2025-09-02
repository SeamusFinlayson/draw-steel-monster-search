import { MaliceBlock } from "./creatureBlockUI/MaliceBlock";
import { StatBlock } from "./creatureBlockUI/StatBlock";
import type { StatblockDataBundle } from "./types/bundlesZod";

export default function MonsterView({
  activeMonsterData,
}: {
  activeMonsterData: StatblockDataBundle;
}) {
  const url = new URL(window.location.href);
  url.searchParams.delete("statblock");

  return (
    <div className="flex flex-col items-center pb-[60px]">
      <div className=" p-6  flex flex-col items-center gap-12">
        <StatBlock statblock={activeMonsterData.statblock} />
        {/* <LeafIcon className="shrink-0" /> */}
        {activeMonsterData.features.length > 0 &&
          activeMonsterData.features.map(item => (
            <MaliceBlock key={item.name} malice={item} />
          ))}
      </div>
      <div className="fixed left-0 bottom-0 w-full p-2 pt-0 bg-zinc-50">
        <a
          className=" bg-zinc-950  w-full hover:bg-zinc-900 duration-100 text-white  rounded-2xl p-4 grid place-items-center"
          href={url.toString()}
        >
          Close
        </a>
      </div>
    </div>
  );
}
