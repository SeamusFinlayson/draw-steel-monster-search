import z from "zod";
import { drawSteelEffect } from "./drawSteelEffectsZod";
import { drawSteelAbility } from "./drawSteelAbilityZod";

export const drawSteelTrait = z.strictObject({
  name: z.string(),
  effects: z.array(drawSteelEffect).min(1),
});
export const drawSteelStatblock = z.strictObject({
  name: z.string(),
  level: z.number(),
  roles: z.array(z.string()),
  ancestry: z.array(z.string()),
  ev: z.string(),
  stamina: z.string(),
  immunities: z.array(z.string()).optional(),
  weaknesses: z.array(z.string()).optional(),
  speed: z.number(),
  movement: z.string().optional(),
  size: z.string(),
  stability: z.number(),
  free_strike: z.number(),
  might: z.number(),
  agility: z.number(),
  reason: z.number(),
  intuition: z.number(),
  presence: z.number(),
  with_captain: z.string().optional(),
  traits: z.array(drawSteelTrait).optional(),
  abilities: z.array(drawSteelAbility).optional(),
});
export type DrawSteelTrait = z.infer<typeof drawSteelTrait>;
export type DrawSteelStatblock = z.infer<typeof drawSteelStatblock>;
