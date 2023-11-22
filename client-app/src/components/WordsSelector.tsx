import { Word } from "../interfaces/Word";
import React, { useState } from 'react';
import { WordAnalysis } from "../interfaces/WordAnalysis";

interface WordsSelectorProps {
    initialWordsToSelect: Word[];
}

const WordsSelector: React.FC<WordsSelectorProps> = ({ initialWordsToSelect }) => {
    const [selectedWords, setSelectedWords] = useState<Word[]>(initialWordsToSelect);

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

    const wordsGrouped = groupWordsByLine(selectedWords);
    const onSelectWord = (selectedWord: Word) => {
        setSelectedWords((prevSelectedWords) =>
            {
                console.log(prevSelectedWords)
                return prevSelectedWords.map((word) => word.value === selectedWord.value ? { ...word, isSelected: !selectedWord.isSelected } : word);
            }
        );
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <section>
                    <h2>Select words to analyze</h2>
                    <div className="col-md-6 text-left">
                        {Object.keys(wordsGrouped).map((lineNumberString) => {
                            const lineNumber = parseInt(lineNumberString, 10);
                            return (
                                <p key={lineNumber}>
                                    {wordsGrouped[lineNumber].map((word) => (
                                        <button
                                            key={word.value}
                                            type="button"
                                            className={`btn ${word.isSelected ? 'btn-info' : 'btn-light'}`} onClick={() => onSelectWord(word)}>
                                            {word.value}
                                        </button>
                                    ))}
                                </p>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default WordsSelector;