import sanitizeHtml from "sanitize-html";
import { marked } from "marked";
import PropTypes from "prop-types";
import SectionHeader from "./SectionHeader";

function renderMarkdown(content) {
  const html = marked.parse(content);
  return { __html: sanitizeHtml(html) };
}

export default function Synthesis({ content }) {
  return (
    <section id="synthesis" className="space-y-rhythm-2">
      {/* <SectionHeader label="SYNTHESIS" className="max-w-3xl w-full mx-auto" /> */}
      <div
        className="max-w-reading mx-auto space-y-rhythm-2 text-left font-altSans text-body-md leading-relaxed type-body-smooth [&>p]:indent-8"
        dangerouslySetInnerHTML={renderMarkdown(content || "")}
      />
    </section>
  );
}

Synthesis.propTypes = {
  content: PropTypes.string.isRequired,
};

Synthesis.defaultProps = {};
