import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { blogPosts } from "../../helpers/config";
import ResponsiveMenu from "../../components/ResponsiveMenu";
import Footer from "../../components/Footer";
import ReadingProgress from "../../components/ReadingProgress";
import blog1 from "../../images/blog-1.webp";
import blog2 from "../../images/blog-2.webp";
import blog3 from "../../images/blog-3.webp";

const imageMap: Record<string, StaticImageData> = {
  "blog-1": blog1,
  "blog-2": blog2,
  "blog-3": blog3,
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: imageMap[post.image].src }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageMap[post.image].src],
    },
  };
}

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="h4"
    sx={{
      color: "common.white",
      fontFamily: "var(--font-cormorant-garamond), serif",
      fontWeight: 600,
      fontSize: { xs: "20px", md: "24px" },
      mt: 6,
      mb: 2,
    }}
  >
    {children}
  </Typography>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      color: "grey.300",
      fontFamily: "var(--font-inter), sans-serif",
      fontSize: { xs: 15, md: 17 },
      lineHeight: 1.8,
      mb: 2.5,
    }}
  >
    {children}
  </Typography>
);

const Ul = ({ items }: { items: string[] }) => (
  <Box
    component="ul"
    sx={{
      pl: 3,
      mb: 2.5,
      "& li": {
        color: "grey.300",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: { xs: 15, md: 17 },
        lineHeight: 1.8,
        mb: 1,
      },
    }}
  >
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </Box>
);

