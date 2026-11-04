import type { SkillGuide } from "./types";

// Texto do guia /skills/ux-research. EN é a voz principal; `pt` entra na F3 (ver .docs/Spec.md).
// Saídas da skill nos blocos de código são reais quando o texto diz que são, e fictícias no
// caso do app de agenda, que a página declara como inventado.

export const uxResearchGuide: SkillGuide = {
  slug: "ux-research",
  repoPath: "skills/ux-research",
  published: "2026-11-04",
  updated: "2026-11-04",
  meta: {
    title: { en: "UX Research Skill for Claude Code" },
    description: {
      en: "A free Claude Code skill that plans user research, writes interview scripts and turns findings into insights you can trace back to evidence.",
    },
  },
  breadcrumb: { en: "UX Research" },
  h1: { en: "A UX research skill for Claude Code" },
  lead: {
    en: "**ux-research is a free, open-source skill for Claude Code that plans user research, writes interview scripts, turns raw findings into insights you can trace back to evidence, and hands a design brief to the next step.** Before it suggests any method, it asks what decision the research is supposed to inform. I built it on three published frameworks: Behzod Sirjani's research planning, Daniel Pidcock's Atomic Research and Teresa Torres' Continuous Discovery.",
  },
  sections: [
    {
      id: "install",
      nav: { en: "Install" },
      title: { en: "Install it in one command" },
      blocks: [
        { type: "install", command: "npx skills add Gustavosilveira23/claude-design-skills -s ux-research -g" },
        {
          type: "p",
          text: {
            en: "That installs it for every project on your machine. Open a new Claude Code conversation and describe a research problem; the skill loads on its own. You can also call it directly with `/ux-research`.",
          },
        },
        {
          type: "p",
          text: {
            en: "The same command works in Cursor, Codex and other agents that read the Agent Skills format. On claude.ai, zip the `ux-research` folder and upload it under Customize > Skills, with code execution turned on.",
          },
        },
        {
          type: "p",
          text: {
            en: "The code lives at [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), MIT licensed, next to five other design skills.",
          },
        },
      ],
    },
    {
      id: "guided-start",
      nav: { en: "Guided start" },
      title: { en: "Never planned research? Type /ux-research and nothing else" },
      blocks: [
        {
          type: "p",
          text: {
            en: "You don't need to know the method or which mode to pick. Type the command alone and the skill interviews you until there is a decision worth researching. This is the conversation it had with a first-time researcher, recorded in a fresh Claude Code session. The skill's replies are real and shortened; the user's answers were written for the demo. The wording changes from run to run and follows your language. The order of the questions doesn't.",
          },
        },
        {
          type: "conversation",
          turns: [
            { role: "user", text: { en: "/ux-research" } },
            {
              role: "skill",
              text: {
                en: `What are you working on? A sentence or two is enough to start.
[...]
If you're not sure which mode fits, answer this: what decision are you trying to make? If you had the perfect answer tomorrow, what would you do differently?`,
              },
            },
            {
              role: "user",
              text: {
                en: "I'm the only designer at a small startup, we make a habit tracking app. My manager said we should do user research. I guess we just want to understand our users better.",
              },
            },
            {
              role: "skill",
              text: {
                en: `"Understand our users better" isn't something research can finish. You could interview people for six months and still not know when you're done. Here's what a decision could look like for a habit tracking app:
- "Should we rebuild onboarding, or is the real problem week 2?"
- "Do people drop off because they forget to open the app, or because they miss a day and give up?"
What made your manager bring this up now?`,
              },
            },
            {
              role: "user",
              text: {
                en: "A lot of people stop using the app after the first couple of weeks. The team wants to build streak reminders next quarter but nobody's sure that's the problem.",
              },
            },
            {
              role: "skill",
              text: {
                en: `That's a real decision: should we spend next quarter on streak reminders, or is the drop-off caused by something reminders won't fix?
Streak reminders are a bet that people leave because they forget. Other explanations are just as plausible:
- They missed a day, lost the streak, and gave up. If that's the cause, more streak reminders could make it worse.
- The app worked: the habit stuck and they didn't need it anymore.
[...]
One honest check: if the evidence says reminders aren't the answer, is the team actually willing to build something else?`,
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Three answers in, the vague request has become a decision, the team's favorite solution has five competing explanations, and the skill has already described the one slide the study should end with: why people stopped, grouped by cause, and where \"forgot to open the app\" ranks. From there it moves into Plan mode on its own.",
          },
        },
      ],
    },
    {
      id: "modes",
      nav: { en: "Four modes" },
      title: { en: "How it works: four modes" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The skill reads your request and picks one of four modes. If you describe your problem in your own words, you never have to name a mode. Most days I use one at a time.",
          },
        },
        {
          type: "table",
          head: [{ en: "Mode" }, { en: "Use it when" }, { en: "You get" }],
          rows: [
            [
              { en: "Plan" },
              { en: "You have a decision to make and not enough evidence" },
              { en: "A research brief: stage, method, sample, the one slide you expect to show" },
            ],
            [
              { en: "Interview" },
              { en: "You need to talk to users" },
              { en: "Interview scripts, surveys, usability test plans" },
            ],
            [
              { en: "Synthesize" },
              { en: "You have notes, transcripts or survey data" },
              { en: "Facts, insights and recommendations, each with a confidence level" },
            ],
            [
              { en: "Specify" },
              { en: "The insights are in and design starts next" },
              { en: "A design brief where every requirement points back to evidence" },
            ],
          ],
        },
        {
          type: "p",
          text: {
            en: "The examples below follow one invented case from start to finish, so you can see what each mode returns. The company and the numbers are fictional.",
          },
        },
        {
          type: "callout",
          label: { en: "The case" },
          text: {
            en: "A B2B scheduling app. New teams sign up, then stall before they book a single meeting. The PM asks: should we rebuild onboarding as a guided setup, or fix the self-service flow we have?",
          },
        },
      ],
    },
    {
      id: "plan",
      nav: { en: "Plan" },
      title: { en: "Plan: start from the decision, not the method" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The first thing the skill does is refuse to start without a decision. \"Learn about our users\" gets sent back with a question: if you had the perfect answer tomorrow, what would you do differently?",
          },
        },
        {
          type: "p",
          text: {
            en: "Once the decision is clear, it works through four checks. Which stage the team is in (Discover, Design, Develop or Deploy). How big the decision is, which Sirjani calls the splash zone: size of the work, who has to be involved, who gets affected. What kind of evidence the decision needs. And which methods are actually possible with the time, traffic and access you have.",
          },
        },
        {
          type: "code",
          label: { en: "Prompt" },
          wrap: true,
          code: {
            en: "/ux-research We're losing new teams before their first booked meeting. Should we rebuild onboarding as a guided setup or fix the self-service flow?",
          },
        },
        {
          type: "code",
          label: { en: "What comes back (shortened)" },
          code: {
            en: `DECISION     Guided setup vs. fixing the current self-service
             onboarding.
STAGE        Discover. Nobody can say yet why teams stall, so
             it's too early to compare two solutions.
SPLASH ZONE  Medium. 6-8 weeks of work, sales and support
             affected, every new account goes through it.
EVIDENCE     Behavioral first (where teams stop), then
             attitudinal (why).
METHODS      Funnel review of the setup steps + 6 interviews
             with admins who stalled in the last 30 days.
CUT          A/B test. About 200 signups a month is too few
             per variant.
THE SLIDE    The step where teams stop, next to the words
             they used for it.`,
          },
        },
        {
          type: "p",
          text: {
            en: "That last line is Sirjani's \"million dollar slide\": the one chart you expect to change the decision, sketched before any data comes in. If you can't sketch it, you don't know yet what you're looking for.",
          },
        },
      ],
    },
    {
      id: "interview",
      nav: { en: "Interview" },
      title: { en: "Interview: scripts that ask about the past" },
      blocks: [
        {
          type: "p",
          text: {
            en: "People are bad at predicting what they would do and reasonable at telling you what they did. So the scripts follow Teresa Torres' story-based interviewing: start from the last time something happened and walk forward in time.",
          },
        },
        {
          type: "code",
          label: { en: "Prompt" },
          wrap: true,
          code: { en: "/ux-research Write the interview script for the admins who stalled." },
        },
        {
          type: "code",
          label: { en: "What comes back (excerpt)" },
          code: {
            en: `STORY (15-20 min)
"Think about the day you signed your team up. Walk me through what
happened from the beginning."
  "What happened first?"
  "Then what did you do?"
  "What were you thinking at that point?"

PROBES
  Pain point    -> "What did you do when that happened?"
  Workaround    -> "How did you figure out that approach?"
  Vague answer  -> "Can you give me a specific example?"`,
          },
        },
        {
          type: "p",
          text: { en: "It also rewrites the questions that tend to sneak into scripts:" },
        },
        {
          type: "table",
          head: [{ en: "Instead of" }, { en: "It asks" }],
          rows: [
            [
              { en: "\"Would you use a guided setup?\"" },
              { en: "\"Tell me about the last time you set up a tool for your team.\"" },
            ],
            [{ en: "\"Why did you stop?\"" }, { en: "\"What led you to stop there?\"" }],
            [
              { en: "\"How often do you invite people?\"" },
              { en: "\"When was the last time? And before that?\"" },
            ],
          ],
        },
        {
          type: "p",
          text: {
            en: "The same mode writes surveys (screening first, 10 minutes at most) and usability tests, where each task is a goal (\"book a meeting with two colleagues\") instead of a list of clicks.",
          },
        },
      ],
    },
    {
      id: "synthesize",
      nav: { en: "Synthesize" },
      title: { en: "Synthesize: from facts to insights with Atomic Research" },
      blocks: [
        {
          type: "p",
          text: { en: "This is the mode I use most. It sorts what you collected into Daniel Pidcock's four levels:" },
        },
        {
          type: "list",
          items: [
            { en: "**Experiment**: what you did. \"6 interviews and a funnel review, October.\"" },
            { en: "**Fact**: what you found, with no interpretation." },
            { en: "**Insight**: what a group of facts means." },
            { en: "**Recommendation**: what to do about it." },
          ],
        },
        {
          type: "p",
          text: {
            en: "The rule that makes it work: no insight without facts behind it, and no recommendation without an insight. If the chain breaks, the recommendation is an opinion. Each insight also gets a confidence level. One fact from one source is LOW. Two or three from one source is MEDIUM. Three or more from different sources is HIGH.",
          },
        },
        {
          type: "code",
          label: { en: "What comes back (fictional data)" },
          code: {
            en: `EXPERIMENT  6 interviews with admins who stalled
            + setup funnel review, Oct.

FACT 1  5 of 6 admins stopped at "Connect your calendar".
FACT 2  P4: "I didn't want to give it access to everyone's
        calendar before I knew it worked."
FACT 3  58% of new accounts never pass the calendar step
        (funnel).
FACT 4  3 of 6 came back only after a colleague said it
        was safe.

INSIGHT  Admins won't grant calendar access before they've
         seen the product work.
         Confidence: HIGH (4 facts, 2 sources)

RECOMMENDATION  Let admins book a test meeting with sample
                data before asking for calendar access.
                Expected: more accounts pass that step.
                Measure: completion rate of that step.`,
          },
        },
        {
          type: "p",
          text: {
            en: "Look at the recommendation. It is neither \"guided\" nor \"self-service\". The evidence moved the question, which is the point of doing research before choosing.",
          },
        },
        {
          type: "p",
          text: {
            en: "The skill ends every synthesis with a note to go back to the raw data. The next section explains why.",
          },
        },
      ],
    },
    {
      id: "specify",
      nav: { en: "Specify" },
      title: { en: "Specify: a design brief traceable to evidence" },
      blocks: [
        {
          type: "p",
          text: {
            en: "When the insights are solid, this mode writes the brief for whoever designs next. In my setup that is the [ux-designer skill](/skills), but the brief works for a person too.",
          },
        },
        {
          type: "code",
          label: { en: "What comes back (excerpt)" },
          code: {
            en: `DESIGN BRIEF  Calendar permission in onboarding

DECISION   Guided setup vs. fixing self-service
           (reframed by research).

MUST HAVE
  1. A working test booking before any permission request
     Backed by: Insight 1 (facts 1, 2, 3, 4), HIGH

ASSUMPTION (LOW confidence, validate before building)
  2. Showing which calendar data we read will reduce drop-off
     Based on: 1 quote. Cheapest test: 5 usability sessions.

SUCCESS    Primary: calendar step completion.
           Guardrail: support tickets about permissions don't go up.`,
          },
        },
        {
          type: "p",
          text: {
            en: "Anything that can't be traced to a fact is labeled as an assumption, with the cheapest way to test it. A brief that hides its weak spots gets built anyway, and then the weak spot shows up in production.",
          },
        },
      ],
    },
    {
      id: "ai-limits",
      nav: { en: "Where AI fails" },
      title: { en: "Where AI helps and where it fails in user research" },
      blocks: [
        {
          type: "p",
          text: {
            en: "AI is fast at structure: drafting a script, grouping hundreds of notes, checking that every recommendation has evidence behind it. It is not reliable at the step that matters most, which is reading what people meant.",
          },
        },
        {
          type: "p",
          text: {
            en: "Nielsen Norman Group put it plainly in their guide to research with AI: the model \"might miss, misinterpret, or even manufacture insights\", and when coding transcripts \"it often misses large sections of the transcript where codes should be applied\" ([Moran and Rosala, NN/g](https://www.nngroup.com/articles/research-with-ai/)).",
          },
        },
        { type: "p", text: { en: "So the skill is built around that limit:" } },
        {
          type: "list",
          items: [
            { en: "It structures and checks. It never treats its own reading of an interview as the final word." },
            { en: "Every synthesis ends with a flag to review the raw data." },
            { en: "It keeps verbatim quotes, because a paraphrase is already an interpretation." },
            {
              en: "It pushes back on research meant to confirm a decision already made. If the team has decided, it says so: skip the research and ship.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "On sample size it holds the opposite line from most AI tools. It won't let a small decision wait for a big study. Five interviews are enough for a lot of decisions, and five usability sessions find most of the problems in a flow ([Nielsen, 2000](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)).",
          },
        },
      ],
    },
    {
      id: "credits",
      nav: { en: "Credits" },
      title: { en: "Frameworks and credits" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The method comes from people who published it first. The skill's job is to combine them so Claude applies all three in the same conversation.",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "**Research planning**: Behzod Sirjani (Reforge). Decision first, splash zone, evidence mapping, the million dollar slide.",
            },
            {
              en: "**Atomic Research**: [Daniel Pidcock](https://blog.prototypr.io/what-is-atomic-research-e5d9fbc1285c). Experiment, fact, insight, recommendation.",
            },
            {
              en: "**Continuous Discovery**: [Teresa Torres](https://www.producttalk.org). Story-based interviewing and the opportunity solution tree.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Full credits are in the [repository README](https://github.com/Gustavosilveira23/claude-design-skills#credits--sources).",
          },
        },
      ],
    },
  ],
  author: {
    en: "Senior product designer and UX researcher. I ran research at Hotmart and Sympla, including an [automated research repository](/portfolio/hotmart-research-repository). Building an AI product? [Let's talk](/contact).",
  },
  faq: [
    {
      q: { en: "What is a Claude Code skill?" },
      a: {
        en: "A folder with instructions and reference files that Claude loads when your request matches what the skill covers. It changes how Claude works on that kind of task without you pasting a long prompt every time.",
      },
    },
    {
      q: { en: "Do I need Claude Code, or does it work on claude.ai?" },
      a: {
        en: "Both. In Claude Code, install it with the command above. On claude.ai, zip the `ux-research` folder and upload it under Customize > Skills, with code execution on. It also works in other agents that support Agent Skills, such as Cursor and Codex.",
      },
    },
    {
      q: { en: "I've never done user research. Where do I start?" },
      a: {
        en: "With the decision, not the method. Write down what your team will build or change depending on the answer. If you can't, type `/ux-research` with nothing after it: the skill asks questions until the decision is clear, then suggests the smallest study that can answer it, often five or six interviews.",
      },
    },
    {
      q: { en: "Can AI replace a UX researcher?" },
      a: {
        en: "No. It can draft, organize and check, and it does those quickly. Deciding what a pattern means and what the team should do about it still needs a person who read the raw data. The skill is built to keep that step human.",
      },
    },
    {
      q: { en: "Can I use Claude to synthesize user interviews?" },
      a: {
        en: "Yes, for structure. Paste your notes or transcripts and use Synthesize mode: it separates facts from interpretation, groups them into insights and scores each one. Then check the insights against the transcripts yourself, because AI can skip whole sections of a conversation.",
      },
    },
    {
      q: { en: "What is atomic research?" },
      a: {
        en: "A way to store research as small linked pieces instead of reports. Daniel Pidcock defined four levels: experiment, fact, insight and recommendation. A fact can support several insights, and new studies add facts to old insights, so knowledge builds up across projects.",
      },
    },
    {
      q: { en: "What's the difference between a fact and an insight?" },
      a: {
        en: "A fact is what happened: \"5 of 6 admins stopped at the calendar step.\" An insight is what it means: \"admins won't grant access before they trust the product.\" If two people could read the same data and disagree, you've already moved from fact to insight.",
      },
    },
    {
      q: { en: "How many users should I interview?" },
      a: {
        en: "It depends on the size of the decision. For a small decision, 3 to 5 interviews are usually enough. For a larger one, plan 5 to 8 per user segment. For usability testing, 5 participants find most of the problems in a flow.",
      },
    },
    {
      q: { en: "What goes in a UX research plan?" },
      a: {
        en: "The decision it informs, the product stage, the size of the decision, what you need to learn (must, should, nice to know), the method and participants, the output you expect, and what the research won't answer. Plan mode writes this as a research brief.",
      },
    },
  ],
};
