"use client";
// Client wrapper for any interactive enhancements later (currently pure presentational)
// Accepts a fully shaped newsletter JSON object (see newsletter-*.json in public/data)
import Synthesis from "./Synthesis";

export default function NewsletterDetail({ newsletter }) {
  if (!newsletter) return null;
  const paperIndex = buildPaperIndex(newsletter);

  return (
    <div className="space-y-16 font-sans">
      <div className="overflow-hidden rounded-3xl bg-[#D5EDD1] p-8 sm:p-10 md:p-12 shadow-sm ring-1 ring-black/5">
        <Header newsletter={newsletter} />
      </div>
      <Legend newsletter={newsletter} paperIndex={paperIndex} />
      <Synthesis content={newsletter.synthesis?.content} />
      <FeaturedPapers papers={newsletter.featured_papers || []} />
      <EmergingThemes
        themes={newsletter.emerging_themes || []}
        paperIndex={paperIndex}
      />
      {newsletter.topic_overview && (
        <TopicOverview overview={newsletter.topic_overview} />
      )}
      {newsletter.observed_patterns && (
        <ObservedPatterns
          patterns={newsletter.observed_patterns}
          paperIndex={paperIndex}
        />
      )}
      {newsletter.challenging_assumptions && (
        <ChallengingAssumptions
          items={newsletter.challenging_assumptions}
          paperIndex={paperIndex}
        />
      )}
      {newsletter.resources_spotted?.resources && (
        <Resources resources={newsletter.resources_spotted.resources} />
      )}
      {newsletter.further_reading && (
        <FurtherReading
          list={newsletter.further_reading}
          paperIndex={paperIndex}
        />
      )}
      {newsletter.reflection_prompt && (
        <ReflectionPrompt prompt={newsletter.reflection_prompt} />
      )}
      {newsletter.stats && <Stats stats={newsletter.stats} />}
      {newsletter.curation_meta && (
        <CurationMeta meta={newsletter.curation_meta} />
      )}
    </div>
  );
}

function Section({ title, children, id }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h3 className="font-mono text-base dark:text-base-500 text-base-600 mb-8 pt-4 mt-16 border-t uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </section>
  );
}

// Helper to render a paper title with URL / PDF if present and highlight problems
function PaperTitle({ paper, size = "md" }) {
  const hasUrl = !!paper?.url || !!paper?.pdf_url || !!paper?.assets?.pdf;
  const title = paper?.title?.trim();
  const hasTitle = !!title;
  const textBase =
    size === "lg"
      ? "text-xl font-medium"
      : size === "sm"
      ? "text-sm"
      : "text-base";
  const problem = !hasTitle || !hasUrl;
  const color = problem
    ? "text-amber-700 dark:text-amber-400"
    : "text-base-700 dark:text-base-300";
  const wrapperClasses = `${textBase} ${color} font-sans flex items-center gap-2`;

  const url = paper?.url || paper?.pdf_url || paper?.assets?.pdf;

  return (
    <div className={wrapperClasses}>
      {hasUrl && title ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline break-words"
        >
          {title}
        </a>
      ) : (
        <span className={!hasTitle ? "italic" : undefined}>
          {title || "<missing title>"}
        </span>
      )}
      {!hasUrl && (
        <span className="text-[10px] uppercase tracking-wide bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
          No Link
        </span>
      )}
      {!hasTitle && (
        <span className="text-[10px] uppercase tracking-wide bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 px-1.5 py-0.5 rounded">
          No Title
        </span>
      )}
      {paper?.pdf_url && hasUrl && (
        <a
          href={paper.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded hover:underline"
        >
          PDF
        </a>
      )}
    </div>
  );
}

function Legend({ newsletter, paperIndex }) {
  const hasProblems = Object.values(paperIndex).some(
    (p) => !p.title?.trim() || !p.url
  );
  if (!hasProblems) return null;
  return (
    <div className="text-xs flex flex-wrap gap-3 items-center bg-base-50 dark:bg-base-900 border border-dashed border-base-200 dark:border-base-700 p-3 rounded-md font-sans">
      <span className="font-mono text-base-500 dark:text-base-400">
        Legend:
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-amber-200 dark:bg-amber-800 inline-block" />
        <span className="text-base-600 dark:text-base-400">
          Missing link (using inferred fallback)
        </span>
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-rose-200 dark:bg-rose-800 inline-block" />
        <span className="text-base-600 dark:text-base-400">
          Missing title (placeholder shown)
        </span>
      </span>
    </div>
  );
}

