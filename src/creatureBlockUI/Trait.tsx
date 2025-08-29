import { SkullIcon, StarIcon } from "lucide-react";
import type { DrawSteelTrait } from "../types/statblockZod";
import { Effect } from "./Effect";

export function Trait({ trait }: { trait: DrawSteelTrait }) {
  return (
    <div className="flex gap-1">
      <div>
        {["ajax", "solo monster"].includes(trait.name.toLowerCase()) ? (
          <SkullIcon className="size-5" />
        ) : (
          <StarIcon className="size-5" />
        )}
      </div>
      <div className="w-full space-y-2 ">
        <div className="font-bold">{trait.name}</div>
        <div className="space-y-2">
          {trait.effects.map((effect, index) => (
            <Effect key={index} effect={effect} />
          ))}
        </div>
      </div>
    </div>
  );
}
