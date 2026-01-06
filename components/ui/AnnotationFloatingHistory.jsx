'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnnotation } from '@/contexts/AnnotationContext';
import clsx from 'clsx';

function ClipboardEmptyIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
    );
}

function ClipboardFullIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
    );
}

function ClipboardAddedIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>
    );
}

function XMarkIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

function CopyIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
        </svg>
    );
}

function TrashIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    );
}

const CARD_STYLES = clsx(
    "rounded-[10px] border border-[rgba(34,34,34,0.18)]",
    "bg-[linear-gradient(180deg,_#ffffff_0%,_#f5f5f5_100%)]",
    "shadow-paper-soft",
    "dark:border-[rgba(255,255,255,0.12)]",
    "dark:bg-[linear-gradient(180deg,_#1c1b1a_0%,_#11100f_100%)]",
    "dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35)]"
);

function AnnotationItem({ item, onRemove }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(item.content);
        // Could trigger toast here
    };

    const paperTitle = item.paperTitle || item.title;
    const sectionTitle = item.sectionTitle;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={clsx(CARD_STYLES, "p-3 relative group")}
        >
            <div className="flex justify-between items-start gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-widest text-base-400 font-altSans">
                    {item.type === 'highlight' ? 'Snippet' : 'Interest'}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={handleCopy} className="p-1 hover:bg-base-200 dark:hover:bg-base-800 rounded transition-colors text-base-500" title="Copy text">
                        <CopyIcon />
                    </button>
                    <button onClick={() => onRemove(item.id)} className="p-1 hover:bg-base-200 dark:hover:bg-base-800 rounded transition-colors text-base-500" title="Remove">
                        <XMarkIcon className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <p className="font-altSans text-sm leading-relaxed text-base-700 dark:text-base-300 line-clamp-4">
                {item.content}
            </p>

            {paperTitle && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block mt-2 text-[10px] text-base-400 hover:text-base-600 truncate">
                    From: {paperTitle} {sectionTitle ? ` · ${sectionTitle}` : ''}
                </a>
            )}
        </motion.div>
    );
}

export default function AnnotationFloatingHistory() {
    const { annotations, removeAnnotation, clearHistory } = useAnnotation();
    const [isOpen, setIsOpen] = useState(false);

    // Track added state
    const [justAdded, setJustAdded] = useState(false);
    const prevCountRef = useRef(annotations.length);

    useEffect(() => {
        if (annotations.length > prevCountRef.current) {
            setJustAdded(true);
            const timer = setTimeout(() => setJustAdded(false), 2000);
            return () => clearTimeout(timer);
        }
        prevCountRef.current = annotations.length;
    }, [annotations.length]);

    const handleCopyAll = () => {
        const text = annotations.map(a => {
            const paper = a.paperTitle || a.title;
            const section = a.sectionTitle ? ` - ${a.sectionTitle}` : '';
            return `${a.content}\n[${paper}${section}](${a.url})`;
        }).join('\n\n');
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4 pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-end">
                    <AnimatePresence>
                        {isOpen && annotations.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="mb-4 w-80 max-h-[60vh] flex flex-col gap-3"
                            >
                                <div className={clsx(CARD_STYLES, "p-3 flex justify-between items-center sticky top-0 z-10 shrink-0")}>
                                    <span className="text-xs font-altSans font-semibold uppercase tracking-widest text-base-500">
                                        Your Snippets
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={clearHistory}
                                            className="flex items-center gap-1.5 p-1.5 hover:bg-base-50 dark:hover:bg-base-800 rounded text-base-400 hover:text-red-500 dark:text-base-500 dark:hover:text-red-400 transition-colors"
                                            title="Clear all"
                                        >
                                            <TrashIcon className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={handleCopyAll}
                                            className="flex items-center gap-1.5 bg-white dark:bg-base-800 hover:bg-base-50 dark:hover:bg-base-700 text-[10px] font-medium uppercase tracking-wide text-base-800 dark:text-base-200 px-2.5 py-1.5 rounded border border-base-200 dark:border-base-700 transition-colors"
                                        >
                                            <CopyIcon className="w-3 h-3" />
                                            Copy All
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-y-auto pr-1 flex flex-col gap-3 pb-2">
                                    {annotations.map((item) => (
                                        <AnnotationItem key={item.id} item={item} onRemove={removeAnnotation} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => {
                            if (annotations.length > 0) setIsOpen(!isOpen);
                        }}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-transform active:scale-95",
                            "bg-white dark:bg-base-900 border border-base-200 dark:border-base-700",
                            "text-base-900 dark:text-base-100 hover:border-base-300 dark:hover:border-base-600",
                            annotations.length === 0 && "opacity-80 cursor-default"
                        )}
                    >
                        <AnimatePresence mode="wait">
                            {justAdded ? (
                                <motion.div key="added" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                                    <ClipboardAddedIcon className="w-5 h-5" />
                                </motion.div>
                            ) : annotations.length > 0 ? (
                                <motion.div key="full" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                                    <ClipboardFullIcon className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div key="empty" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                                    <ClipboardEmptyIcon className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <span className="font-altSans text-sm font-medium">
                            {annotations.length} {annotations.length === 1 ? 'Item' : 'Items'}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}
