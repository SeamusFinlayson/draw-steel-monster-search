import z from "zod";
import { drawSteelEffect } from "./drawSteelEffectsZod";

export const drawSteelAbility = z.strictObject({
  name: z.string(),
  icon: z.string(), // mandatory?
  type: z.string(),
  cost: z.string().optional(),
  keywords: z.array(z.string()),
  distance: z.string().optional(),
  target: z.string().optional(),
  trigger: z.string().optional(),
  effects: z.array(drawSteelEffect).min(1),
  flavor: z.string().optional(),
  // metadata?: {
  //   [k: string]: unknown;
  // };
});
export type DrawSteelAbility = z.infer<typeof drawSteelAbility>;
