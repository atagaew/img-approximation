import CrossWordsAssociation from "../components/CrossWordsAssociation";
import TextInput from "../components/TextInput";
import WordsAssociation from "../components/WordsAssociation";
import WordsInitialAssociation from "../components/WordsInitialAssociation";
import WordsSelector from "../components/WordsSelector";
import FinalCrossWordsAssociation from "../components/FinalCrossWordsAssociation";
import { WordAnalysis } from "../interfaces/WordAnalysis";
import { useState } from 'react';
import { Word } from "../interfaces/Word";
import { WordCategory } from "../interfaces/WordCategory";

export default function Home() {
    const [analysis, setAnalysis] = useState<WordAnalysis>(WordAnalysis.createEmpty())
    const onStartAnalysis = (analysis: WordAnalysis) => {
        setAnalysis(analysis);
    };

    const onInitialWordsSelected = (words: Word[]) => {
        setAnalysis({
            ...analysis,
            selectedWords: [...words],
        });
    }

    const onAssociationSelected = (sourceWord: Word, targetWord: Word) => {
        const newSourceWord = { ...sourceWord };
        const newTargetWord = { ...targetWord };
        newSourceWord.associatedWord = newTargetWord;
        newTargetWord.referencingWords = [...newTargetWord.referencingWords, newSourceWord];

        setAnalysis(
            {
                ...analysis,
                selectedWords: analysis.selectedWords.map(word => {
                    if (word.id === newSourceWord.id)
                        return newSourceWord;

                    if (word.id === newTargetWord.id)
                        return newTargetWord;

                    return word;
                }),
            }
        )
    }

    const onNewWordAdded = (text: string, category: WordCategory) => {
        let maxWord: Word | null = null;

        for (const word of analysis.selectedWords) {
            if (maxWord === null || word.id > maxWord.id || word.lineNumber > maxWord.lineNumber) {
                maxWord = word;
            }
        }

        const word = Word.create(maxWord ? maxWord.id + 1 : 0, maxWord ? maxWord.lineNumber : 1, text, category);
        setAnalysis(
            {
                ...analysis,
                selectedWords: [...analysis.selectedWords, word],
            }
        )
    }

    const onWordCategorySelected = (word: Word, newCategory: WordCategory) => {
        setAnalysis(
            {
                ...analysis,
                selectedWords: analysis.selectedWords
                    .map(selectedWord => selectedWord.id === word.id ? { ...selectedWord, category: newCategory } : selectedWord),
            }
        )
    };

    return (
        <>
            <TextInput onStartAnalysis={onStartAnalysis} initialAnalysisData={analysis} />
            <WordsSelector initialWordsToSelect={analysis.words} key={analysis.words.length} onInitialWordsSelected={onInitialWordsSelected} />
            <WordsInitialAssociation wordsToAssociate={analysis.selectedWords} onAssociationSelected={onAssociationSelected} onNewWordAdded={onNewWordAdded} onWordCategorySelected={onWordCategorySelected} />
            {/* <WordsAssociation  key={`wia${analysis.selectedWords.length}`} wordsToAssociate={analysis.selectedWords} onAssociationSelected={onAssociationSelected}/> */}
            <CrossWordsAssociation />
            <FinalCrossWordsAssociation />
        </>
    );

}
