import type { DrawSteelEffect } from "../types/drawSteelEffectsZod";
import { applyTextEffects } from "./applyTextEffects";

export function Effect({ effect }: { effect: DrawSteelEffect }) {
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