// Build a quick index of paper metadata from all sections
function buildPaperIndex(newsletter) {
  const index = {};
  const add = (p) => {
    if (!p || !p.id) return;
    if (!index[p.id]) index[p.id] = { id: p.id };
    Object.assign(index[p.id], p);
  };
  newsletter.featured_papers?.forEach(add);
  newsletter.further_reading?.forEach(add);
  newsletter.emerging_themes?.forEach((t) => t.paper_ids?.forEach(add));
  newsletter.observed_patterns?.forEach((pat) => pat.where_seen?.forEach(add));
  newsletter.challenging_assumptions?.forEach((c) => c.paper_ids?.forEach(add));
  const topPapers = newsletter.topic_overview?.top_papers;
  topPapers?.forEach(add);

  // Enrich with arXiv heuristics where missing
  for (const id of Object.keys(index)) {
    const entry = index[id];
    if (isArxivId(id)) {
      if (!entry.url) entry.url = `https://arxiv.org/abs/${id}`;
      if (!entry.pdf_url && !entry.assets?.pdf)
        entry.pdf_url = `https://arxiv.org/pdf/${id}.pdf`;
    }
  }
  return index;
}

function isArxivId(id) {
  return /^(\d{4}\.(\d{4,5}))(v\d+)?$/.test(id);
}

