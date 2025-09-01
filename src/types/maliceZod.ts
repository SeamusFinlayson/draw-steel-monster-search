import z from "zod";
import { drawSteelEffect } from "./drawSteelEffectsZod";
import { drawSteelAbility } from "./drawSteelAbilityZod";

export const drawSteelMaliceFeature = z.strictObject({
  name: z.string(),
  icon: z.string().optional(), // shouldnt be optional
  cost: z.string().optional(),
  effects: z.array(drawSteelEffect),
});
export const drawSteelMalice = z.strictObject({
  name: z.string(),
  type: z
    .union([
      z.literal("Malice Features"),
      z.literal("+ Malice Features"),
      z.literal("Ajax Feature"),
    ])
    .optional(), // shoudlnt be optional, "+ malice feature" shouldnt be valid
  level: z.number().optional(),
  flavor: z.string(),
  stats: z.array(z.unknown()).max(0).optional(), // shouldnt exist
  features: z.array(z.union([drawSteelMaliceFeature, drawSteelAbility])),
});
export type DrawSteelMaliceFeature = z.infer<typeof drawSteelMaliceFeature>;
export type DrawSteelMalice = z.infer<typeof drawSteelMalice>;
