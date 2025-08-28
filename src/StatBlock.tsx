import {
  AlertCircleIcon,
  BowArrowIcon,
  Grid2X2Icon,
  Icon,
  Ruler,
  SkullIcon,
  StarIcon,
  SwordIcon,
  UserIcon,
} from "lucide-react";

import { targetArrow } from "@lucide/lab";
import type {
  DrawSteelAbility,
  DrawSteelEffect,
  DrawSteelStatblock,
  DrawSteelTrait,
} from "./types/statblockZod";

export function StatBlock({ statblock }: { statblock: DrawSteelStatblock }) {
  console.log(typeof statblock.stamina);
  return (
    <div className="w-full max-w-lg space-y-2">
      <div>
        <div className=" p-1 rounded-sm">
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
        <div className="flex flex-wrap justify-between gap-2 px-1">
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

      <div className="flex flex-wrap justify-between gap-1.5 text-sm px-1">
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

      <div className="space-y-2">
        {statblock.traits?.map(trait => (
          <Trait key={trait.name} trait={trait} />
        ))}
      </div>

      <div className="space-y-2">
        {statblock.abilities?.map(ability => (
          <Ability key={ability.name} ability={ability} />
        ))}
      </div>
    </div>
  );
}

function Trait({ trait }: { trait: DrawSteelTrait }) {
  return (
    <div className="border-t flex border-zinc-950 pl-0 px-1 gap-1 pt-2">
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
    if ("roll" in val && val.roll) {
      roll = val.roll.replace("Power Roll", "2d10");
    }
  });

  return (
    <div className="border-t border-zinc-950  flex px-1 pl-0 gap-1 pt-2">
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
          return <UserIcon className="size-5" />;
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
        {ability.trigger && (
          <div>
            <span className="font-semibold">{"Trigger: "}</span>
            {ability.trigger}
          </div>
        )}
        {ability.effects.length > 0 && (
          <div className="space-y-2">
            {ability.effects.map((effect, index) => (
              <Effect key={index} effect={effect} />
            ))}
          </div>
        )}
        {ability.flavor && <div className="italic">{ability.flavor}</div>}
      </div>
    </div>
  );
}

function Effect({ effect }: { effect: DrawSteelEffect }) {
  const PowerRollEntries = Object.keys(effect)
    .filter(key =>
      [
        "t1",
        "t2",
        "t3",
        "crit",
        "11 or lower",
        "12-16",
        "17+",
        "nat 19-20",
      ].includes(key)
    )
    .map(key => (
      <div key={key}>
        {key in effect && (effect as { [k: string]: string })[key] && (
          <div className="flex gap-1">
            <span className="font-semibold text-xs min-w-9 h-[19px] grid place-items-center border rounded-sm">
              {(() => {
                if (key === "t1" || key === "11 or lower") return "<11";
                if (key === "t2" || key === "12-16") return "12-16";
                if (key === "t3" || key === "17+") return "17+";
                if (key === "crit" || key === "nat 19-20") return "crit";
              })()}
            </span>
            <span>
              {applyTextEffects((effect as { [k: string]: string })[key])}
            </span>
          </div>
        )}
      </div>
    ));

  if ("roll" in effect) {
    return <div className="space-y-[1px]">{PowerRollEntries}</div>;
  }

  return (
    <>
      <div>
        {"name" in effect && (
          <span className="font-semibold">{`${effect.name}: `}</span>
        )}
        {"cost" in effect && (
          <span className="font-semibold">{`${effect.cost}: `}</span>
        )}
        {"effect" in effect && <span>{applyTextEffects(effect.effect)}</span>}
      </div>
      {PowerRollEntries.length > 0 && (
        <div className="space-y-[1px]">{PowerRollEntries}</div>
      )}
    </>
  );
}

function applyTextEffects(string: string) {
  const potencyRegex = /([MAIRP][ ][<][ ][-]?[\d])+/g;
  const characteristicTestRegex =
    /((?:Might|Agility|Intuition|Reason|Presence)(?: test))+/g;

  return string.split(potencyRegex).map((val, index) =>
    index % 2 ? (
      <span
        key={index}
        className="bg-zinc-950 rounded-sm font-semibold px-0.5 text-xs text-white"
      >
        {val}
      </span>
    ) : (
      val.split(characteristicTestRegex).map((val, index) =>
        index % 2 ? (
          <span key={index} className="font-bold">
            {val}
          </span>
        ) : (
          <span key={index}>{val}</span>
        )
      )
    )
  );
}
