import type { L, SkillGuide } from "./types";

// Texto do guia /skills/ux-designer. EN é a voz principal; PT é tradução (DESIGN.md, Copy).
// A sessão foi gravada em 10/11/2026 (Claude Code headless, só esta skill, sem CLAUDE.md pessoal).
// Respostas da skill são reais e encurtadas; falas do usuário foram escritas para a demo; a tela
// auditada é fictícia. A página declara as três coisas.
// Blocos de código: no máximo 68 colunas por linha nas duas línguas (não rolam no desktop).
// Fontes de cada número: .docs/PRD-ux-designer.md, seção "Fontes verificadas".

/** Só até a F3: o PT repete o EN. A F3 troca todos por `{ en, pt }` e apaga este helper. */
const todoPt = (en: string): L => ({ en, pt: en });

export const uxDesignerGuide: SkillGuide = {
  slug: "ux-designer",
  repoPath: "skills/ux-designer",
  published: "2026-11-11",
  updated: "2026-11-11",
  meta: {
    title: todoPt("UX Designer Skill for Claude Code"),
    description: todoPt(
      "A free Claude Code skill that asks who uses an interface before building it, presents a UX strategy first and audits screens with a CLEAR scorecard."
    ),
  },
  breadcrumb: todoPt("UX Designer"),
  h1: todoPt("A UX design skill for Claude Code"),
  lead: todoPt(
    "**ux-designer is a free, open-source skill for Claude Code that makes Claude ask who uses an interface before it builds one, present a UX strategy before writing code, push back on requests that would hurt the experience, and audit existing screens with a score out of 10 or a CLEAR scorecard.** It also checks what AI-generated interfaces tend to skip: empty and error states, microcopy, keyboard access and touch targets."
  ),
  sections: [
    {
      id: "install",
      nav: todoPt("Install"),
      title: todoPt("Install it in one command"),
      blocks: [
        { type: "install", command: "npx skills add Gustavosilveira23/claude-design-skills -s ux-designer -g" },
        {
          type: "p",
          text: todoPt(
            "That installs it for every project on your machine. Ask Claude Code to design, review or fix anything a person uses, and the skill loads on its own. You can also call it directly with `/ux-designer`, followed by a URL, a component name or a file path."
          ),
        },
        {
          type: "p",
          text: todoPt(
            "The same command works in Cursor, Codex and other agents that read the Agent Skills format. On claude.ai, zip the `ux-designer` folder and upload it under Customize > Skills, with code execution turned on. The code lives at [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), MIT licensed, next to five other design skills."
          ),
        },
      ],
    },
    {
      id: "gate",
      nav: todoPt("It asks first"),
      title: todoPt("It asks before it builds"),
      blocks: [
        {
          type: "p",
          text: todoPt(
            "Ask most AI tools to design the calendar step of an onboarding and you get a screen. This skill stops first. Until it knows who uses the interface, what problem it solves and what the constraints are, it asks instead of building."
          ),
        },
        {
          type: "p",
          text: todoPt(
            "To show it, I continued the case from the [ux-research guide](/skills/ux-research#specify). There, research on a scheduling tool found that new admins won't connect their calendar before they've seen the product work, and the skill wrote a design brief whose one must-have was a working test booking before any permission request. Here, that brief goes to ux-designer. I recorded the session in a fresh Claude Code session with only this skill installed. The skill's replies are real and shortened; the user's lines were written for the demo."
          ),
        },
        {
          type: "conversation",
          turns: [
            {
              role: "user",
              text: todoPt(
                "/ux-designer Here's the design brief from our research on why new admins stall in onboarding. Can you design the calendar connection step? [brief pasted]"
              ),
            },
            {
              role: "skill",
              text: todoPt(`The brief covers what to build. It leaves out a few things that would change the design, so I have some questions before I start.
[...]
1. What made admins stall? "They don't trust us with their calendar", "they don't see the value yet" and "IT has to approve it" each lead to a different screen.
2. How does a test booking work before we have calendar access? The must-have depends on it.
3. Who grants the permission? Their own calendar in one OAuth click, or workspace-wide consent from an IT admin?
4. What did "reframed by research" decide?
5. Desktop or mobile? Is there a design system? Do you want a prototype, a Figma file or a flow and states spec?
If you only have time for two, answer 1 and 2.`),
            },
            {
              role: "user",
              text: todoPt(
                `1. They won't connect before they've seen it work. 5 of 6 stopped at "Connect your calendar". One said: "I didn't want to give it access to everyone's calendar before I knew it worked." 3 of 6 came back after a colleague said it was safe.
2. They can book a slot on their own page with default hours and get the confirmation email.
3. Mostly their own calendar. Some bigger companies need IT consent.
4. Show it working first.
5. Desktop, we have a design system, a flow and states spec is enough.`
              ),
            },
          ],
        },
        {
          type: "p",
          text: todoPt(
            "Every question changes the design. Question 3 is the one teams skip most: if consent needs an IT admin, part of this step becomes \"send this to your IT person\", and no screen layout fixes that."
          ),
        },
      ],
    },
    {
      id: "strategy",
      nav: todoPt("Strategy first"),
      title: todoPt("Strategy before code"),
      blocks: [
        {
          type: "p",
          text: todoPt(
            "With the answers in, the skill presents a strategy in a fixed format and waits for approval before it writes a spec or any code. A quick fix gets one sentence. A new flow gets the full template."
          ),
        },
        {
          type: "code",
          label: todoPt("What came back (shortened)"),
          code: todoPt(`UX STRATEGY  Calendar connection step

TARGET USER  A new admin at their desk, evaluating the tool.
             Cautious: they feel they're vouching for it to
             their team.

CORE INSIGHT Trust comes from seeing it work. Connecting the
             calendar should fix a problem they just saw.

KEY DECISIONS
  1. Test booking first, framed as "try your page".
  2. The reason to connect comes from what they saw:
     "This booking isn't on your calendar yet."
  3. One line on scope: "Connects your calendar only.
     Your team's calendars stay private."
  4. "Skip for now" is a real exit. The page stays live.
  5. A short page they can forward to IT or a colleague.

BIGGEST RISK The test booking satisfies them and they leave
             without connecting.`),
        },
        {
          type: "p",
          text: todoPt(
            "Two details came from reading the evidence closely. The quote said \"everyone's calendar\", but the OAuth click only grants access to the admin's own calendar, so part of the fear is about something the product doesn't do. That became decision 3. And it named its own weak spot: a test booking good enough that nobody bothers to connect. The message after the booking is there to close that gap."
          ),
        },
      ],
    },
    {
      id: "pushback",
      nav: todoPt("It pushes back"),
      title: todoPt("It pushes back"),
      blocks: [
        {
          type: "p",
          text: todoPt(
            "Then the demo user brought a request from their PM: remove \"Skip for now\", because a mandatory step would raise calendar step completion, the brief's primary metric."
          ),
        },
        {
          type: "conversation",
          turns: [
            {
              role: "user",
              text: todoPt(
                "My PM wants to remove \"Skip for now\". If the calendar step is mandatory, calendar step completion goes up, and that's our primary metric. Can we do that?"
              ),
            },
            {
              role: "skill",
              text: todoPt(`You could, but I'd push back. The metric would probably go up while the real outcome gets worse.
1. It changes who is in the number. Admins who won't connect don't start trusting us because the skip button is gone. They leave onboarding, and completion rises because the doubters left.
2. Your own research says the doubters come back. 3 of 6 returned after a colleague said it was safe. Skip is what lets them return.
3. Some admins can't connect at all. The ones who need IT consent get blocked and become the support tickets your guardrail watches.
4. It's the same mistake the research found, one step later.
Instead: keep skip as a quiet text link, ask "What's stopping you?" when someone skips, and require a connected calendar later, when they share the page with real people. If your PM still wants mandatory, run an A/B test judged on accounts with a connected calendar after 7 days.`),
            },
          ],
        },
        {
          type: "p",
          text: todoPt(
            "The skill's instructions end with one line: advocate for the person on the other side of the screen. In practice that means disagreeing with reasons taken from the brief, offering something else to do, and proposing a test when argument can't settle it."
          ),
        },
      ],
    },
    {
      id: "audit",
      nav: todoPt("Audits"),
      title: todoPt("Audits: a score out of 10, or a CLEAR scorecard"),
      blocks: [
        {
          type: "p",
          text: todoPt(
            "Point it at an existing screen and it audits in one of two formats. The quick one is a score out of 10, with findings sorted into critical, important and polish, plus what's working. The detailed one is a scorecard adapted from [Growth.Design's CLEAR UI framework](https://growth.design/courses/clear-ui): Copy, Layout, Emphasis, Accessibility and Reward, each scored from 1 to 5, then checked against ELMR for the main action."
          ),
        },
        {
          type: "p",
          text: todoPt(
            "In the session I asked for the detailed audit of the calendar step the tool has today. That screen is fictional, written for the demo to match what the brief describes: a permission request first, written from the system's side."
          ),
        },
        {
          type: "table",
          head: [todoPt("Dimension"), todoPt("Score"), todoPt("Main problem")],
          rows: [
            [
              todoPt("Copy"),
              todoPt("1/5"),
              todoPt("Describes what the system needs, not what the admin gets. Raw scope codes, a \"Submit\" button and a fake \"Error 403\"."),
            ],
            [todoPt("Layout"), todoPt("2/5"), todoPt("Two actions (pick, then Submit) where one would do. No Back or Skip.")],
            [
              todoPt("Emphasis"),
              todoPt("2/5"),
              todoPt("The provider choice looks like plain boxes. The strongest element is a button that does nothing on its own."),
            ],
            [todoPt("Accessibility"), todoPt("1/5"), todoPt("Provider tiles can't be reached by keyboard. 5 of 6 color pairs fail contrast.")],
            [todoPt("Reward"), todoPt("1/5"), todoPt("No benefit stated before the ask, and no feedback when you click.")],
            [todoPt("Total"), todoPt("7/25"), todoPt("Asks for broad access before showing anything works.")],
          ],
        },
        {
          type: "code",
          label: todoPt("Critical findings (shortened)"),
          code: todoPt(`1. It asks before it proves anything. This is the screen
   where 5 of 6 admins stopped.
2. Clicking a provider changes nothing on screen.
3. Keyboard and screen-reader users can't connect at all:
   the provider tiles are divs with click handlers.
4. Picking no provider shows "Error 403:
   insufficient_permissions". Nothing was denied. Admins
   already nervous about permissions see a permission error.
5. One scope, admin.directory.resource.calendar, reads like
   access to the whole organization.

QUESTION FOR ENGINEERING
Does onboarding need the resource-calendar scope? Admin
directory scopes often require IT approval.`),
        },
        {
          type: "p",
          text: todoPt(
            "Finding 4 is the kind a checklist misses: an error message telling a nervous person that the thing they fear just happened. The skill also said what it couldn't check. It worked out the contrast ratios by hand, because running a script needed approval, and it didn't score the screens after the redirect to Google or Microsoft, because they weren't in the file."
          ),
        },
      ],
    },
    {
      id: "checks",
      nav: todoPt("What it checks"),
      title: todoPt("What it checks while it designs"),
      blocks: [
        {
          type: "p",
          text: todoPt(
            "Between the strategy and the audit, the skill runs the same checks on anything it designs. These are the ones that catch what AI-generated interfaces usually miss:"
          ),
        },
        {
          type: "list",
          items: [
            todoPt(
              "**States, not only the happy path.** Empty, loading, error and success, plus edge cases: zero items, a thousand items, long names, missing data. Every step of a flow needs a way out."
            ),
            todoPt(
              "**Microcopy.** Buttons name the outcome (\"Connect Google Calendar\", never \"Submit\"). Errors say what happened, why and what to do next. Confirmation dialogs name both actions."
            ),
            todoPt(
              "**Accessibility.** Text contrast of at least 4.5:1 (WCAG AA), real buttons instead of clickable divs, visible focus and `prefers-reduced-motion`. Touch targets aim for 44x44 pt and never drop below the WCAG AA floor of 24x24 CSS pixels."
            ),
            todoPt(
              "**Psychology, with sources.** Working memory holds about four chunks ([Cowan, 2001](https://doi.org/10.1017/S0140525X01003922)). More options slow decisions ([Hick's law](https://lawsofux.com/hicks-law/)). People judge an experience by its peak and its end ([Kahneman et al., 1993](https://doi.org/10.1111/j.1467-9280.1993.tb00589.x))."
            ),
            todoPt(
              "**Feedback timing.** A response within 0.1 second feels instant. Past about 10 seconds, show a percent-done progress bar ([Nielsen, 1993](https://www.nngroup.com/articles/response-times-3-important-limits/))."
            ),
            todoPt(
              "**Motion with a reason.** Every animation has to answer a question: where did this come from, what changed, did my action work. Most UI animations fall between 100 and 500 ms ([NN/g](https://www.nngroup.com/articles/animation-duration/))."
            ),
          ],
        },
        {
          type: "p",
          text: todoPt(
            "Before writing this guide I checked every number in the skill against its primary source. Ten were wrong, outdated or had no source. One said left-aligned content gets 30% more attention; the study behind it measured 30% of viewing time on the right half of the page, in 2010. The current figure is about 80% on the left half ([NN/g, 2017](https://www.nngroup.com/articles/horizontal-attention-leans-left/)). All ten are [fixed in the skill](https://github.com/Gustavosilveira23/claude-design-skills/commit/f70854e7c0014abf9c8881e12f8f2e07bed744da)."
          ),
        },
      ],
    },
    {
      id: "ai-limits",
      nav: todoPt("Where AI fails"),
      title: todoPt("Where AI fails at UX review"),
      blocks: [
        {
          type: "p",
          text: todoPt(
            "The research on AI audits points one way: models find part of the real problems and invent others. How much of each depends on the method."
          ),
        },
        {
          type: "p",
          text: todoPt(
            "In 2023, Baymard Institute gave ChatGPT-4 screenshots of 12 e-commerce pages and compared its suggestions with those of six UX benchmarkers who reviewed the live pages. 80% of the AI's suggestions were wrong. It found 14% of the problems on the live pages, and 26% of the ones visible in the screenshots ([Holst, Baymard, 2023](https://baymard.com/research-articles/gpt-ux-audit))."
          ),
        },
        {
          type: "p",
          text: todoPt(
            "A 2025 study got far more coverage with a structured prompt built on Nielsen's heuristics: GPT-4 found 73% and 77% of the usability problems in two mobile apps, more than five experienced evaluators combined (57% and 63%). It also flagged 95 issues that weren't problems, against 9 from the experts, and struggled with problems that span several screens ([Zhong, McDonald and Hsieh, 2025](https://arxiv.org/abs/2507.02306)). The two studies measure different things, so they don't show AI going from 14% to 77%."
          ),
        },
        {
          type: "p",
          text: todoPt(
            "Daniela Napoli, a UX researcher who built her own heuristic evaluation skill, tested it on her own site, where she knew the reason behind every decision. Her summary: \"Claude confidently flagged problems that did not exist\", mostly in dynamic content and paths it couldn't verify ([Napoli, 2026](https://hellodaniela.substack.com/p/ai-heuristic-evaluation-building))."
          ),
        },
        {
          type: "p",
          text: todoPt("So the skill is built around that limit:"),
        },
        {
          type: "list",
          items: [
            todoPt(
              "It asks who uses the screen before judging it, so each finding is tied to a person and a goal instead of a generic best practice."
            ),
            todoPt(
              "It says what it couldn't check. In the demo it flagged the contrast it calculated by hand and the screens it never saw."
            ),
            todoPt(
              "Every review ends with what to test: the riskiest assumption and the cheapest way to check it with real users."
            ),
          ],
        },
        {
          type: "p",
          text: todoPt(
            "Treat its audit as a first pass. Each finding is a hypothesis to check on the live screen, and the ones that matter go to users."
          ),
        },
      ],
    },
    {
      id: "credits",
      nav: todoPt("Credits"),
      title: todoPt("Frameworks and credits"),
      blocks: [
        {
          type: "p",
          text: todoPt(
            "The skill combines frameworks other people published first. Its job is to make Claude apply them in the same conversation, at the moment they matter."
          ),
        },
        {
          type: "list",
          items: [
            todoPt(
              "**ELMR** (Emotion, Logic, Motivation, Reward): from Reforge's user psychology material, [attributed to Brian Balfour](https://coschedule.com/blog/user-psychology) in secondary sources. The original lesson is behind a Reforge login."
            ),
            todoPt(
              "**CLEAR** (Copy, Layout, Emphasis, Accessibility, Reward): [Growth.Design, CLEAR UI course](https://growth.design/courses/clear-ui). The 1 to 5 scale and the criteria in the skill are my adaptation, not the course material."
            ),
            todoPt(
              "**Laws of UX**: [Jon Yablonski](https://lawsofux.com), for Hick's law, Fitts's law, Jakob's law and the peak-end rule, each with a link to the original paper."
            ),
            todoPt(
              "**Attention, response times and animation**: [Nielsen Norman Group](https://www.nngroup.com) research, cited by date in the skill."
            ),
          ],
        },
        {
          type: "p",
          text: todoPt(
            "Full credits are in the [repository README](https://github.com/Gustavosilveira23/claude-design-skills#credits--sources)."
          ),
        },
      ],
    },
  ],
  author: todoPt(
    "Senior product designer. I designed products at Hotmart and Sympla and now work on AI products. Building one? [Let's talk](/contact)."
  ),
  faq: [
    {
      q: todoPt("How is a skill different from a prompt?"),
      a: todoPt(
        "A prompt lasts one conversation. A skill is a folder of instructions and reference files that Claude loads on its own whenever a request matches, in every project. This one runs to about 1,200 lines, more than anyone would paste into a chat."
      ),
    },
    {
      q: todoPt("Do I need to know how to code?"),
      a: todoPt(
        "No. The skill works the same when you ask for a strategy, a flow spec or an audit of a screenshot. Claude Code runs in a terminal, but you talk to it in plain language. If you'd rather avoid the terminal, upload the skill folder to claude.ai under Customize > Skills."
      ),
    },
    {
      q: todoPt("Can AI do a UX audit? Is it reliable?"),
      a: todoPt(
        "As a first pass, yes. Studies show models find part of the real problems and flag others that don't exist: in Baymard's 2023 test, 80% of ChatGPT-4's suggestions were wrong. Treat each finding as a hypothesis, check it on the live screen, and test the important ones with users."
      ),
    },
    {
      q: todoPt("Is this a heuristic evaluation?"),
      a: todoPt(
        "Not in the strict sense. A heuristic evaluation checks a screen against a fixed list, usually Jakob Nielsen's 10 usability heuristics. This skill audits with a score out of 10 or the CLEAR scorecard, plus the laws of UX and a checklist for states, copy and accessibility. If your team needs a Nielsen heuristics report, ask for one explicitly."
      ),
    },
    {
      q: todoPt("How do I make Claude ask questions before it builds?"),
      a: todoPt(
        "Install this skill: asking is its first step, and it only skips it when you've already answered the three questions (who uses it, what problem it solves, what the constraints are). Without the skill, open your request with those three answers, or tell Claude to interview you before writing any code."
      ),
    },
    {
      q: todoPt("Does it work in Cursor or Codex?"),
      a: todoPt(
        "Yes. The install command works for agents that read the Agent Skills format, including Cursor and Codex. On claude.ai, zip the `ux-designer` folder and upload it under Customize > Skills."
      ),
    },
    {
      q: todoPt("Can I use it with the other design skills?"),
      a: todoPt(
        "That's how I use them. [ux-research](/skills/ux-research) gathers the evidence and writes the brief, ux-designer turns it into a flow, and ui-designer handles the visual craft. Each one hands off to the next and says so when another fits better. All six are in the [index](/skills)."
      ),
    },
    {
      q: todoPt("What are ELMR and CLEAR?"),
      a: todoPt(
        "Two lenses on the same screen. ELMR, from Reforge, looks at the main action: what the person should feel (Emotion), what convinces them (Logic), what makes it easy (Motivation) and what they get (Reward). CLEAR, from Growth.Design, scores the screen itself: Copy, Layout, Emphasis, Accessibility and Reward."
      ),
    },
  ],
};
