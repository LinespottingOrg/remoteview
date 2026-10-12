export type TimelineItem = { year: string; title: string; body: string };

export const timeline: TimelineItem[] = [
  {
    year: "1972",
    title: "SRI, with a CIA sponsor",
    body: "Harold Puthoff, at Stanford Research Institute in Menlo Park, begins a program the CIA later acknowledged it had initiated, to see whether remote viewing might have any intelligence use. Ingo Swann, a New York artist, becomes the early subject and, later, the author of the staged method.",
  },
  {
    year: "1973–74",
    title: "Outbound experiments, then Nature",
    body: "Russell Targ joins. The public protocol is the beacon, or outbound, trial: a site drawn from a pool, a person sent there, a viewer sketching in the lab, judges matching transcripts to places. In 1974 Targ and Puthoff publish “Information Transmission Under Conditions of Sensory Shielding” in Nature.",
  },
  {
    year: "Late 1970s",
    title: "The cueing critique, and Fort Meade",
    body: "David Marks and Richard Kammann argue that unedited transcripts from the early SRI work contained ordinary cues — session order, stray remarks — that could let a judge match them without an anomaly. Later protocols tighten blindness. On the operational side, Army efforts remembered as Gondola Wish and Grill Flame stand up at Fort Meade. The 1995 review describes the early CIA sponsorship as ending in the late 1970s.",
  },
  {
    year: "1980s",
    title: "Center Lane, Sun Streak, a teachable stage chart",
    body: "The unit's names follow the bureaucracy: Center Lane under INSCOM, then Sun Streak as the work moves toward the Defense Intelligence Agency. Swann's coordinate method — six stages, from ideogram to model — is trained into military viewers. From 1985 Edwin May directs the scientific contract, at SRI and later at SAIC. In 1988 the National Research Council's Enhancing Human Performance finds little to support operational claims.",
  },
  {
    year: "Early 1990s",
    title: "The program is called Star Gate",
    body: "DIA's effort, by then named Star Gate, carries three aims the AIR review later lists: operations, laboratory research, and assessment of foreign work. Research continues under contract at SAIC.",
  },
  {
    year: "1995",
    title: "Evaluate, then stop",
    body: "The operational program is suspended in the spring. In June the CIA's Office of Research and Development contracts the American Institutes for Research. Mumford, Rose, and Goslin deliver the evaluation on 29 September. The program is terminated. Declassification follows, and the STARGATE collection is now in the CIA reading room.",
  },
];

export type Study = {
  title: string;
  year: string;
  claim: string;
  limit: string;
};

export const studies: Study[] = [
  {
    title: "Nature: sensory shielding",
    year: "Targ & Puthoff, 1974",
    claim:
      "Reported that viewers could describe distant sites under conditions the authors presented as sensorially shielded. This is the paper that made the SRI work a public scientific argument.",
    limit:
      "Marks and Kammann later showed how cues inside transcripts could support matching. Quote this paper only with that critique beside it. Later government work tried to remove those leaks. It does not inherit the 1974 paper's innocence.",
  },
  {
    title: "NRC: Enhancing Human Performance",
    year: "National Research Council, 1988",
    claim:
      "Asked, broadly, whether exotic training methods improved human performance for military use.",
    limit:
      "The committee found little support for remote viewing as a performance technology. This is the skeptical official review before the 1995 split, not a footnote to it.",
  },
  {
    title: "AIR evaluation of Star Gate",
    year: "Mumford, Rose & Goslin, 29 Sep 1995",
    claim:
      "A statistically significant laboratory effect: hits more often than chance, in the studies they reviewed.",
    limit:
      "The same report says the cause was not identified; viewers, judges, and photo pools were reused; lab conditions do not transfer to intelligence questions; reports failed on specifics; and in no case they reviewed had remote viewing been used to guide operations. Continued operational use was not warranted.",
  },
  {
    title: "Utts: evidence for psychic functioning",
    year: "Jessica Utts, 1995",
    claim:
      "Using the standards applied to any other area of science, she concluded psychic functioning had been well established. Effects sat between a small and a medium size — replicable in a proper long-run experiment, not performable on command. She reported that distance and electromagnetic shielding had not abolished the effect in the studies she reviewed, and that selected viewers outperformed unselected volunteers.",
    limit:
      "Her conclusion is stronger than the AIR panel's, and stronger than Hyman's. She is a statistician evaluating the same body of work, not a second experiment. The SAIC set she was given included clear misses as well as strong hits.",
  },
  {
    title: "Hyman: anomalous mental phenomena",
    year: "Ray Hyman, 1995",
    claim:
      "The better SAIC experiments are a statistical anomaly. They are not a run of luck, and the obvious early flaws do not explain them.",
    limit:
      "An anomaly shows that something other than chance is operating. It does not name that something. Hyman's bar, before anyone says paranormal: close cueing, analysis choices, and the fact that so much of the literature comes from a few laboratories. His prescribed attitude is continued caution.",
  },
];

