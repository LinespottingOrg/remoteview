export type FaqItem = {
  id: string;
  q: string;
  a: string[];
};

export const faq: FaqItem[] = [
  {
    id: "built",
    q: "Is the academy built?",
    a: [
      "Yes. Eight spoken lectures, each with a transcript, a short film, and two questions. The six stages and an overlay drill. A blind lab with ideogram and sketch pads. A journal that keeps a zero. The record: timeline, the studies, the SAIC table, people, glossary, and sources. The exclusions, with the reasons.",
      "What was added after that is this FAQ, and the pass: one free week, then 4 USD a month, 35 USD a year, or 99 USD lifetime.",
    ],
  },
  {
    id: "sources",
    q: "Which sources is the course actually standing on?",
    a: [
      "The CIA STARGATE collection, which holds the declassified sessions, training notes, and the 1995 reviews. Targ and Puthoff, “Information Transmission Under Conditions of Sensory Shielding,” Nature 251, 602–607 (1974), DOI 10.1038/251602a0 — read only beside Marks and Kammann. Mumford, Rose and Goslin, An Evaluation of Remote Viewing: Research and Applications, American Institutes for Research, 29 September 1995.",
      "Jessica Utts, “An Assessment of the Evidence for Psychic Functioning,” and Ray Hyman, “Evaluation of the Program on Anomalous Mental Phenomena,” both written for that panel and published in the Journal of Parapsychology, volume 59, 1995. The National Research Council’s Enhancing Human Performance (1988). Harold Puthoff’s later account of the CIA-sponsored SRI work, in the Journal of Scientific Exploration. Swann’s 30 August 1983 draft, Coordinate Remote Viewing (CRV) Technology, 1981–1983, document CIA-RDP96-00788R001800100001-2, inside the STARGATE collection.",
      "The record page lists these with the limits attached. This FAQ does not replace that page.",
    ],
  },
  {
    id: "patent",
    q: "Was the method patented?",
    a: [
      "No United States patent grants the six-stage coordinate remote viewing protocol. The declassified task note says specific elements of the procedure are proprietary to Ingo Swann, who developed it (CIA-RDP96-00792R000100140010-1, in the STARGATE collection). The training manual that circulated later opens with a proprietary legend: Swann, an SRI International subcontractor, retains exclusive ownership of that information.",
      "Swann later told a publisher he did not write that manual. Paul H. Smith has said he wrote it while assigned to the unit, to preserve the method. A proprietary legend, a work-for-hire claim, and a patent are three different things. Only the last is a grant from the patent office, and there isn’t one for the stages.",
      "This academy does not reproduce the manual. The lectures are original. The stage chart is a reconstruction from the declassified summaries and the public record.",
    ],
  },
  {
    id: "collisions",
    q: "Which patents say “remote viewing” and are not this?",
    a: [
      "The words collide with ordinary engineering. US 7,609,952 and its continuation US 7,928,842, Scott Jezierski, “Apparatus and method for remote viewing system,” are a camera for looking at a mailbox. US 8,555,406, AT&T, “Remote viewing of multimedia content,” is sending video to another screen. US 3,205,303 (1965) is a remotely controlled television pickup.",
      "US 2006/0072226 A1, “Remote viewing amplifier,” John St. Clair, filed 2 October 2004, is an abandoned application, not a granted patent. It describes a wooden frame and plastic panels. It is not the SRI protocol, and it was never issued.",
      "None of these is a patent on the Star Gate method. Cite them only to keep them out of the argument.",
    ],
  },
  {
    id: "puthoff",
    q: "What did Puthoff actually patent?",
    a: [
      "US 5,845,220 A, Harold E. Puthoff, assigned to EarthTech International. Filed 23 August 1993, granted 1 December 1998. Title: “Communication method and apparatus with signals comprising scalar and vector potentials without electromagnetic fields.” It is a communications claim. It is not a patent on remote viewing.",
      "US 11,777,198 B1, Harold E. Puthoff and Christopher A. Eusebi, Quantcomm LLC. Filed 27 April 2021, granted 3 October 2023. Title: “Communications system.” Same subject: signaling with potentials, without electromagnetic fields. Not a patent on the viewing protocol, and not evidence that the 1970s experiments were patented.",
    ],
  },
  {
    id: "pass",
    q: "What does the pass cost, and what stays open?",
    a: [
      "One week free, counted from the first time this device opens the academy. Then 4 USD a month, 35 USD a year, or 99 USD lifetime. Those are the in-app prices. Confirming records the pass on this device; this build does not charge a card.",
      "After the week, lecture 01, the record, this FAQ, and the exclusions stay open. Lectures 02 through 08, the method drill, and a new lab session need the pass. A journal you already scored stays readable.",
    ],
  },
];

export const patentLinks: { id: string; label: string; href: string; note: string }[] = [
  {
    id: "us5845220",
    label: "US 5,845,220 A",
    href: "https://patents.google.com/patent/US5845220A/en",
    note: "Puthoff, 1998. Potentials as a communications signal. Not remote viewing.",
  },
  {
    id: "us11777198",
    label: "US 11,777,198 B1",
    href: "https://patents.google.com/patent/US11777198B1/en",
    note: "Puthoff and Eusebi, 2023. A communications system. Not remote viewing.",
  },
  {
    id: "us7609952",
    label: "US 7,609,952 B2",
    href: "https://patents.google.com/patent/US7609952B2/en",
    note: "Jezierski. A remote camera. Title only.",
  },
  {
    id: "us8555406",
    label: "US 8,555,406 B2",
    href: "https://patents.google.com/patent/US8555406B2/en",
    note: "AT&T. Multimedia on another screen. Title only.",
  },
  {
    id: "us20060072226",
    label: "US 2006/0072226 A1",
    href: "https://patents.google.com/patent/US20060072226A1/en",
    note: "St. Clair. Abandoned application. Not a grant, and not the SRI method.",
  },
  {
    id: "stargate",
    label: "CIA STARGATE collection",
    href: "https://www.cia.gov/readingroom/collection/stargate",
    note: "The declassified archive, including the proprietary-claim memos and the 1983 CRV draft.",
  },
  {
    id: "nature",
    label: "Nature, 1974",
    href: "https://doi.org/10.1038/251602a0",
    note: "Targ and Puthoff. Cite with the Marks and Kammann critique beside it.",
  },
];
