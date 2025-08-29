import { SkullIcon, StarIcon } from "lucide-react";
import { Effect } from "./Effect";
import type { DrawSteelMaliceFeature } from "../types/maliceZod";

export function Feature({ feature }: { feature: DrawSteelMaliceFeature }) {
  return (
    <div className="flex gap-1">
      <div>
        {["ajax", "solo monster"].includes(feature.name.toLowerCase()) ? (
          <SkullIcon className="size-5" />
        ) : (
          <StarIcon className="size-5" />
        )}
      </div>
      <div className="w-full space-y-2 ">
        <div className="flex justify-between">
          <div className="font-bold">{feature.name}</div>
          <div className="font-bold">{feature.cost}</div>
        </div>
        <div className="space-y-2">
          {feature.effects.map((effect, index) => (
            <Effect key={index} effect={effect} />
          ))}
        </div>
      </div>
    </div>
  );
}
