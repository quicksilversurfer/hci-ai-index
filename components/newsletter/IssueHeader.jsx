import PropTypes from "prop-types";

function formatIssue(issueId) {
  if (!issueId) return "";
  const [yearStr, weekStr] = issueId.split("-W");
  const year = Number(yearStr);
  const week = Number(weekStr);
  if (Number.isNaN(year) || Number.isNaN(week)) return issueId;

  const base = new Date(year, 0, 1 + (week - 1) * 7);
  const month = base.toLocaleString("en-US", { month: "long" });
  return `Week ${week} / ${month} ${year}`;
}

export default function IssueHeader({ issueId, title, subtitle }) {
  return (
    <header className="flex flex-col space-y-rhythm-4 text-center max-w-reading mx-auto mt-24">
      <div className="type-label-mono font-bold type-body-smooth">
        {formatIssue(issueId)}
      </div>
      <h1 className="font-altDisplay text-display-0 font-thin leading-tight type-body-strong tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="font-altSans text-2xl type-body-smooth text-balance">
          {subtitle}
        </p>
      )}
    </header>
  );
}

IssueHeader.propTypes = {
  issueId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
