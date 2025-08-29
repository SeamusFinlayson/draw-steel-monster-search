import { targetArrow } from "@lucide/lab";
import {
  SkullIcon,
  AlertCircleIcon,
  Grid2X2Icon,
  SwordIcon,
  BowArrowIcon,
  UserIcon,
  Ruler,
  Icon,
} from "lucide-react";
import type { DrawSteelAbility } from "../types/drawSteelAbilityZod";
import { Effect } from "./Effect";

export function Ability({ ability }: { ability: DrawSteelAbility }) {
  let roll: string | undefined = undefined;
  ability.effects.forEach(val => {
    if ("roll" in val && val.roll) {
      roll = val.roll.replace("Power Roll", "2d10");
    }
  });

  return (
    <div className="flex gap-1">
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
