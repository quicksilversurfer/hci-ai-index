import PropTypes from "prop-types";

function AgentIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
        </svg>
    );
}

AgentIcon.propTypes = {
    className: PropTypes.string,
};

export default function AgentAttribution({ paperCount }) {
    return (
        <div className="max-w-reading mx-auto px-4 lg:px-0">
            <div className="flex flex-col items-center gap-3 py-2">
                <div className="flex items-center justify-center p-1.5 rounded-full bg-base-100 dark:bg-base-900 border border-subtle type-body-smooth">
                    <AgentIcon className="w-5 h-5" />
                </div>
                <div className="text-center space-y-1">
                    <h3 className="type-label-base text-sm type-body-smooth">
                        Synthesized using AI
                    </h3>
                    <p className="font-altSans text-body-sm type-body-smooth">
                        Analyzed {paperCount} papers. AI models can occasionally hallucinate, please verify critical details.
                    </p>
                </div>
            </div>
        </div>
    );
}

AgentAttribution.propTypes = {
    paperCount: PropTypes.number.isRequired,
};
