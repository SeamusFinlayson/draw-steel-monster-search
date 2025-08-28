import z from "zod";

export const powerRollEffect = z.strictObject({
  roll: z.string(),
  t1: z.string().optional(),
  t2: z.string().optional(),
  t3: z.string().optional(),
  crit: z.string().optional(),
  // "11 or lower": z.string().optional(),
  // "12-16": z.string().optional(),
  // "17+": z.string().optional(),
  // "nat 19-20": z.string().optional(),
});
export const testEffect = z.strictObject({
  effect: z.string(),
  name: z.string().optional(),
  cost: z.string().optional(),
  t1: z.string().optional(),
  t2: z.string().optional(),
  t3: z.string().optional(),
  crit: z.string().optional(),
  // "11 or lower": z.string().optional(),
  // "12-16": z.string().optional(),
  // "17+": z.string().optional(),
  // "nat 19-20": z.string().optional(),
});
export const namedEffectWithCost = z.strictObject({
  name: z.string(),
  cost: z.string(),
  effect: z.string(),
});
export const namedEffect = z.strictObject({
  name: z.string(),
  effect: z.string(),
});
export const costedEffect = z.strictObject({
  cost: z.string(),
  effect: z.string(),
});
export const namelessEffect = z.strictObject({
  effect: z.string(),
});
export const drawSteelEffect = z.union([
  powerRollEffect,
  testEffect,
  namedEffectWithCost,
  namedEffect,
  costedEffect,
  namelessEffect,
]);
export const drawSteelTrait = z.strictObject({
  name: z.string(),
  effects: z.array(drawSteelEffect).min(1),
});
export const drawSteelAbility = z.strictObject({
  name: z.string(),
  icon: z.string().optional(),
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
export const drawSteelStatblock = z.strictObject({
  name: z.string(),
  level: z.number().optional(),
  roles: z.array(z.string()),
  ancestry: z.array(z.string()),
  ev: z.string(),
  stamina: z.string(),
  immunities: z.array(z.string()).optional(),
  weaknesses: z.array(z.string()).optional(),
  speed: z.number(),
  movement: z.string().optional(),
  melee_distance: z.number().optional(),
  ranged_distance: z.number().optional(),
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
export type PowerRollEffect = z.infer<typeof powerRollEffect>;
export type TestEffect = z.infer<typeof testEffect>;
export type NamedEffectWithCost = z.infer<typeof namedEffectWithCost>;
export type NamedEffect = z.infer<typeof namedEffect>;
export type CostedEffect = z.infer<typeof costedEffect>;
export type NamelessEffect = z.infer<typeof namelessEffect>;
export type DrawSteelEffect = z.infer<typeof drawSteelEffect>;
export type DrawSteelTrait = z.infer<typeof drawSteelTrait>;
export type DrawSteelAbility = z.infer<typeof drawSteelAbility>;
export type DrawSteelStatblock = z.infer<typeof drawSteelStatblock>;
