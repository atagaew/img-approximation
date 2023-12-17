import { Word } from "../interfaces/Word";
import React, { useState } from 'react';
import { WordAnalysis } from "../interfaces/WordAnalysis";

interface WordsSelectorProps {
    initialWordsToSelect: Word[];
    onInitialWordsSelected: (words: Word[]) => void;
}

const WordsSelector: React.FC<WordsSelectorProps> = ({ initialWordsToSelect, onInitialWordsSelected }) => {
    const [wordsToSelect, setWordsToSelect] = useState<Word[]>(initialWordsToSelect);

    const groupWordsByLine = (words: Word[]) => {
        return words.reduce((groupedWords, word) => {
            const lineNumber = word.lineNumber;
            if (!groupedWords[lineNumber]) {
                groupedWords[lineNumber] = [];
            }
            groupedWords[lineNumber].push(word);
            return groupedWords;
        }, {} as Record<number, Word[]>);
    };

    const wordsGrouped = groupWordsByLine(wordsToSelect);
    const onSelectWord = (selectedWord: Word) => {
        setWordsToSelect((prevWordsToSelect) => {
            return prevWordsToSelect.map((word) => word.value === selectedWord.value ? { ...word, isSelected: !selectedWord.isSelected } : word);
        }
        );
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <section>
                    <h2>Select words to analyze</h2>
                    <div className="col-md-6 text-left">
                        {Object.keys(wordsGrouped).map(lineNumberString => {
                            const lineNumber = parseInt(lineNumberString, 10);
                            return (
                                <p key={lineNumber}>
                                    {wordsGrouped[lineNumber].map(word => (
                                        <button
                                            key={word.id}
                                            type="button"
                                            className={`btn ${word.isSelected ? 'btn-info' : 'btn-light'}`}
                                            onClick={() => onSelectWord(word)}>
                                            {word.value}
                                        </button>
                                    ))}
                                </p>
                            );
                        })}
                    </div>
                </section>
            </div>
            <div className="row">
                <div className="col-md-1 text-left">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!wordsToSelect.some(word => word.isSelected)}
                        onClick={() => onInitialWordsSelected(wordsToSelect.filter(word => word.isSelected))}>
                        Continue
                    </button>
                </div>
            </div>
        </div>

    )
}

export default WordsSelector;