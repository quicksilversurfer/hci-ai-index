'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnnotation } from '@/contexts/AnnotationContext';

function ShareIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function PlusIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
            {...props}
        >
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
    )
}


export default function TextSelectionShare({ targetRef, paperTitle }) {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0, selectionRect: null });
    const { addAnnotation } = useAnnotation();

    // Rail offset from the container's right edge
    const RAIL_OFFSET_X = 40;

    const findSectionTitle = (node) => {
        let current = node;
        // Traverse upwards to find a container, then backwards for a heading
        // Or simply traverse previous siblings and parents' previous siblings
        // Limiting search depth/scope is important for performance

        // Simple strategy: Look for the nearest preceding H1-H6
        // We'll walk up the DOM tree from the selection trigger
        while (current && current !== document.body) {
            // Check previous siblings
            let sibling = current.previousElementSibling;
            while (sibling) {
                if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(sibling.tagName)) {
                    return sibling.textContent;
                }
                // If the sibling has children, we might want to search down into them (last child),
                // but that can be expensive. Let's stick to top-level headers for now.
                // Or maybe we just check if the sibling ITSELF matches criteria.
                sibling = sibling.previousElementSibling;
            }
            current = current.parentElement;
        }
        return null; // No section found
    };

    const handleSelection = useCallback(() => {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            setShow(false);
            return;
        }

        // Check if selection is within the target ref
        if (targetRef && targetRef.current && !targetRef.current.contains(selection.anchorNode)) {
            const range = selection.getRangeAt(0);
            if (!targetRef.current.contains(range.commonAncestorContainer)) {
                setShow(false);
                return;
            }
        } else if (targetRef && !targetRef.current) {
            return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Calculate position based on the CONTAINER'S right edge, not the selection's right edge.
        // This creates the "Rail" effect.
        const containerRect = targetRef.current.getBoundingClientRect();

        // Check if the selection is far enough visible (avoid tiny selections triggering UI)
        if (rect.width < 5) return;

        setPosition({
            x: containerRect.right + RAIL_OFFSET_X,
            y: rect.top + rect.height / 2, // Vertically center on selection
            selectionRect: {
                right: rect.right,
                centerY: rect.top + rect.height / 2,
            },
            content: selection.toString(),
            anchorNode: selection.anchorNode, // Save for section detection
        });
        setShow(true);

    }, [targetRef]);

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelection);
        window.addEventListener('resize', handleSelection);
        window.addEventListener('scroll', handleSelection, { capture: true });

        return () => {
            document.removeEventListener('selectionchange', handleSelection);
            window.removeEventListener('resize', handleSelection);
            window.removeEventListener('scroll', handleSelection, { capture: true });
        };
    }, [handleSelection]);

    const handleSave = () => {
        const selection = window.getSelection();
        const text = selection.toString();

        if (text) {
            const sectionTitle = position.anchorNode ? findSectionTitle(position.anchorNode) : null;

            addAnnotation({
                type: 'highlight',
                content: text,
                title: paperTitle || document.title, // Use prop if available
                paperTitle: paperTitle || document.title, // Standardized key
                sectionTitle: sectionTitle,
                url: window.location.href,
            });

            // Clear selection to hide UI and give feedback
            selection.removeAllRanges();
            setShow(false);
        }
    };

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {show && position.selectionRect && (
                <>
                    {/* The Connected Line */}
                    <motion.svg
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        exit={{ opacity: 0, pathLength: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            pointerEvents: 'none',
                            zIndex: 49,
                            overflow: 'visible'
                        }}
                    >
                        {/* 
                    Curve from selection end to button.
                    Control points adjusted for a nice "S" curve or straight connection.
                */}
                        <path
                            d={`M ${position.selectionRect.right} ${position.selectionRect.centerY} 
                       C ${position.selectionRect.right + 20} ${position.selectionRect.centerY}, 
                         ${position.x - 20} ${position.y}, 
                         ${position.x} ${position.y}`}
                            fill="none"
                            stroke="currentColor"
                            className="text-base-300 dark:text-base-700"
                            strokeWidth="1"
                            strokeDasharray="4 2" // Dashed line for a more 'annotation' feel
                        />
                    </motion.svg>

                    {/* The Capture Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{
                            position: 'fixed',
                            top: position.y,
                            left: position.x,
                            zIndex: 50,
                            transform: 'translate(0, -50%)',
                        }}
                        className="flex items-center gap-2 group -mt-4 pl-2" // pl-2 as anchor point
                        onClick={handleSave}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <div className="bg-white dark:bg-base-900 border border-base-200 dark:border-base-800 shadow-sm rounded-full p-2 text-base-400 hover:text-base-900 dark:text-base-500 dark:hover:text-base-50 transition-all duration-300 hover:scale-110 hover:shadow-md">
                            <PlusIcon />
                        </div>

                        {/* Text Label */}
                        <span className="text-xs font-altSans font-medium text-base-400 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                            Save snippet
                        </span>
                    </motion.button>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
