import type { DrawSteelStatblock } from "../types/statblockZod";
import { Ability } from "./Ability";
import { Trait } from "./Trait";

export function StatBlock({ statblock }: { statblock: DrawSteelStatblock }) {
  return (
    <div className="w-full max-w-lg space-y-2">
      <div className=" p-2 rounded-sm bg-zinc-300">
        <div className="flex justify-between items-end">
          <div className="font-bold text-base">{statblock.name}</div>
          <div className="font-bold">{`Level ${statblock.level} ${statblock.roles}`}</div>
        </div>
        <div className="flex justify-between">
          <div>{statblock.ancestry.join(", ")}</div>
          <div>{`EV ${statblock.ev}`}</div>
        </div>
      </div>

      <div className="space-y-2 px-2">
        <div className="flex flex-wrap justify-between gap-2">
          {[
            { label: "Size", value: statblock.size },
            { label: "Speed", value: statblock.speed },
            { label: "Stamina", value: statblock.stamina },
            { label: "Stability", value: statblock.stability },
            { label: "Free Strike", value: statblock.free_strike },
          ].map(item => (
            <div className="flex flex-col items-center" key={item.label}>
              <div>{item.value}</div>
              <div className="font-bold">{item.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <span className="font-bold">{"Immunity: "}</span>
              {statblock.immunities ? statblock.immunities : "—"}
            </div>
            <div>
              <span className="font-bold">{"Weakness: "}</span>
              {statblock.weaknesses ? statblock.weaknesses : "—"}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="font-bold">{"Movement: "}</span>
              <span>{statblock.movement ? statblock.movement : "—"}</span>
            </div>
            {statblock?.with_captain && statblock.roles.includes("Minion") && (
              <div className="">
                <span className="font-bold">{"With Captain: "}</span>
                <span>
                  {statblock.with_captain ? statblock.with_captain : "—"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full border-b border-zinc-950" />

      <div className="flex flex-wrap justify-between gap-1.5 text-sm px-2">
        {[
          { label: "Might", value: statblock.might },
          { label: "Agility", value: statblock.agility },
          { label: "Reason", value: statblock.reason },
          { label: "Intuition", value: statblock.intuition },
          { label: "Presence", value: statblock.presence },
        ].map(item => (
          <div className="flex gap-0.5" key={item.label}>
            <div className="font-bold">{item.label}</div>
            <div>{(item.value > 0 ? "+" : "") + item.value}</div>
          </div>
        ))}
      </div>

      <div className="w-full border-b border-zinc-950 mb-0" />

      <div>
        {statblock.traits?.map(trait => (
          <div className="p-2 pl-0 border-b border-zinc-950">
            <Trait key={trait.name} trait={trait} />
          </div>
        ))}
      </div>

      <div>
        {statblock.abilities?.map(ability => (
          <div className="p-2 pl-0 border-b border-zinc-950">
            <Ability key={ability.name} ability={ability} />
          </div>
        ))}
      </div>
    </div>
  );
}
