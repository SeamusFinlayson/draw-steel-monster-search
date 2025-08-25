import {
  AlertCircleIcon,
  BowArrowIcon,
  Grid2X2Icon,
  Icon,
  Ruler,
  SkullIcon,
  StarIcon,
  SwordIcon,
} from "lucide-react";
import type {
  DrawSteelAbility,
  DrawSteelStatblock,
  DrawSteelTrait,
} from "./types/statblock";
import { targetArrow } from "@lucide/lab";

export function StatBlock({ statblock }: { statblock: DrawSteelStatblock }) {
  return (
    <div className="w-[450px] space-y-2">
      <div>
        <div className="bg-zinc-300 p-1">
          <div className="flex justify-between items-end">
            <div className="font-bold text-base">{statblock.name}</div>
            <div className="font-bold">{`Level ${statblock.level} ${statblock.roles}`}</div>
          </div>
          <div className="flex justify-between">
            <div>{statblock.ancestry.join(", ")}</div>
            <div>{`EV ${statblock.ev}`}</div>
          </div>
        </div>
        <div className="w-full border-b border-zinc-950" />
      </div>

      <div className="space-y-2 px-1">
        <div className="grid grid-cols-5">
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
        {statblock.movement && (
          <div>
            <span className="font-bold">{"Movement: "}</span>
            <span>{statblock.movement}</span>
          </div>
        )}
      </div>

      <div className="w-full border-b border-zinc-950" />

      <div className="flex justify-between gap-1.5 text-sm px-1">
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

      <div>
        {statblock.traits?.map(trait => (
          <Trait key={trait.name} trait={trait} />
        ))}
      </div>

      <div>
        {statblock.abilities?.map(ability => (
          <Ability key={ability.name} ability={ability} />
        ))}
      </div>
    </div>
  );
}

function Trait({ trait }: { trait: DrawSteelTrait }) {
  return (
    <div className="border-t flex border-zinc-950 pl-0 p-1 gap-1">
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

function Ability({ ability }: { ability: DrawSteelAbility }) {
  let roll: string | undefined = undefined;
  ability.effects.forEach(val => {
    if ("roll" in val) roll = val.roll.replace("Power Roll", "2d10");
  });

  return (
    <div className="border-t border-zinc-950  flex p-1 pl-0 gap-1">
      <div>
        {(() => {
          if (ability.cost?.includes("Villain Action"))
            return <SkullIcon className="size-5" />;
          if (ability.type === "Triggered action")
            return <AlertCircleIcon className="size-5" />;
          if (ability.keywords?.includes("Area"))
            return <Grid2X2Icon className="size-5" />;
          if (ability.keywords?.includes("Melee"))
            return <SwordIcon className="size-5" />;
          if (ability.keywords?.includes("Ranged"))
            return <BowArrowIcon className="size-5" />;
        })()}
      </div>
      <div className="w-full space-y-2">
        <div>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <div className="font-bold">{ability.name}</div>
              <div>{roll}</div>
            </div>
            <div className="font-bold">{ability.cost}</div>
          </div>
          <div className="flex justify-between">
            <div>{ability.keywords?.join(", ")}</div>
            <div>{ability.type}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <Ruler className="size-4" />
              <div>{ability.distance}</div>
            </div>
            <span className="flex gap-1 items-center">
              <Icon iconNode={targetArrow} className="size-4" />
              <span>{ability.target}</span>
            </span>
          </div>
        </div>
        <div>{ability.trigger}</div>
        <div className="space-y-2">
          {ability.effects.map((effect, index) => (
            <Effect key={index} effect={effect} />
          ))}
        </div>
        <div className="italic">{ability.flavor}</div>
      </div>
    </div>
  );
}

function Effect({
  effect,
}: {
  effect:
    | {
        [k: string]: string;
        roll: string;
      }
    | {
        name: string;
        cost: string;
        effect: string;
      }
    | {
        name: string;
        effect: string;
      }
    | {
        cost: string;
        effect: string;
      }
    | {
        effect: string;
      };
}) {
  if ("roll" in effect) {
    return (
      <div>
        {/* <div className="font-semibold">{effect.roll}</div> */}
        {["t1", "t2", "t3", "critical"].map(key => (
          <div key={key}>
            {key in effect && (
              <div className="flex gap-1">
                <span className="font-semibold text-xs w-8 flex justify-center-safe">
                  {(() => {
                    if (key === "t1") return "<11";
                    if (key === "t2") return "12-16";
                    if (key === "t3") return "17+";
                  })()}
                </span>
                {effect[key]}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="">
      {"name" in effect && (
        <span className="font-semibold">{`${effect.name}: `}</span>
      )}
      {"cost" in effect && (
        <span className="font-semibold">{`${effect.cost}: `}</span>
      )}
      {"effect" in effect && <span>{effect.effect}</span>}
    </div>
  );
}