function Header({ newsletter }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-display text-5xl mb-4 text-base-950 dark:text-base-50">
            {newsletter.headline?.title}
          </h1>
          <p className="text-xl text-base-700 dark:text-base-300 mb-4 font-sans">
            {newsletter.headline?.subtitle}
          </p>
        </div>
        <div className="text-right text-sm text-base-500 dark:text-base-400">
          <div className="font-mono">{newsletter.issue_id}</div>
          {newsletter.run_date_utc && (
            <div>{new Date(newsletter.run_date_utc).toLocaleDateString()}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeaturedPapers({ papers }) {
  if (!papers.length) return null;
  return (
    <Section title="Featured Papers">
      <div className="space-y-6">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="border border-base-200 dark:border-base-800 rounded-lg p-6"
          >
            <PaperTitle paper={paper} size="lg" />
            {paper.authors && (
              <p className="text-base-600 dark:text-base-400 mb-3 font-sans">
                {paper.authors.join(", ")}
              </p>
            )}
            {paper.finding && (
              <p className="text-base-700 dark:text-base-300 mb-4 font-sans">
                {paper.finding}
              </p>
            )}
            {paper.why_it_matters && (
              <p className="text-sm text-base-600 dark:text-base-400 mb-4 font-sans">
                <strong>Why it matters:</strong> {paper.why_it_matters}
              </p>
            )}
            {paper.design_consideration && (
              <p className="text-sm text-base-600 dark:text-base-400 mb-4 font-sans">
                <strong>Design consideration:</strong>{" "}
                {paper.design_consideration}
              </p>
            )}
            {paper.caveat && (
              <p className="text-sm text-base-500 dark:text-base-500 mb-4 font-sans">
                <strong>Caveat:</strong> {paper.caveat}
              </p>
            )}
            {paper.tags?.length && (
              <div className="flex flex-wrap gap-2 mb-4">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-base-100 dark:bg-base-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {paper.questions_opened?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-base-700 dark:text-base-300 mb-2">
                  Questions Opened:
                </h4>
                <ul className="text-sm text-base-600 dark:text-base-400 space-y-1 font-sans">
                  {paper.questions_opened.map((q, i) => (
                    <li key={i}>• {q}</li>
                  ))}
                </ul>
              </div>
            )}
            {paper.assets?.pdf && (
              <a
                href={paper.assets.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View PDF →
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function EmergingThemes({ themes, paperIndex }) {
  if (!themes.length) return null;
  return (
    <Section title="Emerging Themes">
      <div className="space-y-6">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className="border border-base-200 dark:border-base-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-medium mb-3 text-base-950 dark:text-base-50">
              {theme.name}
            </h3>
            <p className="text-base-700 dark:text-base-300 mb-4 font-sans">
              {theme.description}
            </p>
            <div className="text-sm text-base-600 dark:text-base-400 mb-3 font-sans">
              {theme.paper_count} paper{theme.paper_count !== 1 && "s"} in theme
            </div>
            {theme.paper_ids?.length > 0 && (
              <ul className="mt-2 space-y-2 font-sans">
                {theme.paper_ids.map((p) => {
                  const enriched = paperIndex[p.id] || p;
                  return (
                    <li
                      key={p.id}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1"
                    >
                      <span className="font-mono text-[10px] text-base-500 dark:text-base-400 mr-2 shrink-0 opacity-70">
                        {p.id}
                      </span>
                      <PaperTitle paper={enriched} size="sm" />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function TopicOverview({ overview }) {
  if (!overview?.topic_distribution) return null;
  return (
    <Section title="Topic Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {Object.entries(overview.topic_distribution).map(([topic, data]) => (
          <div
            key={topic}
            className="border border-base-200 dark:border-base-800 rounded-lg p-4"
          >
            <h3 className="font-medium text-base-950 dark:text-base-50 mb-2">
              {topic
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </h3>
            <p className="text-2xl font-bold text-base-700 dark:text-base-300 mb-2">
              {data.paper_count} papers
            </p>
            <p className="text-sm text-base-600 dark:text-base-400 line-clamp-3">
              {data.summary}
            </p>
          </div>
        ))}
      </div>
      <p className="text-base-700 dark:text-base-300">{overview.summary}</p>
    </Section>
  );
}

function ObservedPatterns({ patterns, paperIndex }) {
  if (!patterns.length) return null;
  return (
    <Section title="Observed Patterns">
      <div className="space-y-6">
        {patterns.map((pattern) => (
          <div
            key={pattern.name}
            className="border border-base-200 dark:border-base-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-medium mb-3 text-base-950 dark:text-base-50">
              {pattern.name}
            </h3>
            <p className="text-base-700 dark:text-base-300 mb-4 font-sans">
              {pattern.description}
            </p>
            {pattern.where_seen?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-base-700 dark:text-base-300">
                  Examples:
                </h4>
                <ul className="text-sm text-base-600 dark:text-base-400 space-y-1 font-sans">
                  {pattern.where_seen.map((ex) => {
                    const enriched = paperIndex[ex.id] || ex;
                    return (
                      <li key={ex.id} className="flex gap-2">
                        <span className="text-base-400 dark:text-base-500 select-none">
                          •
                        </span>
                        <div className="flex flex-wrap gap-2 items-center">
                          <PaperTitle paper={enriched} size="sm" />
                          <span className="font-mono text-[10px] text-base-500 dark:text-base-500 opacity-60">
                            ({ex.id})
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function ChallengingAssumptions({ items, paperIndex }) {
  if (!items.length) return null;
  return (
    <Section title="Challenging Assumptions">
      <div className="space-y-6">
        {items.map((item, idx) => (
          <div
            key={item.title || idx}
            className="border border-base-200 dark:border-base-800 rounded-lg p-6"
          >
            {item.title && (
              <h3 className="text-xl font-medium mb-3 text-base-950 dark:text-base-50">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-base-700 dark:text-base-300 mb-4 font-sans">
                {item.description}
              </p>
            )}
            {item.paper_ids?.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-base-700 dark:text-base-300">
                  Papers:
                </h4>
                <ul className="space-y-1">
                  {item.paper_ids.map((p) => {
                    const enriched = paperIndex[p.id] || p;
                    return (
                      <li
                        key={p.id}
                        className="flex gap-2 items-start text-sm text-base-600 dark:text-base-400"
                      >
                        <span className="text-base-400 dark:text-base-500 select-none">
                          •
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <PaperTitle paper={enriched} size="sm" />
                          <span className="font-mono text-[10px] text-base-500 dark:text-base-500 opacity-60">
                            {p.id}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Resources({ resources }) {
  if (!resources.length) return null;
  return (
    <Section title="Resources Spotted">
      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.name}
            className="border border-base-200 dark:border-base-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-medium text-base-950 dark:text-base-50">
                {resource.name}
              </h3>
              {resource.type && (
                <span className="px-2 py-1 bg-base-100 dark:bg-base-800 text-xs rounded">
                  {resource.type}
                </span>
              )}
            </div>
            <p className="text-base-700 dark:text-base-300 mb-3 font-sans">
              {resource.description}
            </p>
            {resource.from_paper && (
              <p className="text-sm text-base-600 dark:text-base-400">
                From paper: {resource.from_paper}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function FurtherReading({ list, paperIndex }) {
  if (!list.length) return null;
  return (
    <Section title="Further Reading">
      <div className="space-y-4">
        {list.map((reading) => (
          <div
            key={reading.id}
            className="border border-base-200 dark:border-base-800 rounded-lg p-4"
          >
            <PaperTitle paper={paperIndex[reading.id] || reading} />
            {reading.short_desc && (
              <p className="text-sm text-base-600 dark:text-base-400 mb-3 font-sans">
                {reading.short_desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function ReflectionPrompt({ prompt }) {
  if (!prompt) return null;
  return (
    <Section title="Reflection Prompt">
      <div className="border border-base-200 dark:border-base-800 rounded-lg p-6 bg-base-50 dark:bg-base-900">
        <h3 className="text-xl font-medium mb-4 text-base-950 dark:text-base-50">
          {prompt.title}
        </h3>
        <p className="text-base-700 dark:text-base-300 mb-6 font-sans">
          {prompt.description}
        </p>
        {prompt.considerations?.length > 0 && (
          <div>
            <h4 className="font-medium text-base-950 dark:text-base-50 mb-3">
              Considerations:
            </h4>
            <ul className="space-y-2">
              {prompt.considerations.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-base-400 dark:text-base-500 mt-1">
                    •
                  </span>
                  <p className="text-base-700 dark:text-base-300">{c}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}

function Stats({ stats }) {
  if (!stats) return null;
  const { featured, hot_topics, key_venues } = stats;
  return (
    <Section title="Stats">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="border border-base-200 dark:border-base-800 rounded-lg p-4">
          <h3 className="font-medium text-base-950 dark:text-base-50 mb-2">
            Featured Count
          </h3>
          <p className="text-3xl font-bold text-base-700 dark:text-base-300">
            {featured ?? 0}
          </p>
        </div>
        <div className="border border-base-200 dark:border-base-800 rounded-lg p-4">
          <h3 className="font-medium text-base-950 dark:text-base-50 mb-2">
            Hot Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {hot_topics?.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-base-100 dark:bg-base-800 text-xs rounded"
              >
                {t}
              </span>
            )) || <span className="text-sm text-base-600">—</span>}
          </div>
        </div>
        <div className="border border-base-200 dark:border-base-800 rounded-lg p-4">
          <h3 className="font-medium text-base-950 dark:text-base-50 mb-2">
            Key Venues
          </h3>
          <div className="flex flex-wrap gap-2">
            {key_venues?.map((v) => (
              <span
                key={v}
                className="px-2 py-1 bg-base-100 dark:bg-base-800 text-xs rounded"
              >
                {v}
              </span>
            )) || <span className="text-sm text-base-600">—</span>}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CurationMeta({ meta }) {
  if (!meta) return null;
  const { models, weights, selection_log_s3 } = meta;
  return (
    <Section title="Curation Meta">
      <div className="border border-dashed border-base-300 dark:border-base-700 rounded-lg p-6 text-sm space-y-4">
        {models && (
          <div>
            <h3 className="font-medium mb-2 text-base-700 dark:text-base-300">
              Models Used
            </h3>
            <ul className="space-y-1">
              {Object.entries(models).map(([role, name]) => (
                <li key={role} className="font-mono">
                  {role}:{" "}
                  <span className="text-base-600 dark:text-base-400">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {weights && (
          <div>
            <h3 className="font-medium mb-2 text-base-700 dark:text-base-300">
              Weights
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(weights).map(([k, v]) => (
                <span
                  key={k}
                  className="px-2 py-1 bg-base-100 dark:bg-base-800 rounded text-xs font-mono"
                >
                  {k}: {v}
                </span>
              ))}
            </div>
          </div>
        )}
        {selection_log_s3 && (
          <div>
            <h3 className="font-medium mb-2 text-base-700 dark:text-base-300">
              Selection Log
            </h3>
            <p className="font-mono break-all text-base-600 dark:text-base-400">
              {selection_log_s3}
            </p>
          </div>
        )}
        <p className="text-xs text-base-500 dark:text-base-500">
          This metadata documents how the newsletter content was generated and
          weighted. It’s mainly useful for transparency & reproducibility.
        </p>
      </div>
    </Section>
  );
}
