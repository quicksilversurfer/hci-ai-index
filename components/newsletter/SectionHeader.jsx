import clsx from "clsx";
import PropTypes from "prop-types";

export default function SectionHeader({ label, count, className = "" }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-start gap-2 text-left uppercase tracking-widest text-ui font-semibold font-altSans text-hci-secondary dark:text-base-300",
        className
      )}
    >
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className="text-base-500 dark:text-base-400">({count})</span>
      ) : null}
    </div>
  );
}

SectionHeader.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
  className: PropTypes.string,
};
