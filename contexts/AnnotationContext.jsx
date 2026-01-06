'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AnnotationContext = createContext();

export function AnnotationProvider({ children }) {
    const [annotations, setAnnotations] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from session storage on mount
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem('hci_index_annotations');
            if (stored) {
                setAnnotations(JSON.parse(stored));
            }
        } catch (e) {
            console.warn('Failed to load annotations from session storage', e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save to session storage whenever annotations change
    useEffect(() => {
        if (!isLoaded) return;
        try {
            sessionStorage.setItem('hci_index_annotations', JSON.stringify(annotations));
        } catch (e) {
            console.warn('Failed to save annotations to session storage', e);
        }
    }, [annotations, isLoaded]);

    const addAnnotation = useCallback((annotation) => {
        // metadata: { url, title, etc. }
        // type: 'highlight' | 'hover'
        // content: string
        const newAnnotation = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            ...annotation,
        };

        setAnnotations((prev) => {
            // Prevent duplicates for all types
            const exists = prev.some(a => a.content === annotation.content && a.type === annotation.type);
            if (exists) return prev;

            // Newest first
            return [newAnnotation, ...prev];
        });
    }, []);

    const removeAnnotation = useCallback((id) => {
        setAnnotations((prev) => prev.filter((a) => a.id !== id));
    }, []);

    const clearHistory = useCallback(() => {
        setAnnotations([]);
    }, []);

    return (
        <AnnotationContext.Provider
            value={{
                annotations,
                addAnnotation,
                removeAnnotation,
                clearHistory,
            }}
        >
            {children}
        </AnnotationContext.Provider>
    );
}

export function useAnnotation() {
    const context = useContext(AnnotationContext);
    if (!context) {
        throw new Error('useAnnotation must be used within an AnnotationProvider');
    }
    return context;
}
