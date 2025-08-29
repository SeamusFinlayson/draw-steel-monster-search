import { drawSteelAbility } from "../types/drawSteelAbilityZod";
import {
  drawSteelMaliceFeature,
  type DrawSteelMalice,
} from "../types/maliceZod";
import { Ability } from "./Ability";
import { Feature } from "./Feature";

export function MaliceBlock({ malice }: { malice: DrawSteelMalice }) {
  return (
    <div className="w-full max-w-lg">
      <div className=" p-1 rounded-sm bg-zinc-300">
        <div className="flex justify-between items-end">
          <div className="font-bold text-base">{malice.name}</div>
        </div>
      </div>

      <div>
        {malice.features?.map(item => {
          const feature = drawSteelMaliceFeature.safeParse(item);
          if (feature.success) {
            return (
              <div className="p-2 pl-0 border-b border-zinc-950">
                <Feature feature={feature.data} />
              </div>
            );
          }
          const ability = drawSteelAbility.safeParse(item);
          if (ability.success)
            return (
              <div className="p-2 pl-0 border-b border-zinc-950">
                <Ability key={item.name} ability={ability.data} />
              </div>
            );
        })}
      </div>
    </div>
  );
}
