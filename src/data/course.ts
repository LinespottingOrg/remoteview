export type QuizQ = {
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
};

export type Lesson = {
  id: string;
  numeral: string;
  title: string;
  minutes: string;
  film: string;
  audio: string;
  summary: string;
  points: string[];
  body: string;
  quiz: QuizQ[];
};

export const lessons: Lesson[] = [
  {
    id: "claim",
    numeral: "01",
    title: "What it is, and what it is not",
    minutes: "2 min",
    film: "/media/video/01-claim.mp4",
    audio: "/media/audio/01-claim.mp3",
    summary:
      "A claim, a method, and a split research record. The session is a description, feedback is the teacher, and the 1995 verdict does not fit on a slogan.",
    points: [
      "Describe. Do not name the site.",
      "The target is chosen first and shown last.",
      "Utts and Hyman read the same laboratory anomaly differently. The operational record was judged not useful.",
    ],
    body: `Remote viewing is a name for a specific claim, and for a specific working method built around that claim.

The claim is this. A person can describe a place, an object, or an event that is hidden from ordinary senses. No eyes on it. No briefing. No trail of hints. And do so often enough that the match is hard to write off as luck.

The method is the part you can actually practice. It was formalized in the nineteen seventies and eighties, first in laboratory work at Stanford Research Institute, and later as a staged training protocol called coordinate remote viewing, also called controlled remote viewing. The United States intelligence community ran related efforts under a series of code names. By the early nineteen nineties the Defense Intelligence Agency called the program Star Gate. In nineteen ninety-five the program was evaluated, ended, and a large part of the paper record was declassified.

This course teaches that method, and it teaches the record beside it. It does not treat remote viewing as a party trick, a religion, or a settled law of physics.

Three distinctions matter on day one.

First. A session is a description, not a conclusion. You write textures, temperatures, shapes, motions, and crude layouts. You do not announce the name of the place. Naming is where the ordinary mind takes over, and the ordinary mind is usually wrong.

Second. Feedback is the teacher. In training, the target is chosen before you start, sealed from you, and shown only after you have finished. Without that order, you cannot tell a real correspondence from a story you liked.

Third. The research is split, and you should know both sides before you pick up a pen. Statistician Jessica Utts, asked to review the government studies, concluded that an anomalous effect had been established by the standards of ordinary science, at a small-to-medium size. Psychologist Ray Hyman agreed that some of the better experiments were not easy to dismiss as chance, and still refused to call that proof of a paranormal ability. The official evaluation found a laboratory statistical effect, and found no evidence that remote viewing had produced actionable intelligence.

You are here to learn the discipline those arguments are about. How a session is structured. How to catch imagination when it impersonates data. And how to score yourself without flattering the result.

The next lesson is the history, told short, and sourced.`,
    quiz: [
      {
        prompt: "What should a training session produce first?",
        choices: [
          "The proper name of the site",
          "A description: textures, shapes, layout",
          "A decision you can spend money on",
        ],
        answer: 1,
        why: "Naming is the ordinary mind finishing the pattern. The page stays a description until feedback.",
      },
      {
        prompt: "When is the target shown?",
        choices: [
          "Before, so you can focus",
          "Whenever the sketch starts to feel right",
          "Only after the session is closed",
        ],
        answer: 2,
        why: "Feedback teaches. An early look ends the session as evidence.",
      },
    ],
  },
  {
    id: "history",
    numeral: "02",
    title: "From SRI to Star Gate",
    minutes: "3 min",
    film: "/media/video/02-history.mp4",
    audio: "/media/audio/02-history.mp3",
    summary:
      "Puthoff, Swann, and Targ at SRI; the outbound experiments; the contested 1974 Nature paper; Fort Meade; and the six-stage method.",
    points: [
      "CIA sponsorship of the SRI work began in 1972.",
      "The Nature paper matters, and so does the cueing critique of its transcripts.",
      "Coordinate remote viewing was built to be staged and taught, not to crown a single talent.",
    ],
    body: `In nineteen seventy-two, physicist Harold Puthoff, then at Stanford Research Institute in Menlo Park, began a research program the CIA later acknowledged it had sponsored. The New York artist Ingo Swann wrote to Puthoff, became an early experimental subject, and then the person who turned scattered impressions into a teachable procedure.

Russell Targ, also a physicist, joined the work. The early protocol that made the lab's public reputation was the outbound, or beacon, experiment. A target site was chosen at random from a pool. A person went there. A viewer, isolated in the laboratory, described and sketched the site. Later, judges tried to match descriptions to places.

In nineteen seventy-four, Targ and Puthoff published a paper in the journal Nature: Information Transmission Under Conditions of Sensory Shielding. That paper is historically important, and scientifically contested. Critics, notably David Marks and Richard Kammann, argued that unedited transcripts contained ordinary cues. The order of sessions. Leftover remarks. Cues that could help a judge match them without any anomaly at all. Later work tried to close those doors. Double-blind assignment. Target pools the viewer could not memorize. Judging that never saw the order of the sessions.

The intelligence side developed in parallel. After the early CIA sponsorship, which the nineteen ninety-five review describes as running into the late nineteen seventies, Army intelligence stood up efforts remembered as Gondola Wish and then Grill Flame, at Fort Meade. The unit's names changed as the bureaucracy did. Center Lane, under the Army's intelligence and security command. Sun Streak, as the effort moved toward the Defense Intelligence Agency. And Star Gate, the DIA's name in the early nineteen nineties. Research contracts sat at SRI, and later at Science Applications International Corporation, where physicist Edwin May directed the scientific side from the mid-nineteen eighties.

Inside that world, two styles of viewing mattered. Extended remote viewing was a longer, quieter, more narrative session, associated with viewers such as Joseph McMoneagle. Coordinate remote viewing was Swann's answer to a different problem. Not, can one gifted person do this. But, can the contact be staged, written down, and taught. He spent hundreds of training trials building six stages, from a reflexive pen mark called an ideogram, up to a modeled layout of the site.

In the spring of nineteen ninety-five the operational program was suspended. That summer the CIA asked the American Institutes for Research to evaluate it. The report is dated the twenty-ninth of September, nineteen ninety-five. The program was then terminated, and the archive began to open.

What the evaluators actually wrote is the next lesson. It is more interesting than the legend.`,
    quiz: [
      {
        prompt: "Why is the 1974 Nature paper contested?",
        choices: [
          "The journal never published it",
          "Critics argued the transcripts contained ordinary cues a judge could use",
          "It only described dreams, not remote viewing",
        ],
        answer: 1,
        why: "Marks and Kammann's cueing critique is why later protocols went double-blind and stripped session order out of the judging packet.",
      },
      {
        prompt: "What problem was coordinate remote viewing built to solve?",
        choices: [
          "How to make one gifted person famous",
          "Whether contact could be staged, written, and taught",
          "How to replace maps entirely",
        ],
        answer: 1,
        why: "Swann's six stages were a training answer, not a personality cult.",
      },
    ],
  },
  {
    id: "verdict",
    numeral: "03",
    title: "The 1995 split verdict",
    minutes: "4 min",
    film: "/media/video/03-verdict.mp4",
    audio: "/media/audio/03-verdict.mp3",
    summary:
      "Two voices. The AIR report, Jessica Utts, and Ray Hyman — a laboratory effect, an unidentified cause, and no operational warrant.",
    points: [
      "AIR: statistically significant in the lab; not shown to be useful for intelligence.",
      "Utts: established by ordinary scientific standards, small-to-medium effect.",
      "Hyman: a real statistical anomaly is not yet a demonstrated paranormal ability.",
    ],
    body: `Guide. The nineteen ninety-five evaluation is the document every serious student should be able to summarize without slogans.

Guide. Michael Mumford, Andrew Rose, and David Goslin of the American Institutes for Research delivered it on the twenty-ninth of September. They were asked two questions. Is there a scientific effect? And was it useful to intelligence? Those answers came out different.

Guide. On the laboratory work, the report said a statistically significant effect had been demonstrated. Correct matches turned up more often than chance. It also said the studies did not identify what produced the effect. Many of them reused the same viewers, the same judges, and pools of target photographs. The conditions that make a lab trial scoreable — a fixed pool, a blind judge, feedback after the session — are not the conditions of an intelligence question, where nobody knows the right answer on Friday.

Record. On operations, the report was blunt. The remote viewing reports it reviewed offered broad background and failed on specifics. They were inconsistent, often inaccurate, and they needed a large amount of subjective interpretation. The evaluators wrote that in no case had the information been used to guide intelligence operations. Remote viewing, they concluded, had failed to produce actionable intelligence. Their recommendation was that continued operational use was not warranted.

Guide. Jessica Utts, professor of statistics, reviewed the SRI and SAIC research for that panel and reached a stronger scientific conclusion. Using, she wrote, the standards applied to any other area of science, psychic functioning had been well established. The statistical results were far beyond what is expected by chance. She placed the magnitude between a small and a medium effect. Enough, in her view, to replicate in a properly run experiment with enough trials. Not enough to perform on command.

Guide. For a five-choice rank-order test, she noted that effect size is three minus the average rank, divided by the square root of two. Chance sits at an average rank of three. A small effect, about point two, is an average rank near two point seven. A medium effect, about point five, is an average rank near two point three.

Record. She also described ten SAIC experiments supplied to the panel. Of the remote-viewing studies, several were statistically significant, and some were not. One, called Entropy Two, ninety trials, was reported with an effect size around point five five, and a p-value of about nine times ten to the minus eight. A target-dependency study of two hundred trials was weaker: effect size about point one two, p about point zero four. A binary-coding study was a null. Utts treated that spread as what a small effect looks like across a real program. Not as a slogan, and not as a refutation.

Guide. Ray Hyman's report is the one students tend to skip, and should not. He granted that the better SAIC experiments were a statistical anomaly, not a run of luck, and that the obvious early flaws did not explain them. Then he drew the line he is known for.

Record. An effect that departs from chance shows that something other than chance is at work. It does not show what that something is. Before anyone calls it paranormal, ordinary explanations have to be closed. Subtle cues. Analysis choices. A literature concentrated in a few laboratories. His recommended attitude was continued caution, not a change in the laws of nature.

Guide. Hold both pages at once. A laboratory anomaly, small to medium, replicated often enough to persuade a careful statistician and not a careful skeptic. And an operational record the government's own reviewers judged not useful. The method you will practice was built inside that argument. It does not settle it.`,
    quiz: [
      {
        prompt: "What did the AIR panel separate?",
        choices: [
          "A useful intelligence tool, and a failed laboratory",
          "A laboratory statistical effect, and no demonstrated operational use",
          "Proof that the effect was fraud",
        ],
        answer: 1,
        why: "Significant in the lab, by their reading. Not actionable, and not used to guide operations in the material they reviewed.",
      },
      {
        prompt: "On a five-choice ranking, where does chance sit?",
        choices: ["Average rank 1", "Average rank 3", "Average rank 5"],
        answer: 1,
        why: "Ranks 1 through 5 average to 3. Effect size is (3 − average rank) / √2. Smaller average rank, larger effect.",
      },
    ],
  },
  {
    id: "signal",
    numeral: "04",
    title: "Signal line, overlay, and the order of a session",
    minutes: "2 min",
    film: "/media/video/04-signal.mp4",
    audio: "/media/audio/04-signal.mp3",
    summary:
      "Analytical overlay is the mind completing a pattern. Declare it, or stop. Objectify onto the page. Never look early.",
    points: [
      "AOL: write the noun and set it aside. AOL drive: stop.",
      "Coordinates leaked geography. Training cues should be undecodable.",
      "A monitor does not hint. Working alone does not give you permission to hint to yourself.",
    ],
    body: `A remote viewing session is a way of slowing a guess down until you can see which part of it arrived too early.

Swann's term for the thing you are trying to notice is the signal line. The impression that seems to land in the body before it lands in a sentence. The term for the thing that impersonates it is analytical overlay, shortened in the training notes to AOL. Overlay is the mind's talent for completing a pattern. A curve plus a cool feeling becomes river. Three verticals become factory, then the factory I saw on the news. The second step is the problem. The first step may even be useful, if you write it as a component and not as a name.

The working rule is simple, and hard. When a noun arrives with a little rush of certainty, you write AOL, you write the noun, and you set it aside. You do not argue with it, and you do not build on it. If the nouns start arriving in a chain, that is called AOL drive. You stop. You do not push through. A session spoiled by drive teaches you nothing, because feedback can no longer tell data from story.

Objectifying means getting the impression out of your head and onto the page, in the order it came, with almost no editing. Viewers in this tradition were taught that holding an impression in memory is how overlay gets time to dress it up.

A training session has an order.

You cool down. Not a trance. Just enough quiet that you can tell a pen mark from a plan. Two or three minutes is enough for most people.

You take a cue that you cannot decode. In the original coordinate method the cue was a latitude and longitude. That turned out to be a leak. A viewer who knows geography can view a coordinate by remembering the map. Training targets are now usually sealed photographs, or an abstract reference that stands for a target someone else chose.

You work in stages. Low information first.

You stop while the page is still a description.

Only then do you take feedback. You look at the target and you compare like a stranger would. You mark what matched, what missed, and which of your AOLs were you talking to yourself.

Two roles existed in the military training. The viewer produced the data. The monitor read the cue, watched for drive, and did not hint. Training alone is allowed. Hinting to yourself is not. Do not look up the target just to see if you are warm. That single glance ends the session as evidence, even if it feels like it helps.`,
    quiz: [
      {
        prompt: "A noun arrives with a rush of certainty. What do you do?",
        choices: [
          "Build the rest of the session on it",
          "Write AOL, write the noun, and set it aside",
          "Erase the page and start naming faster",
        ],
        answer: 1,
        why: "Overlay declared is data about you. Overlay obeyed becomes the session.",
      },
      {
        prompt: "Why were raw latitudes a poor training cue?",
        choices: [
          "Numbers are hard to say aloud",
          "A viewer who knows maps can remember the geography instead of viewing",
          "The Army preferred colors",
        ],
        answer: 1,
        why: "An undecodable cue is what keeps the session blind.",
      },
    ],
  },
  {
    id: "stages-low",
    numeral: "05",
    title: "Stages I to III",
    minutes: "2 min",
    film: "/media/video/05-stages-low.mp4",
    audio: "/media/audio/05-stages-low.mp3",
    summary:
      "Ideogram, sensory contact, then dimension and the first sketch. Stay here until you are accurate and a little boring.",
    points: [
      "Ideogram: spontaneous mark. A is feeling. B is a primitive gestalt.",
      "Stage II collects sensations, not objects.",
      "Stage III draws relationships. Decoration is overlay.",
    ],
    body: `Stage one is the ideogram, and the declassified training notes treat it as the foundation, not as a warm-up doodle.

An ideogram is a spontaneous mark. The pen moves because the hand moved. Swann described it as a reflexive response to the signal, transferred into the muscles of the hand. It is not a picture of the site. It is closer to a gesture.

You decode it in two parts, written as A and B.

A is the feeling of the mark itself, caught while the ink is still the event. Wavy. Hard. Rising. Flat. Soft. Angular. Fluid. You say the feeling. You do not interpret it.

B is the earliest gestalt those feelings belong to, from a very small vocabulary. Land. Water. Structure. Mountain. Motion. Wet land. Interface, where two of those meet. If B wants to be the harbor at some city you know, that is not a B. That is an AOL, and you declare it.

You can take the cue again. A second ideogram often carries a second component of the same site. Structure beside water. A rise inside a flat. The sequence is the site arriving in pieces. Students of Swann were told, repeatedly, that if the ideogram is not actually decoded, the later stages fill up with overlay.

Stage two is sensory contact, and it is almost the opposite of a picture. Temperature. Texture. Sound. Smell. Taste. Light and dark. Density. Wet or dry. Natural or made. You are collecting adjectives and sensations, not objects. Gritty, cold, a low repeating sound, bright above and dull below. That is stage two. Parking garage is a conclusion wearing a description's clothes.

Something else arrives here, and the notes tell you to log it rather than obey it. Aesthetic impact. A wave of liking, dread, awe, or dullness that feels larger than the data. It is information about your reaction. It is not yet information about what the site is for.

Stage three is where dimension, motion, and the first honest sketch enter. How the masses sit. Whether something rises, spans, encloses, or repeats. Whether there is movement, and of what quality. Slow, radial, linear, contained. The sketch is still a feeling drawn, not an illustration from memory. If you notice yourself decorating, you are no longer in stage three. You are illustrating an AOL. Label it, and return to the line that was actually there.

Most training sessions should live in these three stages for a long time. The later stages are where confident viewers fool themselves. Earn the right to go there by being accurate, and boring, about land, water, structure, and sensory facts.`,
    quiz: [
      {
        prompt: "Which line is a legal B component?",
        choices: ["The harbor at Gothenburg", "Water", "A Soviet submarine pen"],
        answer: 1,
        why: "B stays inside a tiny vocabulary. The other two are overlays.",
      },
      {
        prompt: "Where should most of your early practice live?",
        choices: [
          "Stages I to III",
          "Stage VI clay models on day one",
          "Naming the site as fast as possible",
        ],
        answer: 0,
        why: "Low stages are where you learn to be accurate without the costume of analysis.",
      },
    ],
  },
  {
    id: "stages-high",
    numeral: "06",
    title: "Stages IV to VI",
    minutes: "2 min",
    film: "/media/video/06-stages-high.mp4",
    audio: "/media/audio/06-stages-high.mp3",
    summary:
      "The matrix, interrogation without leading questions, and a model that tests relationships rather than labels.",
    points: [
      "Analysis gets columns, including a column for overlay.",
      "“Is this a base?” is a vote, not a probe.",
      "Score gestalts and relationships, not a clever noun that sat near the truth.",
    ],
    body: `The declassified stage chart describes the second half of the method as a rise in contact. Stage four: general qualitative and quantitative aspects. Stage five: specific analytical aspects, obtained by questioning the signal line rather than by guessing. Stage six: three-dimensional contact. A layout. A model. Further detail.

In the working session this became a matrix, so that analysis would have columns instead of a blank page to ramble on. Across the top: a continuation of the senses. Dimension. Aesthetic impact. Emotional impact. Tangibles, the things that could be counted or pointed at. Intangibles, the purposes and qualities. And two columns that save you from yourself. AOL. And AOL from the signal, a phrase that arrived with the data and might be right, but is still not allowed to lead.

You move across, not down into a story. Three masses. Hard. A repeating low sound. The intangibles column says repair, or keeping something running. AOL: shipyard. The shipyard goes in the AOL column. It does not get to rewrite the three masses.

Stage five is interrogation. You put a narrow question to the signal and you take whatever returns, even when it is poor. What is the motion doing. What is above the hard flat. What happens at the interface. The failure mode here is the leading question you already know the answer to. Is this a military base is not interrogation. It is a vote.

Stage six, in the original training, used modeling. Clay, or a built sketch, so the body had to commit to how pieces occupied space. You are not trying to make it handsome. You are trying to find out whether the tall thing is inside the flat thing or beside it. Relationships are harder to hallucinate consistently than labels, which is why the model is the test.

Stop rules, restated, because this is where they are broken. You stop on AOL drive. You stop when you are tired and decorating. You stop when the page has a coherent description, even if it feels unfinished. Unfinished and clean beats complete and invented.

And then feedback. Lay the target beside the page. Score gestalts, sensations, and relationships. Do not score the cleverness of an AOL that happened to be adjacent to the truth. Adjacency is how legend is written.`,
    quiz: [
      {
        prompt: "Where does the word “shipyard” go if it arrives as a name?",
        choices: [
          "It replaces the sensory column",
          "In the AOL column, where it cannot lead",
          "In the title of the session, as the answer",
        ],
        answer: 1,
        why: "A name can be recorded. It is not allowed to edit the masses.",
      },
      {
        prompt: "What is the model actually testing?",
        choices: [
          "Whether the drawing is handsome",
          "How pieces occupy space relative to each other",
          "Whether you can recall a famous building",
        ],
        answer: 1,
        why: "Relationships are harder to invent consistently than labels.",
      },
    ],
  },
  {
    id: "discipline",
    numeral: "07",
    title: "How not to fool yourself",
    minutes: "2 min",
    film: "/media/video/07-discipline.mp4",
    audio: "/media/audio/07-discipline.mp3",
    summary:
      "Blindness, no optional stopping, categories declared in advance, and the named bugs: displacement, peacocking, frontloading.",
    points: [
      "Choose the target by a method you cannot steer, before you describe anything.",
      "A mixed session is recorded as mixed.",
      "Associative remote viewing is not taught here as a way to make decisions.",
    ],
    body: `The easiest person to deceive with this method is the person holding the pen.

Here is a minimum standard, taken from the failures that are actually in the literature, not from folklore.

Choose the target before the session, by a method you cannot steer. A shuffled pool you do not look at. A number pulled from a die, matched to a list someone else wrote. Never a target you picked because it felt interesting after you had already started describing.

Stay blind. Do not search the cue. Do not let a friend nod. If you work with a partner, the partner either knows the target and says nothing but the cue, or knows nothing and is only a witness. The second is cleaner for beginners.

One session, one target, then feedback. Optional stopping — ending a trial when it looks bad and keeping it when it looks good — will manufacture a miracle in a week.

Write first, then look. If you looked early, mark the session contaminated and do not enter it in your record as evidence. You may still study it as a lesson in how fast a hint colonizes a sketch.

Score with categories you declared in advance. Gestalt: land, water, structure, mountain, motion. A short list of sensory words. A relationship: beside, inside, above, repeating, spanning. Give yourself the miss as carefully as the hit. A session that correctly says structure beside water, and incorrectly says quiet, wooden, domestic, is a mixed session. Record it mixed.

Watch for the bugs that have names.

Displacement. A crisp description of the wrong target in the pool, often the next one. Interesting, and not a hit on the target you were given.

Peacocking. Adding drama so the session feels worthy.

Frontloading. Telling yourself what kind of thing this is, so you can focus. In training, frontloading is a leak you pour in yourself.

Labeling from memory. Your hometown, a film, a news photograph. Declare the AOL the moment the picture arrives with a caption.

Keep a journal that can disappoint you. Date. Cue. Whether you were blind. The page. The feedback. The score. After twenty sessions you will know your actual rate. Before twenty, you know your mood.

A last caution on associative remote viewing, the variant used to guess a future binary event by tying each outcome to a picture. It stacks every one of these bugs on top of a prediction. This course does not teach it as a decision tool. If you experiment, do it on paper, with outcomes you do not bet, and with the same pre-registered scoring. Appetite for a result is the most reliable source of overlay ever found.`,
    quiz: [
      {
        prompt: "Optional stopping means you…",
        choices: [
          "Keep the good sessions and drop the bad ones",
          "Always take feedback, hit or miss",
          "Stop after the ideogram every time",
        ],
        answer: 0,
        why: "That habit manufactures a miracle. The correct practice is the other one: every closed session is scored.",
      },
      {
        prompt: "A crisp description of the wrong target in the pool is called…",
        choices: ["Frontloading", "Displacement", "A monitor"],
        answer: 1,
        why: "Displacement is interesting and is not a hit on the assigned target.",
      },
    ],
  },
  {
    id: "first-session",
    numeral: "08",
    title: "A first honest session",
    minutes: "3 min",
    film: "/media/video/08-first-session.mp4",
    audio: "/media/audio/08-first-session.mp3",
    summary:
      "Ten minutes in the lab. Three scores. Twenty sessions before a belief. And a hard line: do not view people.",
    points: [
      "Score gestalt, at least two sensory lines, and the relationship. Zero is data.",
      "Your journal will not outvote Utts, Hyman, or the AIR panel.",
      "No people, no medicine, no legal claims, no borrowed classification stamps.",
    ],
    body: `You have enough to run a first honest session. Not a perfect one. An honest one.

Use the practice lab in this app. The target is chosen when you begin, and the picture stays off the page until you close the session. The seal is a discipline, not a lock. Treat it as one. Give the session ten minutes, not an hour.

Cool down. Take the cue. Make one ideogram. Write A, the feeling of the line. Write B, only from the small vocabulary, or write AOL if a name pushed in. Take a second ideogram if the first was muddy.

Then four sensory lines. Temperature. Texture. Sound. Light. One sentence each, or less.

Then one sketch of masses and their relationship. No shading theater. No labels written on the drawing except words you actually perceived. Up. Flat. Wet. Hard. Repeating.

Read the page once. Declare any AOL you have not already declared. Close the session. Then, and only then, open the target.

Score three things. Did the gestalt match. Did at least two sensory lines match. Did the relationship in the sketch match. Three yeses is a strong training session. One yes is ordinary, and still worth keeping. Zero is data, not a verdict on your worth.

Do this twenty times before you decide what you believe. The government program itself is a warning against deciding early. Utts looked at a very large body of trials and called the effect small to medium, and replicable in the long run. Hyman looked at the same class of result and said the anomaly was real as a statistic and unidentified as a cause. The American Institutes for Research looked at operations and said it had not been useful. Your twenty sessions will not outvote them. They will teach you the difference between a felt conviction and a scored page.

Ethics, briefly, because the method is easy to misuse.

Do not view people. Not a partner, not a stranger, not an illness, not a missing person. This course refuses that use. The consent problem is obvious. The false-positive problem is worse. And nothing in the declassified record makes you qualified to intervene in someone's life.

Do not offer remote viewing as medicine, as legal evidence, or as a reason to spend money.

Do not dress the practice in borrowed authority. You are not in a classified program. The stamps on the old documents belong to history. Your authority is the page, the blind, and the score.

If the work stays interesting, go to the primary paper. The AIR evaluation. Utts's assessment of the evidence for psychic functioning. Hyman's reply. Puthoff's account of the CIA-sponsored work at SRI. The declassified stage notes for coordinate remote viewing. Read the critics of the nineteen seventy-four Nature paper before you quote it.

Then do another session. Ideogram first. Name never.`,
    quiz: [
      {
        prompt: "A session with no matches is…",
        choices: [
          "Proof you have no ability, forever",
          "Data, and worth keeping",
          "Something you should delete so the journal looks better",
        ],
        answer: 1,
        why: "A journal that cannot record a zero cannot teach you your rate.",
      },
      {
        prompt: "Which target does this course allow?",
        choices: [
          "A stranger's health",
          "A sealed place or object in the practice pool",
          "A missing person",
        ],
        answer: 1,
        why: "People are out. Consent, false positives, and the limits of the record all point the same way.",
      },
    ],
  },
];

export function lessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}
