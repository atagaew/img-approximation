import React from "react";
import {WordAnalysis} from "../interfaces/WordAnalysis";

export const  AnalysisHistoryItem: React.FC<{
    wordAnalysis: WordAnalysis;
    isOpen: boolean;
    toggle: () => void;
}> = ({wordAnalysis, isOpen, toggle}) => {

    const formattedDate = new Date(wordAnalysis.creationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 12-hour format
    });
    
    return (
        <div className="card">
            <div className="card-header" id={`heading${wordAnalysis.id}`}>
                <h5 className="mb-0">
                    <button
                        className="btn btn-link"
                        onClick={toggle}
                        aria-expanded={isOpen}
                        aria-controls={`collapse${wordAnalysis.id}`}
                    >
                        {`${wordAnalysis.title} - ${formattedDate}`}
                    </button>
                </h5>
            </div>
            <div
                id={`collapse${wordAnalysis.id}`}
                className={`collapse ${isOpen ? 'show' : ''}`}
                aria-labelledby={`heading${wordAnalysis.id}`}
            >
                <div className="card-body">{wordAnalysis.finalIdea}</div>
            </div>
        </div>
    );
};