export const saicRows: { name: string; trials: string; effect: string; p: string }[] = [
  { name: "Target dependencies", trials: "200", effect: "0.124 ± 0.071", p: "0.040" },
  { name: "AC with binary coding", trials: "40", effect: "−0.067 ± 0.158", p: "0.664" },
  { name: "AC lucid dreams, base", trials: "24", effect: "0.088 ± 0.204", p: "0.333" },
  { name: "AC lucid dreams, pilot", trials: "21", effect: "0.368 ± 0.218", p: "0.046" },
  { name: "ERD AC behavior", trials: "70", effect: "0.303 ± 0.120", p: "0.006" },
  { name: "Entropy II", trials: "90", effect: "0.550 ± 0.105", p: "9.1 × 10⁻⁸" },
];

export type Person = { name: string; role: string; note: string };

export const people: Person[] = [
  {
    name: "Ingo Swann",
    role: "Artist, SRI consultant",
    note: "Turned impressions into the six-stage coordinate method. The ideogram, the small gestalt vocabulary, and the war on analytical overlay are his training architecture.",
  },
  {
    name: "Harold Puthoff",
    role: "Physicist, SRI",
    note: "Principal investigator at the start. Later wrote the public account of CIA-initiated remote viewing at SRI, after the 1995 release.",
  },
  {
    name: "Russell Targ",
    role: "Physicist, SRI",
    note: "Co-author of the 1974 Nature paper and of the outbound protocol's public life. A laser physicist, not a mystic by training — which is why the argument stayed inside experimental physics as long as it did.",
  },
  {
    name: "Pat Price",
    role: "Early SRI viewer",
    note: "One of the first high-profile viewers in the outbound work. Died in 1975. Treat dramatic operational anecdotes about him as anecdotes until you have the document.",
  },
  {
    name: "Hella Hammid",
    role: "Photographer, early viewer",
    note: "Often cited because she was not a self-described psychic and still produced matches in the SRI trials. The training claim — that this is not only a gift — leans on subjects like her.",
  },
  {
    name: "Joseph McMoneagle",
    role: "Army viewer",
    note: "Public face of the Fort Meade viewers, associated with extended remote viewing: longer, quieter, more narrative than staged CRV. Author of firsthand accounts. Not a substitute for the evaluation.",
  },
  {
    name: "Edwin C. May",
    role: "Physicist, program scientist",
    note: "Directed the SRI and then SAIC research from the mid-1980s. The SAIC figures in Utts's review were supplied from his side of the house.",
  },
  {
    name: "Paul H. Smith",
    role: "Army officer, CRV trainer",
    note: "Taught the staged method inside the program and later wrote the unit's history from the trainer's side. A founder of the civilian International Remote Viewing Association.",
  },
  {
    name: "Lyn Buchanan",
    role: "Army, CRV trainer",
    note: "Another of the military trainers who carried the staged method into civilian teaching after 1995. Useful on procedure. Not an independent replication.",
  },
  {
    name: "Jessica Utts",
    role: "Statistician",
    note: "Professor at UC Davis, later a president of the American Statistical Association. Wrote the strongest scientific yes in the 1995 review.",
  },
  {
    name: "Ray Hyman",
    role: "Psychologist, critic",
    note: "University of Oregon. Wrote the strongest careful no: anomaly yes, paranormal demonstration no. Skipping him is how the legend gets written.",
  },
];

export type Gloss = { term: string; def: string };

