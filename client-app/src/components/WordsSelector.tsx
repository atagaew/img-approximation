import { Word } from "../interfaces/Word";

interface WordsSelectorProps {
    initialWordsToSelect: Word[];
}

const WordsSelector: React.FC<WordsSelectorProps> = ({ initialWordsToSelect }) => {
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

    const wordsGrouped = groupWordsByLine(initialWordsToSelect);
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
                                            className="btn btn-light"
                                        >
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