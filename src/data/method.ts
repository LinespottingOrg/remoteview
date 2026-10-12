export type Stage = {
  id: string;
  name: string;
  aim: string;
  write: string;
  avoid: string;
  example: string;
};

export const stages: Stage[] = [
  {
    id: "I",
    name: "Major gestalt",
    aim: "A reflexive mark, then its feeling, then one primitive component. The declassified notes treat this as the foundation of the signal line, not as a doodle.",
    write: "The ideogram itself. A: wavy, hard, rising, flat, soft, angular, fluid. B: only from a small set — land, water, structure, mountain, motion, wet land, or interface.",
    avoid: "City names, building types, news stories. If a noun arrives with a rush, it is analytical overlay. Box it.",
    example: "Mark. A: rising, hard. B: structure. Second mark. A: flat, fluid. B: water. Interface.",
  },
  {
    id: "II",
    name: "Sensory contact",
    aim: "Adjectives from the site: temperature, texture, sound, smell, taste, light, density, wet or dry, natural or made.",
    write: "Short sensory lines. Log aesthetic impact — awe, dread, dullness — as your reaction, not as the site's purpose.",
    avoid: "Nouns wearing a description's clothes. “Parking garage” is a conclusion. “Gritty, cool, a low echo, dim” is stage two.",
    example: "Cold. Metallic. A repeating low sound. Bright above, dull below.",
  },
  {
    id: "III",
    name: "Dimension, motion, sketch",
    aim: "How masses sit, and the first honest drawing. Rises, spans, encloses, repeats. Movement: slow, radial, linear, contained.",
    write: "A sketch of relationships. Words like up, flat, beside, inside, repeating — only if you actually perceived them.",
    avoid: "Shading theater and labels copied from memory. If you start illustrating an overlay, box it and return to the line that was there.",
    example: "A vertical mass at the edge of a flat. The flat moves. The mass does not.",
  },
  {
    id: "IV",
    name: "Qualities and quantities",
    aim: "Countable and qualitative aspects, held in columns so a story cannot run away with the page.",
    write: "Senses continued, dimension, aesthetic impact, tangibles, intangibles. Overlay goes in its own column, including a phrase that arrived with the signal and still must not lead.",
    avoid: "Letting “shipyard” rewrite the three masses you already recorded. Move across the matrix, not down into a plot.",
    example: "Three hard masses. Repeating sound. Intangible: keeping something running. AOL: shipyard.",
  },
  {
    id: "V",
    name: "Interrogate the signal",
    aim: "Narrow questions put to the line. Specifics, taken even when the answer is poor.",
    write: "What the motion is doing. What is above the hard flat. What happens at the interface.",
    avoid: "Questions that are votes. “Is this a military base?” is not interrogation.",
    example: "At the interface: hard against wet. Above the vertical: open, bright. No further noun.",
  },
  {
    id: "VI",
    name: "Model the contact",
    aim: "Three-dimensional relationships. In the original training this was clay or a built sketch, so the body had to commit to where pieces sit.",
    write: "Whether the tall thing is inside the flat thing or beside it. Layout, not beauty.",
    avoid: "A handsome illustration of your favorite overlay. Relationships are the test because labels are easy to invent.",
    example: "The tall piece is beside the flat, on its edge, not floating in the middle of it.",
  },
];

export type Drill = {
  id: string;
  line: string;
  action: "data" | "aol" | "stop";
  why: string;
};

export const drills: Drill[] = [
  {
    id: "a",
    line: "Wavy. Rising. Soft.",
    action: "data",
    why: "This is component A: the feeling of the ideogram. Keep it. Do not translate it into a place.",
  },
  {
    id: "b",
    line: "Cold, metallic, a low repeating hum.",
    action: "data",
    why: "Stage two. Adjectives and a sound, with no noun attached. Write it and move across, not into a story.",
  },
  {
    id: "c",
    line: "The harbor at Kalmar, by the castle.",
    action: "aol",
    why: "A proper noun with a rush of certainty. Box it as analytical overlay. Do not sketch the castle to “confirm” it.",
  },
  {
    id: "d",
    line: "A hard vertical mass at the edge of a flat.",
    action: "data",
    why: "A stage-three relationship. Masses and where they sit. This is allowed to lead the sketch.",
  },
  {
    id: "e",
    line: "Shipyard.",
    action: "aol",
    why: "One noun that names the whole site. It might later turn out to be adjacent to the truth. It still does not get to edit the masses.",
  },
  {
    id: "f",
    line: "I like this. It feels holy, important, meant for me.",
    action: "aol",
    why: "Aesthetic impact is real enough to log — as your reaction. It is not a gestalt and it is not a purpose. Box it so it cannot choose the target.",
  },
  {
    id: "g",
    line: "Secret base. Guards, a fence, a flag, missiles, I can see the gate.",
    action: "stop",
    why: "Nouns arriving in a chain are AOL drive. Stop. A session pushed through drive cannot be scored, because feedback can no longer separate data from story.",
  },
];

export const vocab = ["land", "water", "structure", "mountain", "motion", "wet land", "interface"];
