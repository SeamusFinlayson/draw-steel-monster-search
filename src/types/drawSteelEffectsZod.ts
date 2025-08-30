import z from "zod";

export const powerRollEffect = z.strictObject({
  roll: z.string(),
  t1: z.string(),
  t2: z.string(),
  t3: z.string(),
  crit: z.string().optional(), // doesnt exist in data, not sure why its included in schema
  // "11 or lower": z.string().optional(),
  // "12-16": z.string().optional(),
  // "17+": z.string().optional(),
  // "nat 19-20": z.string().optional(),
});
export const testEffect = z.strictObject({
  effect: z.string(),
  name: z.string().optional(),
  cost: z.string().optional(),
  t1: z.string(),
  t2: z.string(),
  t3: z.string(),
  crit: z.string().optional(), // doesnt exist in data, not sure why its included in schema
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
export type PowerRollEffect = z.infer<typeof powerRollEffect>;
export type TestEffect = z.infer<typeof testEffect>;
export type NamedEffectWithCost = z.infer<typeof namedEffectWithCost>;
export type NamedEffect = z.infer<typeof namedEffect>;
export type CostedEffect = z.infer<typeof costedEffect>;
export type NamelessEffect = z.infer<typeof namelessEffect>;
export type DrawSteelEffect = z.infer<typeof drawSteelEffect>;
