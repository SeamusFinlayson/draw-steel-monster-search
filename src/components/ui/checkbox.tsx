"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

function Checkbox({
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [hasHover, setHasHover] = React.useState(false);

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-has-hover={hasHover}
      onMouseEnter={() => setHasHover(true)}
      onMouseLeave={() => setHasHover(false)}
      className={
        "peer group aspect-square shrink-0 rounded-full p-[11px] duration-150 outline-none data-[has-hover=true]:bg-black/7 focus-visible:bg-black/7"
      }
      {...props}
    >
      <div className="group-data-[state=checked]:border-rose-500 group-data-[state=checked]:bg-rose-500 grid aspect-square size-[20px] shrink-0 place-items-center rounded-[4px] border-2 border-zinc-950 ">
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className=" relative flex size-0 items-center justify-center  bg-white/20 duration-150 "
        >
          <CheckIcon className="size-4 stroke-3 shrink-0 text-white" />
        </CheckboxPrimitive.Indicator>
      </div>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
