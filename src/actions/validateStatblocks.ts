import getUrl from "../helpers/getUrl";
import type { PathBundle } from "../types/bundlesZod";
import { DrawSteelStatblockZod } from "../types/DrawSteelZod";

export async function validateStatblocks(
  pathBundles: PathBundle[],
  handleBadStatblocks: (urls: string[]) => void
) {
  const badStatblocks: { file: string; errors: unknown }[] = [];
  await Promise.all(
    pathBundles.map(async bundle => {
      // Get
      const response = await fetch(getUrl(bundle.statblock));
      const json = await response.json();

      // Validate
      const result = DrawSteelStatblockZod.safeParse(json);
      if (!result.success) {
        badStatblocks.push({
          file: bundle.statblock,
          errors: result.error,
        });
      }
    })
  );

  if (badStatblocks.length > 0) console.error(badStatblocks);
  else console.log("All statblock pass validation");
  handleBadStatblocks([...badStatblocks].map(val => val.file));

  alert("Check console for audit details");
}
