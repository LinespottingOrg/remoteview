export type Exclusion = {
  id: string;
  label: string;
  rule: string;
  why: string;
};

/** Hard lines for this course. The rule is the exclusion. The why is the reason it stays. */
export const exclusions: Exclusion[] = [
  {
    id: "people",
    label: "People",
    rule: "Do not view a person.",
    why: "Not a partner, a stranger, an illness, or a missing person. They did not agree to be a target. A wrong description can still be believed, and a believed false positive is worse than a blank page. Nothing in the declassified record qualifies a student to intervene in someone’s life. The lab pool is places and objects only.",
  },
  {
    id: "medicine",
    label: "Medicine",
    rule: "Do not offer this as medicine.",
    why: "A sensation is not a diagnosis, and a sketch is not a treatment. The 1995 evaluation never treated remote viewing as a clinical instrument. A false alarm and a missed illness are both harm. If you are ill, see a clinician. This course will not tell you to skip one.",
  },
  {
    id: "law",
    label: "Law",
    rule: "Do not offer a session as legal evidence.",
    why: "A training score is not a fact a court can use. The American Institutes for Research reviewed operational reports and found them broad, inconsistent, and unused to guide intelligence operations. A page from this lab cannot accuse, locate, or exonerate anyone.",
  },
  {
    id: "money",
    label: "Money",
    rule: "Do not spend, bet, or decide because of a session.",
    why: "Associative remote viewing — tying a future outcome to a picture — is not taught here as a decision tool. It stacks every known bug of the method onto a prediction. Wanting a result is the most reliable source of analytical overlay. Practice stays on paper, with outcomes you do not bet.",
  },
  {
    id: "authority",
    label: "Borrowed authority",
    rule: "Do not wear the program’s stamps.",
    why: "You are not in a classified program. The markings on the old documents belong to history. Finishing these lectures confers no rank, clearance, or professional title. Your authority is the page, the blind, and the score — including a score of zero.",
  },
];