const articleContent: Record<string, React.ReactNode> = {
  "building-an-agent-toolkit-that-scales": (
    <>
      <P>
        As AI systems grow, so do the challenges of maintaining consistency
        across agent behaviors. What starts as a handful of tool definitions can
        quickly evolve into dozens of overlapping capabilities, competing
        implementations, and subtle contract mismatches spread across multiple
        agents.
      </P>
      <P>
        An agent toolkit is often viewed as a collection of tool definitions,
        but successful systems provide much more than that. They establish a
        shared contract between models and infrastructure, reduce duplicated
        logic, and create a foundation that lets agents reason and act with
        greater confidence.
      </P>

      <Heading>The Challenge of Growth</Heading>
      <P>
        Most agent systems don&apos;t begin with a dedicated toolkit. Teams move
        quickly, prioritize shipping capabilities, and optimize for short-term
        results. Over time, this often leads to multiple tools serving similar
        purposes, inconsistent return shapes, and increasing prompt complexity.
      </P>
      <P>Common symptoms include:</P>
      <Ul
        items={[
          "Several tools overlapping in purpose and scope",
          "Inconsistent response schemas across similar operations",
          "Repeated context-setting logic in every system prompt",
          "Error handling implemented differently across agents",
          "Increasing token costs as redundant context accumulates",
        ]}
      />
      <P>
        These issues rarely surface immediately. They accumulate gradually as
        the number of agents and capabilities grows.
      </P>

      <Heading>Start with Contracts</Heading>
      <P>
        Before building tools, establish foundational data contracts.
      </P>
      <P>These often include:</P>
      <Ul
        items={[
          "Canonical input and output schemas",
          "Shared error envelope formats",
          "Consistent naming conventions",
          "Authentication and authorization patterns",
          "Rate limiting and retry semantics",
          "Observability hooks",
        ]}
      />
      <P>
        By defining these primitives first, teams can build tools on top of a
        consistent foundation rather than introducing new shapes with every
        implementation.
      </P>
      <P>
        When foundational contracts are centralized, updates propagate cleanly.
        A single schema change can flow through the entire toolkit instead of
        requiring manual updates across dozens of prompts.
      </P>

      <Heading>Tools Are Products</Heading>
      <P>
        One of the most valuable mindset shifts is treating tools as products
        rather than implementation details.
      </P>
      <P>Well-designed agent tools should be:</P>
      <Ul
        items={[
          "Scoped to a single, composable responsibility",
          "Safe to call idempotently when possible",
          "Described clearly enough for a model to self-select",
          "Consistent in behavior across invocation patterns",
          "Easy for both humans and agents to adopt",
        ]}
      />
      <P>
        A tool&apos;s success isn&apos;t measured by how many parameters it
        accepts. It&apos;s measured by how reliably a model can invoke it
        correctly with minimal prompt engineering.
      </P>
      <P>
        The goal is not to create infinitely flexible tools. The goal is to
        create reliable primitives that agents can compose with confidence.
      </P>

      <Heading>Documentation That Models Can Read</Heading>
      <P>
        Even the best toolkit will underperform without clear documentation —
        and in agentic systems, the primary reader is the model itself.
      </P>
      <P>Tool descriptions should answer:</P>
      <Ul
        items={[
          "When should this tool be called?",
          "When should it not be called?",
          "What does each parameter represent?",
          "What will the response contain?",
          "What errors might occur and how should they be handled?",
        ]}
      />
      <P>
        Good descriptions reduce hallucination, lower prompt complexity, and
        help models make better decisions at inference time.
      </P>
      <P>
        More importantly, they let the toolkit evolve without requiring
        corresponding prompt rewrites.
      </P>

      <Heading>Human and Agent Collaboration</Heading>
      <P>
        Agent toolkits are most successful when they are owned collaboratively
        by the humans who build them and the agents that use them.
      </P>
      <P>
        Engineers define capability boundaries, security constraints, and
        long-term maintainability. Models surface where tooling is ambiguous,
        where schemas are confusing, and where behavior diverges from intent.
      </P>
      <P>
        Treating model failures as design feedback — rather than prompt failures
        — is one of the most powerful practices in agentic development.
      </P>
      <P>
        Strong iteration loops help ensure that tools are both technically sound
        and practically useful to the agents relying on them.
      </P>

      <Heading>Measure Reliability, Not Tool Count</Heading>
      <P>
        A common mistake is evaluating success based on the number of tools
        available.
      </P>
      <P>
        A large toolkit does not necessarily indicate a capable or reliable
        system.
      </P>
      <P>More meaningful indicators include:</P>
      <Ul
        items={[
          "Reduced tool call error rates",
          "Improved task completion across diverse prompts",
          "Lower average tokens required per successful workflow",
          "Higher tool reuse across different agent contexts",
          "Reduced incidents caused by incorrect tool selection",
        ]}
      />
      <P>
        The goal is not to build more tools. The goal is to make agent workflows
        more reliable and more consistent.
      </P>

      <Heading>Looking Ahead</Heading>
      <P>
        Agent toolkits are never truly finished. They evolve alongside model
        capabilities, product requirements, and the agents that depend on them.
      </P>
      <P>
        The most successful toolkits balance stability with extensibility. They
        provide enough structure for agents to act predictably while remaining
        adaptable to future capabilities.
      </P>
      <P>
        When approached thoughtfully, an agent toolkit becomes more than a list
        of functions. It becomes shared infrastructure that enables any model,
        on any team, to act with greater accuracy and confidence.
      </P>
    </>
  ),
  "from-models-to-platforms": (
    <>
      <P>
        Many AI initiatives begin with a simple goal: get a model to do
        something useful.
      </P>
      <P>A prompt is written to summarize documents.</P>
      <P>A tool is added to look up customer data.</P>
      <P>
        A shared pattern emerges because multiple teams need the same
        capability.
      </P>
      <P>Over time, these individual solutions begin to form something larger.</P>
      <P>A platform.</P>
      <P>
        The most impactful AI work often isn&apos;t a single model call or a
        clever prompt. It&apos;s the infrastructure that enables entire teams to
        ship agents faster, more reliably, and with greater confidence.
      </P>

      <Heading>The Evolution of Shared Systems</Heading>
      <P>Most AI platforms don&apos;t start as platforms.</P>
      <P>They begin as practical solutions to recurring problems.</P>
      <P>An agent framework starts with a few reusable tool definitions.</P>
      <P>A shared context layer begins with common prompt scaffolding.</P>
      <P>
        An orchestration system emerges from a need to chain model calls
        reliably.
      </P>
      <P>As adoption grows, these solutions become infrastructure.</P>
      <P>
        What was once built for a single agent becomes a foundation that
        supports many.
      </P>
      <P>
        The challenge shifts from solving a local problem to supporting an
        ecosystem of models and workflows.
      </P>

      <Heading>Beyond Single Inference</Heading>
      <P>Single model calls are often the first goal of AI systems.</P>
      <P>Send a prompt.</P>
      <P>Get a response.</P>
      <P>While important, single inference alone isn&apos;t enough.</P>
      <P>Successful AI platforms provide:</P>
      <Ul
        items={[
          "Consistent context management",
          "Reliable tool execution",
          "Structured output validation",
          "Observability and tracing",
          "Governance and access control",
        ]}
      />
      <P>
        Teams should not only be able to use the platform — they should want to
        use it.
      </P>
      <P>The best AI platforms make building agents feel natural.</P>

      <Heading>Reducing Complexity at Scale</Heading>
      <P>As AI systems grow, complexity increases.</P>
      <P>More agents.</P>
      <P>More models.</P>
      <P>More workflows.</P>
      <P>
        Without shared foundations, every team is forced to solve similar
        orchestration problems independently.
      </P>
      <P>This often leads to:</P>
      <Ul
        items={[
          "Duplicate prompt logic across codebases",
          "Inconsistent model behaviors between products",
          "Increased debugging costs when agents fail silently",
          "Slower iteration cycles for new AI features",
        ]}
      />
      <P>
        Platforms help centralize common concerns so teams can focus on building
        agent value rather than rebuilding inference scaffolding.
      </P>
      <P>A strong AI platform doesn&apos;t eliminate complexity.</P>
      <P>It absorbs complexity.</P>

      <Heading>Platforms as Force Multipliers</Heading>
      <P>
        One of the most powerful characteristics of platform work is leverage.
      </P>
      <P>A single agent may complete thousands of tasks.</P>
      <P>
        A platform improvement may make every agent built on top of it more
        capable.
      </P>
      <P>The impact compounds over time.</P>
      <P>
        A well-designed tool registry can unlock dozens of new agent workflows.
      </P>
      <P>
        A shared context window strategy can reduce costs across every model
        call in production.
      </P>
      <P>
        A shared foundation creates value far beyond its original
        implementation.
      </P>

      <Heading>Adoption Is the Real Measure of Success</Heading>
      <P>Platform teams often focus on what they build.</P>
      <P>The more important question is whether anyone uses it.</P>
      <P>Adoption is the clearest signal of success.</P>
      <P>Engineers naturally gravitate toward AI platforms that are:</P>
      <Ul
        items={[
          "Easy to reason about",
          "Well documented",
          "Reliable under real workloads",
          "Flexible enough to support diverse use cases",
          "Consistent in their behavior",
        ]}
      />
      <P>
        If teams continually build around a platform, the issue is rarely
        adoption itself.
      </P>
      <P>
        It&apos;s usually a sign that the platform isn&apos;t solving the right
        problems.
      </P>
      <P>The best AI platforms earn trust through reliability.</P>

      <Heading>Building for the Future</Heading>
      <P>
        One of the unique challenges of AI platform work is balancing current
        model capabilities with future model generations.
      </P>
      <P>Build too narrowly and the platform becomes model-specific.</P>
      <P>Build too abstractly and it loses practical utility.</P>
      <P>
        Finding the right balance requires understanding not only today&apos;s
        requirements, but also the trajectory of the models and agents that will
        run on top of it.
      </P>
      <P>The goal isn&apos;t to predict which model wins.</P>
      <P>It&apos;s to create foundations that can evolve alongside any of them.</P>

      <Heading>Looking Ahead</Heading>
      <P>Model calls solve immediate problems.</P>
      <P>Platforms create long-term leverage.</P>
      <P>
        The transition from one to the other is rarely defined by a single
        project. Instead, it happens gradually through thoughtful abstractions,
        shared conventions, and a commitment to reducing friction for every
        agent that comes next.
      </P>
      <P>
        The most effective AI organizations don&apos;t just deploy models.
      </P>
      <P>They build the infrastructure that makes capable agents possible.</P>
      <P>That&apos;s where platforms begin.</P>
    </>
  ),
  "designing-for-agent-experience": (
    <>
      <P>
        When teams discuss user experience, the conversation usually focuses on
        humans.
      </P>
      <P>How quickly can a user complete a task?</P>
      <P>How intuitive is the interface?</P>
      <P>How accessible is the product?</P>
      <P>
        These are important questions, but there&apos;s another consumer that
        often has a significant impact on product quality: the agent.
      </P>
      <P>
        The APIs, schemas, and prompts that models interact with every day shape
        how reliably agents can deliver value. They influence accuracy,
        consistency, error rates, and the cost of every inference call.
      </P>
      <P>
        A thoughtful agent experience doesn&apos;t just make models more
        capable. It makes the systems they power more reliable.
      </P>

      <Heading>Agent Experience Is Product Design</Heading>
      <P>Agent experience is often associated with prompt engineering.</P>
      <P>System prompts.</P>
      <P>Tool definitions.</P>
      <P>Few-shot examples.</P>
      <P>Output parsers.</P>
      <P>
        While these matter, agent experience is ultimately a design problem.
      </P>
      <P>Every tool has a model invoking it.</P>
      <P>Every API has an agent consuming it.</P>
      <P>Every schema has a model interpreting it.</P>
      <P>
        The same principles that create great human interfaces can be applied to
        the systems agents operate within.
      </P>
      <P>Clear contracts. Consistent patterns. Predictable behavior.</P>
      <P>The goal is to make the correct action the most natural action.</P>

      <Heading>Reducing Ambiguity</Heading>
      <P>Small sources of ambiguity compound quickly in agentic systems.</P>
      <P>An underspecified tool description.</P>
      <P>Inconsistent field names across similar schemas.</P>
      <P>Vague error messages.</P>
      <P>Missing examples in context.</P>
      <P>
        Individually, these problems may seem minor. Collectively, they create a
        constant source of model uncertainty.
      </P>
      <P>
        Over time, agents spend more tokens resolving ambiguity than executing
        meaningful work.
      </P>
      <P>
        Improving agent experience often means removing unnecessary
        interpretive load.
      </P>
      <P>
        When systems are unambiguous, agents can focus on reasoning instead of
        guessing.
      </P>

      <Heading>The Value of Shared Context</Heading>
      <P>
        Many agent experience improvements come from investing in shared
        context infrastructure.
      </P>
      <P>Examples include:</P>
      <Ul
        items={[
          "Canonical system prompt templates",
          "Shared tool registries with consistent schemas",
          "Structured output formats with validation",
          "Standardized error envelopes",
          "Retrieval-augmented context pipelines",
          "Prompt versioning and evaluation frameworks",
        ]}
      />
      <P>
        These investments rarely produce immediate product-facing features.
      </P>
      <P>However, they create leverage.</P>
      <P>
        A single improvement to how context is structured can reduce error rates
        across every agent that relies on it.
      </P>
      <P>The impact compounds with every model call.</P>

      <Heading>Documentation the Model Can Use</Heading>
      <P>Documentation is often treated as an afterthought.</P>
      <P>
        In agentic systems, it is one of the most important parts of the
        experience — because the model reads it at inference time.
      </P>
      <P>Good tool descriptions reduce hallucination.</P>
      <P>They help agents select the right tool for the right task.</P>
      <P>
        They accelerate reliable behavior and reduce the need for complex
        prompt scaffolding.
      </P>
      <P>
        Most importantly, they allow agent capability to scale without
        proportional prompt engineering effort.
      </P>
      <P>
        A powerful tool with a poor description often gets misused or ignored.
      </P>
      <P>
        A simpler tool with an excellent description can become the foundation
        of reliable workflows.
      </P>

      <Heading>Structured Outputs Create Momentum</Heading>
      <P>The best agent experiences remove interpretive uncertainty.</P>
      <P>
        Structured outputs allow downstream systems to process model responses
        reliably, without fragile parsing logic.
      </P>
      <P>This can take many forms:</P>
      <Ul
        items={[
          "JSON schema-constrained generation",
          "Typed function call responses",
          "Validated output envelopes",
          "Canonical state representations",
          "Deterministic tool return formats",
        ]}
      />
      <P>The goal is not structure for its own sake.</P>
      <P>The goal is creating momentum through predictability.</P>
      <P>
        Every response that arrives in a known format is one less source of
        downstream fragility.
      </P>

      <Heading>Building for Future Agents</Heading>
      <P>
        One of the most overlooked aspects of agent experience is that the
        primary beneficiaries are often future models.
      </P>
      <P>The next-generation model that inherits your tool definitions.</P>
      <P>The new agent built on top of the same context pipeline.</P>
      <P>
        The workflow trying to compose capabilities that weren&apos;t designed
        to work together.
      </P>
      <P>
        Thoughtful systems create reliability long after the original
        implementation is complete.
      </P>
      <P>
        Good agent experience is an investment in future model performance.
      </P>

      <Heading>Looking Ahead</Heading>
      <P>Models evolve quickly.</P>
      <P>Capabilities expand.</P>
      <P>Expectations grow.</P>
      <P>
        The AI organizations that scale most effectively are often the ones that
        treat agent experience as a first-class concern — not an afterthought
        addressed through increasingly complex prompts.
      </P>
      <P>
        When agents can act correctly with confidence, everyone benefits.
      </P>
      <P>Products become more reliable.</P>
      <P>Costs decrease.</P>
      <P>Users receive better outcomes.</P>
      <P>
        Agent experience is ultimately about removing friction between a model
        and a correct action.
      </P>
      <P>
        The clearer the path, the more capable the agents that walk it.
      </P>
    </>
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = articleContent[slug];

  return (
    <>
      <ReadingProgress />
      <ResponsiveMenu />

      {/* Hero image — full bleed, nav overlays it */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 280, sm: 380, md: 500 },
          overflow: "hidden",
          "&:hover img": { transform: "scale(1.08)" },
        }}
      >
        <Image
          src={imageMap[post.image]}
          alt={post.title}
          fill
          priority
          style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
          sizes="100vw"
        />
        {/* Gradient fades image into page background */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(5,5,7,0.3) 0%, rgba(5,5,7,0.0) 20%, rgba(5,5,7,0.4) 50%, rgba(5,5,7,0.9) 75%, rgba(5,5,7,1) 88%)",
          }}
        />
      </Box>

      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          pb: { xs: 10, md: 16 },
        }}
      >
        <Container sx={{ maxWidth: "740px !important" }}>
          {/* Back link */}
          <Link
            href="/#blog"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              color: "grey.500",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 14,
              fontWeight: 500,
              mb: 6,
              "& .arrow": { transition: "transform 0.3s" },
              "&:hover": {
                color: "grey.300",
                "& .arrow": { transform: "translateX(-4px)" },
              },
            }}
          >
            <Box component="span" className="arrow" aria-hidden>
              ←
            </Box>{" "}
            Back
          </Link>

          {/* Article header */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography
                sx={{
                  color: "primary.main",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                {post.category}
              </Typography>
              <Typography
                sx={{
                  color: "grey.600",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                · {post.readTime} min read
              </Typography>
              {post.date && (
                <Typography
                  sx={{
                    color: "grey.600",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  · {post.date}
                </Typography>
              )}
            </Box>

            <Typography
              variant="h2"
              sx={{
                color: "common.white",
                fontSize: { xs: "28px", md: "40px" },
                lineHeight: 1.15,
                mb: 3,
              }}
            >
              {post.title}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "grey.400",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 12,
                    borderRadius: "999px",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.08)",
              mb: 6,
            }}
          />

          {/* Article body */}
          <Box>{content}</Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
