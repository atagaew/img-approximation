import React, {useState} from "react";
import {WordAnalysis} from "../interfaces/WordAnalysis";
import {Accordion} from "react-bootstrap";
import {AnalysisHistoryItem} from "./AnalysisHistoryItem";

export const AnalysisHistory: React.FC<{
    analysisHistory: WordAnalysis[],
    onStartNewAnalysis: () => void
}> = ({analysisHistory, onStartNewAnalysis}) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (itemId: string) => {
        setOpenItems((prevOpenItems) =>
            prevOpenItems.includes(itemId)
                ? prevOpenItems.filter((id) => id !== itemId)
                : [...prevOpenItems, itemId]
        );
    };

    return (
        <div className="container mt-4">
            <div className="row mb-3">
                <section>
                    <h2>Analysis history</h2>
                    <Accordion defaultActiveKey="1">
                        {analysisHistory.map((wordAnalysis) => (
                            <AnalysisHistoryItem
                                key={wordAnalysis.id}
                                wordAnalysis={wordAnalysis}
                                isOpen={openItems.includes(wordAnalysis.id)}
                                toggle={() => toggleItem(wordAnalysis.id)}
                            />
                        ))}
                    </Accordion>
                </section>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <button type="button" className="btn btn-primary"
                            onClick={onStartNewAnalysis}>New
                    </button>
                </div>
            </div>
        </div>

    );
};