export const glossary: Gloss[] = [
  {
    term: "Signal line",
    def: "The impression that seems to arrive in the body before it becomes a sentence. A training metaphor, not a measured channel.",
  },
  {
    term: "Ideogram",
    def: "A spontaneous pen mark at the cue. Swann called it a reflexive graphic of the major gestalt, passed through the hand. It is a gesture, not a picture.",
  },
  {
    term: "A and B",
    def: "A is the feeling of the mark: wavy, hard, rising. B is the primitive decode: land, water, structure, and the rest of that small list.",
  },
  {
    term: "AOL",
    def: "Analytical overlay. The mind completing a pattern and handing you a noun. Declare it, write it, and do not build on it.",
  },
  {
    term: "AOL drive",
    def: "Nouns arriving in a chain. Stop the session. Feedback cannot score a page the imagination has taken over.",
  },
  {
    term: "Aesthetic impact",
    def: "A wave of liking, dread, awe, or dullness larger than the data. Log it as your reaction. It does not name the site's purpose.",
  },
  {
    term: "Objectify",
    def: "Get the impression onto the page in the order it came, almost unedited. Memory is where overlay gets time to dress.",
  },
  {
    term: "Monitor",
    def: "The person who reads the cue and watches for drive. A monitor does not hint. In solo training you have to refuse that job to yourself.",
  },
  {
    term: "Feedback",
    def: "The target, shown after the page is closed. This is the teacher. Early feedback is contamination.",
  },
  {
    term: "Outbound / beacon",
    def: "A person visits a randomly chosen site. The viewer, isolated, describes it. Judges match.",
  },
  {
    term: "Coordinate / controlled remote viewing",
    def: "Swann's six-stage method. Originally cued with latitude and longitude — a leak, once viewers knew maps — later with abstract references.",
  },
  {
    term: "Extended remote viewing",
    def: "A longer, quieter, more narrative session. Associated with McMoneagle and the Fort Meade practice, as distinct from staged CRV.",
  },
  {
    term: "Associative remote viewing",
    def: "A future event is tied to one of several pictures; the viewer describes a picture; the description is read back as a prediction. Easy to fool yourself with. Not a decision tool in this course.",
  },
  {
    term: "Displacement",
    def: "A clean description of the wrong target, often another item in the pool. Not a hit on the target you were given.",
  },
  {
    term: "Frontloading",
    def: "Telling the viewer — or yourself — what kind of thing the target is, “so you can focus.” In training, that is a leak.",
  },
  {
    term: "Peacocking",
    def: "Adding drama so the session feels worthy of the method.",
  },
  {
    term: "Rank-order judging",
    def: "A blind judge ranks a set of targets against one transcript, or the reverse. For five choices, chance is an average rank of 3.",
  },
  {
    term: "Effect size",
    def: "Utts's five-choice formula: (3 − average rank) / √2. About 0.2 is small (rank near 2.72). About 0.5 is medium (rank near 2.29).",
  },
];

export type Source = { title: string; detail: string; href?: string };

export const sources: Source[] = [
  {
    title: "CIA reading room, STARGATE collection",
    detail: "The declassified program archive: sessions, training notes, memoranda, and the reviews.",
    href: "https://www.cia.gov/readingroom/collection/stargate",
  },
  {
    title: "Targ & Puthoff, Nature 251, 602–607 (1974)",
    detail: "Information Transmission Under Conditions of Sensory Shielding. Read it with the Marks and Kammann critique.",
    href: "https://doi.org/10.1038/251602a0",
  },
  {
    title: "Mumford, Rose & Goslin, AIR, 29 September 1995",
    detail:
      "An Evaluation of Remote Viewing: Research and Applications. The executive split: laboratory significance, no operational warrant. In the STARGATE collection.",
  },
  {
    title: "Jessica Utts, “An Assessment of the Evidence for Psychic Functioning”",
    detail:
      "Written for the AIR panel and published in the Journal of Parapsychology, volume 59, 1995. The strongest scientific yes.",
  },
  {
    title: "Ray Hyman, “Evaluation of the Program on Anomalous Mental Phenomena”",
    detail: "Journal of Parapsychology, volume 59, 1995. The anomaly is granted. The paranormal conclusion is not.",
  },
  {
    title: "National Research Council, Enhancing Human Performance (1988)",
    detail: "The earlier official review. Little support for remote viewing as a way to enhance performance.",
  },
  {
    title: "Harold Puthoff, CIA-initiated remote viewing at SRI",
    detail:
      "His account of the sponsorship and the early experiments, published after declassification in the Journal of Scientific Exploration.",
  },
  {
    title: "Marks & Kammann, The Psychology of the Psychic (1980)",
    detail: "The cueing critique of the early SRI transcripts. Required before you cite 1974.",
  },
  {
    title: "International Remote Viewing Association",
    detail: "A civilian forum founded by people who practiced or taught the method. Not a government body, and not a journal of record.",
    href: "https://www.irva.org/",
  },
];
