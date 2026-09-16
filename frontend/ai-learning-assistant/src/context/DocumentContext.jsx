import { createContext, useContext, useMemo, useState } from "react";

const DocumentContext = createContext(null);

const initialDocuments = [
    {
        id: 1,
        name: "Machine Learning Notes.pdf",
        size: "2.4 MB",
        date: "Sep 2, 2026",
        file: null,
        text: "",
    },
    {
        id: 2,
        name: "Python Fundamentals.pdf",
        size: "1.8 MB",
        date: "Sep 1, 2026",
        file: null,
        text: "",
    },
    {
        id: 3,
        name: "Database Management Systems.pdf",
        size: "3.2 MB",
        date: "Aug 30, 2026",
        file: null,
        text: "",
    },
    {
        id: 4,
        name: "Artificial Intelligence.pdf",
        size: "4.1 MB",
        date: "Aug 28, 2026",
        file: null,
        text: "",
    },
];

export function DocumentProvider({ children }) {
    const [documents, setDocuments] = useState(initialDocuments);

    const addDocument = (file, text = "") => {
        const newDocument = {
            id: Date.now(),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            file,
            text,
        };

        setDocuments((prev) => [newDocument, ...prev]);

        return newDocument;
    };

    const getDocumentById = (id) => {
        return documents.find(
            (document) => String(document.id) === String(id)
        );
    };

    const value = useMemo(
        () => ({
            documents,
            addDocument,
            getDocumentById,
        }),
        [documents]
    );

    return (
        <DocumentContext.Provider value={value}>
            {children}
        </DocumentContext.Provider>
    );
}

export function useDocuments() {
    return useContext(DocumentContext);
}