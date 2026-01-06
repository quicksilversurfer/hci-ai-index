import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import PropTypes from "prop-types";
import SectionHeader from "./SectionHeader";

function renderMarkdown(content) {
  const html = marked.parse(content);
  return { __html: DOMPurify.sanitize(html) };
}

export default function Synthesis({ content }) {
  return (
    <section id="synthesis" className="space-y-rhythm-2">
      {/* <SectionHeader label="SYNTHESIS" className="max-w-3xl w-full mx-auto" /> */}
      <div
        className="max-w-reading mx-auto font-altSans text-base-800 dark:text-base-100 space-y-rhythm-2 text-left text-body-lg"
        dangerouslySetInnerHTML={renderMarkdown(content)}
      />
    </section>
  );
}

Synthesis.propTypes = {
  content: PropTypes.string.isRequired,
};
