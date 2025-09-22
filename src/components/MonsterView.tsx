import { FeatureBlock } from "../creatureBlockUI/FeatureBlock";
import { StatBlock } from "../creatureBlockUI/StatBlock";
import { monsterDataBundle } from "../types/bundlesZod";
import Header from "./Header";

export default function MonsterView({
  monsterData: monsterData,
}: {
  monsterData: monsterDataBundle;
}) {
  const url = new URL(window.location.href);
  url.searchParams.delete("statblock");

  return (
    <div>
      <nav className="border-b border-zinc-300">
        <Header />
      </nav>
      <main>
        <div className="grid lg:grid-cols-2 justify-items-center gap-y-8 py-4 sm:py-6 lg:mx-auto mx-4 sm:mx-6 max-w-6xl">
          <div className="lg:mx-6">
            <StatBlock statblock={monsterData.statblock} />
          </div>
          {/* <LeafIcon className="shrink-0" /> */}
          <div className="lg:mx-6 grid gap-8 h-fit">
            {monsterData.featuresBlocks.length > 0 &&
              monsterData.featuresBlocks.map(item => (
                <FeatureBlock
                  key={item.name + item.level}
                  featureBlock={item}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
