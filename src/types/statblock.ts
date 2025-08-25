/**
 * A creature statblock for a Draw Steel.
 */
export interface DrawSteelStatblock {
  /**
   * The name of the creature.
   */
  name: string;
  /**
   * The creature's level.
   */
  level?: number;
  /**
   * Roles assigned to the creature (e.g., Boss, Minion).
   */
  roles: string[];
  /**
   * Ancestries or types the creature belongs to (e.g., Human, Humanoid).
   */
  ancestry: string[];
  /**
   * Encounter Value (EV) of the creature.
   */
  ev: string;
  /**
   * The creature's max stamina.
   */
  stamina: number & string;
  /**
   * List of immunities (e.g., Magic 2, Psionic 2).
   */
  immunities?: string[];
  /**
   * List of weaknesses (e.g., acid 3, holy 1).
   */
  weaknesses?: string[];
  /**
   * Movement speed of the creature (e.g., 5).
   */
  speed: number & string;
  /**
   * Movement types of the creature (e.g., 'climb, fly, swim').
   */
  movement?: string;
  /**
   * Melee distance of the creature.
   */
  melee_distance?: number;
  /**
   * Ranged distance of the creature.
   */
  ranged_distance?: number;
  /**
   * Size category (e.g., 1M for medium).
   */
  size: string;
  /**
   * Stability value of the creature.
   */
  stability: number;
  /**
   * The free strike value.
   */
  free_strike: number;
  /**
   * Might modifier.
   */
  might: number;
  /**
   * Agility modifier.
   */
  agility: number;
  /**
   * Reason modifier.
   */
  reason: number;
  /**
   * Intuition modifier.
   */
  intuition: number;
  /**
   * Presence modifier.
   */
  presence: number;
  /**
   * Effect when a captain is present.
   */
  with_captain?: string;
  /**
   * Special traits of the creature.
   */
  traits?: DrawSteelTrait[];
  /**
   * List of abilities (see Ability schema).
   */
  abilities?: DrawSteelAbility[];
}
export interface DrawSteelTrait {
  /**
   * The name of the trait.
   */
  name: string;
  /**
   * List of effects (flexible formats)
   */
  effects: [
    (
      | {
          /**
           * Power Roll expression (e.g., "2d10 + 3")
           */
          roll: string;
          /**
           * Tier result (key can be '11 or lower', '12-16', '17+', 'crit', etc.)
           */
          [k: string]: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Description of what the effect does
           */
          effect: string;
        }
    ),
    ...(
      | {
          /**
           * Power Roll expression (e.g., "2d10 + 3")
           */
          roll: string;
          /**
           * Tier result (key can be '11 or lower', '12-16', '17+', 'crit', etc.)
           */
          [k: string]: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Description of what the effect does
           */
          effect: string;
        }
    )[]
  ];
}
export interface DrawSteelAbility {
  /**
   * The title or description of the ability
   */
  name: string;
  /**
   * Ability type (e.g., "Action", "Maneuver", "Triggered Action", "Villain Action 1")
   */
  type: string;
  /**
   * Cost to use the ability (e.g., "5 Essence", "Signature", "2 Malice")
   */
  cost?: string;
  /**
   * Keywords associated with the ability (e.g., ["Magic","Earth","Melee"])
   */
  keywords?: string[];
  /**
   * Distance or area (e.g., "Ranged 5", "2 burst", "Melee 1")
   */
  distance?: string;
  /**
   * Who or what is targeted (e.g., "All enemies", "One creature", "Self")
   */
  target?: string;
  /**
   * Trigger condition for triggered actions
   */
  trigger?: string;
  /**
   * List of effects (flexible formats)
   */
  effects: [
    (
      | {
          /**
           * Power Roll expression (e.g., "2d10 + 3")
           */
          roll: string;
          /**
           * Tier result (key can be '11 or lower', '12-16', '17+', 'crit', etc.)
           */
          [k: string]: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Description of what the effect does
           */
          effect: string;
        }
    ),
    ...(
      | {
          /**
           * Power Roll expression (e.g., "2d10 + 3")
           */
          roll: string;
          /**
           * Tier result (key can be '11 or lower', '12-16', '17+', 'crit', etc.)
           */
          [k: string]: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Name of the effect
           */
          name: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Cost to trigger this effect
           */
          cost: string;
          /**
           * Description of what the effect does
           */
          effect: string;
        }
      | {
          /**
           * Description of what the effect does
           */
          effect: string;
        }
    )[]
  ];
  /**
   * Flavor text of the ability
   */
  flavor?: string;
  /**
   * Metadata for the ability, to be converted to frontmatter in markdown. This field contains key-value pairs that will be rendered as YAML frontmatter.
   */
  metadata?: {
    [k: string]: unknown;
  };
}
