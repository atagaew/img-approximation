import CrossWordsAssociation from "../components/CrossWordsAssociation";
import TextInput from "../components/TextInput";
import WordsInitialAssociation from "../components/WordsInitialAssociation";
import WordsSelector from "../components/WordsSelector";
import FinalCrossWordsAssociation from "../components/FinalCrossWordsAssociation";
import { WordAnalysis } from "../interfaces/WordAnalysis";
import { useState } from 'react';
import { Word } from "../interfaces/Word";
import { WordCategory } from "../interfaces/WordCategory";
import { WordsDependencyExplanation } from "../interfaces/WordsDependencyExplanation";

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
        let oldTarget: Word | undefined;

        const oldAssociatedWordId = newSourceWord.associatedWordId


        newSourceWord.associatedWordId = newTargetWord.id;
        newSourceWord.associationRound = analysis.round;

        newTargetWord.referencingWordIds = [...newTargetWord.referencingWordIds, newSourceWord.id];

        // decreasing weight of old referenced word because the word is reassigning to another word
        if (oldAssociatedWordId) {
            oldTarget = analysis.selectedWords.find(selectedWord => selectedWord.id === oldAssociatedWordId);
            if (oldTarget) {
                oldTarget = {
                    ...oldTarget,
                    weight: oldTarget.weight - newSourceWord.weight
                }
            }
        }
        // then increasing weight of new target word
        newTargetWord.weight += newSourceWord.weight;

        setAnalysis(
            {
                ...analysis,
                selectedWords: analysis.selectedWords.map(word => {
                    if (word.id === newSourceWord.id)
                        return newSourceWord;

                    if (word.id === newTargetWord.id)
                        return newTargetWord;

                    if (oldTarget && word.id === oldTarget.id)
                        return oldTarget;

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

        const word = Word.create(maxWord ? maxWord.id + 1 : 0, maxWord ? maxWord.lineNumber : 1, maxWord ? maxWord.wordNumber + 1 : 1, text, category);
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

    const onNextRoundClick = () => {
        setAnalysis(
            {
                ...analysis,
                round: analysis.round + 1
            }
        )
    }

    const onGenerateCrossWordsAssocationsClick = () => {
        const wordsDependencies: WordsDependencyExplanation[] = [];
        const finalWords = getWordsForCurrrentRound(analysis.round, analysis.selectedWords);

        for (const word of finalWords) {
            const wordsDependency = new WordsDependencyExplanation(word.id, finalWords.filter(finalWord => finalWord.id !== word.id).map(finalWord => finalWord.id)) ;
            wordsDependencies.push(wordsDependency);
        }
        setAnalysis(
            {
                ...analysis,
                wordsDependency: wordsDependencies
            }
        )

    }

    const getWordsForCurrrentRound = (round: number, allAvailableWords: Word[]) => {
        const selectedWords = [];
        const wordSet = new Set();

        for (let word of allAvailableWords) {
            for (let depthIndex = 1; depthIndex < round; depthIndex++) {
                if (word.associatedWordId && word.associationRound < round) {
                    const wordObj = allAvailableWords.find(allWord =>
                        word.associatedWordId
                        && allWord.id === word.associatedWordId);
                    word = wordObj ? wordObj : word;
                }
                else {
                    break;
                }
            }
            const wordKey = word.id;
            if (!wordSet.has(wordKey)) {
                selectedWords.push(word);
                wordSet.add(wordKey);
            }
        }

        return selectedWords;
    }

    const onExplanationChange = (wordId: number, explanation: string) => {
        setAnalysis(
            {
                ...analysis,
                wordsDependency: [...analysis.wordsDependency].map(wd => wd.mainWordId === wordId ? { ...wd, explanation: explanation } : wd)
            }
        )

    }


    const selectedWords = getWordsForCurrrentRound(analysis.round, analysis.selectedWords);
    const wordsToAssociate = new Map<number, Word>();
    selectedWords.forEach(word => {
        wordsToAssociate.set(word.id, word);
    });

    return (
        <>
            <TextInput onStartAnalysis={onStartAnalysis} initialAnalysisData={analysis} />
            <WordsSelector initialWordsToSelect={analysis.words} key={analysis.words.length} onInitialWordsSelected={onInitialWordsSelected} />
            <WordsInitialAssociation
                round={analysis.round}
                wordsToAssociate={selectedWords}
                onAssociationSelected={onAssociationSelected}
                onNewWordAdded={onNewWordAdded}
                onWordCategorySelected={onWordCategorySelected}
                onNextRoundClick={onNextRoundClick}
                onGenerateCrossWordsAssocationsClick={onGenerateCrossWordsAssocationsClick} />
            <CrossWordsAssociation 
                wordsDependency={analysis.wordsDependency} 
                wordsToAssociate={wordsToAssociate} 
                onExplanationChange={onExplanationChange} />
            <FinalCrossWordsAssociation />
        </>
    );

}
