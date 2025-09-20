import z from "zod";
import {
  DrawSteelFeatureBlockZod,
  DrawSteelStatblockZod,
} from "./DrawSteelZod";

export const pathBundle = z.strictObject({
  statblock: z.string(),
  features: z.array(z.string()),
});
export const indexBundle = z.strictObject({
  ...pathBundle.shape,
  name: z.string(),
  level: z.number(),
  ev: z.string(),
  roles: z.array(z.string()),
  ancestry: z.array(z.string()),
});
export const monsterDataBundle = z.strictObject({
  key: z.string(),
  statblock: DrawSteelStatblockZod,
  featuresBlocks: z.array(DrawSteelFeatureBlockZod),
});
export type IndexBundle = z.infer<typeof indexBundle>;
export type PathBundle = z.infer<typeof pathBundle>;
export type monsterDataBundle = z.infer<typeof monsterDataBundle>;
