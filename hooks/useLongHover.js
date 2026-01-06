import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * useLongHover
 * Triggers a callback after an element has been hovered for `duration` ms.
 * @param {Function} callback - Function to call on long hover.
 * @param {number} duration - Duration in ms (default 2000).
 * @returns {Object} { onMouseEnter, onMouseLeave } props to spread onto the element.
 */
export function useLongHover(callback, duration = 2000) {
    const timerRef = useRef(null);
    const [hasTriggered, setHasTriggered] = useState(false);

    const onMouseEnter = useCallback(() => {
        setHasTriggered(false);
        timerRef.current = setTimeout(() => {
            if (callback) {
                callback();
                setHasTriggered(true);
            }
        }, duration);
    }, [callback, duration]);

    const onMouseLeave = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return { onMouseEnter, onMouseLeave, hasTriggered };
}
