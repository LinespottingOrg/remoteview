export type Target = {
  id: string;
  title: string;
  image: string;
  gestalt: string;
  sensory: string;
  relation: string;
  model: string;
};

export const targets: Target[] = [
  {
    id: "lighthouse",
    title: "Lighthouse on black rock",
    image: "/media/targets/lighthouse.jpg",
    gestalt: "Structure meeting water. One vertical hard mass.",
    sensory: "Wet, cold, gritty, wind. A bright point against a darker field.",
    relation: "The vertical mass stands on a dark base at the edge of the water, not inland.",
    model:
      "Interface of structure and water. One hard vertical on a jagged darker base. Wet, cold, gritty. The mass is at the edge of a flat, moving water.",
  },
  {
    id: "mesa",
    title: "Desert mesa and a rail line",
    image: "/media/targets/mesa.jpg",
    gestalt: "Land. A rise. A hard linear track.",
    sensory: "Dry, hot, hard, bright. Little softness. Open air.",
    relation: "A flat-to-rising landmass, with one straight line running away across it.",
    model:
      "Dry land and a rise. Hard, hot, bright. One linear man-made track crossing the flat toward the horizon. Almost no water.",
  },
  {
    id: "cranes",
    title: "Harbor cranes",
    image: "/media/targets/cranes.jpg",
    gestalt: "Structure at water. Repeating verticals.",
    sensory: "Hard, metallic, cool, large. Dark water. Artificial light possible.",
    relation: "Several tall hard masses stand in a row along the edge of water.",
    model:
      "Interface of structure and water. Repeating tall metal verticals along a hard edge. Cool, industrial, not domestic. The masses repeat more than they enclose.",
  },
  {
    id: "bridge",
    title: "Bridge in fog",
    image: "/media/targets/bridge.jpg",
    gestalt: "Structure spanning water.",
    sensory: "Cool, damp, muted light, hard linear elements. Soft air.",
    relation: "A long hard span crosses above a flat, with the far end dissolving.",
    model:
      "Structure over water, not a mass sitting in it. Long, linear, suspended. Cool and damp. The span continues farther than the eye wants to finish.",
  },
  {
    id: "black-sand",
    title: "Black sand shore",
    image: "/media/targets/black-sand.jpg",
    gestalt: "Land meeting water. A dark rise at one side.",
    sensory: "Wet, dark, cool, gritty. Pale movement against a black field.",
    relation: "A dark flat meets moving water. A taller dark mass sits to one side, not in the center.",
    model:
      "Interface of land and water. The land is unusually dark. Wet, cool, gritty. A cliff or rise occupies one flank. No large structure is required.",
  },
  {
    id: "glass",
    title: "Glass houses on farmland",
    image: "/media/targets/glass.jpg",
    gestalt: "Low structure on flat land. Repeating.",
    sensory: "Humid, bright, translucent, regular. More shelter than fortress.",
    relation: "Long low masses repeat across a flat, side by side, none of them tall.",
    model:
      "Flat land carrying repeating low structures. Light passes through more than it bounces off. Humid, regular, horizontal. Not a single monument.",
  },
  {
    id: "refinery",
    title: "Refinery at night",
    image: "/media/targets/refinery.jpg",
    gestalt: "Complex structure. Many verticals. Lights.",
    sensory: "Hard, dense, warm points of light, a low hum if you will risk a sound. Industrial, not natural.",
    relation: "A crowded cluster of towers and pipes, taller pieces rising out of a lower tangle.",
    model:
      "A dense man-made complex. Multiple verticals, pipes, and lights, not one clean mass. Hard, energetic, night-bright. Purpose is processing, but do not name the plant.",
  },
  {
    id: "dock",
    title: "Mountain lake and a small dock",
    image: "/media/targets/dock.jpg",
    gestalt: "Water, land, and a mountain rise. A small structure.",
    sensory: "Calm, cool, natural, wooden if you contact the small mass. Still, rather than crashing.",
    relation: "A small linear structure lies on the near water. Land and a high rise sit behind it.",
    model:
      "Mostly natural. Still water in front of a rise. One small hard or wooden line projects into the water. Quiet. Do not promote the dock into a harbor.",
  },
];

export function pickTarget(recentIds: string[]): Target {
  const fresh = targets.filter((item) => !recentIds.includes(item.id));
  const pool = fresh.length > 0 ? fresh : targets;
  return pool[Math.floor(Math.random() * pool.length)]!;
}
