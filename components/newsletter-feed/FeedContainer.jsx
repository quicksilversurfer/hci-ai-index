import MonthGroup from "@/components/newsletter-feed/MonthGroup";
import YearSection from "@/components/newsletter-feed/YearSection";
import { MONTH_ORDER } from "@/utils/monthColors";

function groupIssuesByYearAndMonth(issues) {
  const ordered = [...issues].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const grouped = ordered.reduce((acc, issue) => {
    const year = issue.year;
    const monthKey = issue.month.toUpperCase();

    if (!acc.has(year)) {
      acc.set(year, new Map());
    }

    const months = acc.get(year);
    if (!months.has(monthKey)) {
      months.set(monthKey, { issues: [], papersReviewed: 0 });
    }

    const monthData = months.get(monthKey);
    monthData.issues.push(issue);
    monthData.papersReviewed += issue.total_papers_reviewed || 0;
    return acc;
  }, new Map());

  return grouped;
}

export default function FeedContainer({ issues }) {
  const grouped = groupIssuesByYearAndMonth(issues);

  return (
    <div className="w-full space-y-12">
      {[...grouped.entries()].map(([year, months]) => {
        // Sort months inside the year
        const sortedMonths = [...MONTH_ORDER].reverse().filter(m => months.has(m)).map(m => ({
          month: m,
          ...months.get(m)
        }));

        return (
          <YearSection key={year} year={year}>
            {sortedMonths.map((monthData) => (
              <MonthGroup
                key={`${year}-${monthData.month}`}
                month={monthData.month}
                year={Number(year)}
                issues={monthData.issues}
                papersReviewed={monthData.papersReviewed}
              />
            ))}
          </YearSection>
        );
      })}
    </div>
  );
}
