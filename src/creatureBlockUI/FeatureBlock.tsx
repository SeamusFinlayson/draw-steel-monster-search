import type { DrawSteelFeatureBlock } from "../types/DrawSteelZod";
import { Feature } from "./Feature";

export function FeatureBlock({
  featureBlock: featureBlock,
}: {
  featureBlock: DrawSteelFeatureBlock;
}) {
  return (
    <div className="w-full max-w-lg">
      <div className=" p-2 rounded-sm bg-zinc-300">
        <div className="flex justify-between items-end">
          <div className="font-bold text-base">{featureBlock.name}</div>
          <div className="font-bold ">
            {featureBlock.level && (
              <span>{`Level ${featureBlock.level}+ `}</span>
            )}
            <span>{featureBlock.featureblock_type}</span>
          </div>
        </div>
        <div>{featureBlock.flavor}</div>
      </div>

      <div>
        {featureBlock.features?.map(feature => (
          <div key={feature.name} className="p-2 pl-0 border-b border-zinc-950">
            <Feature feature={feature} />
          </div>
        ))}
      </div>
    </div>
  );
}
