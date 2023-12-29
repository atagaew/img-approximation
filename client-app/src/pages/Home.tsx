import CrossWordsAssociation from "../components/CrossWordsAssociation";
import TextInput from "../components/TextInput";
import WordsInitialAssociation from "../components/WordsInitialAssociation";
import WordsSelector from "../components/WordsSelector";
import {FinalCrossWordsAssociation} from "../components/FinalCrossWordsAssociation";
import {WordAnalysis} from "../interfaces/WordAnalysis";
import React, {useState} from 'react';
import {Word} from "../interfaces/Word";
import {WordCategory} from "../interfaces/WordCategory";
import {WordsDependencyExplanation} from "../interfaces/WordsDependencyExplanation";
import {AnalysisHistory} from "../components/AnalysisHistory";

export default function Home() {
    const [analysisHistory, setAnalysisHistory] = useState<WordAnalysis[]>((): WordAnalysis[] => {
        const allLocalStorageItems = {...localStorage};
        const allAnalysisHistoryValues = Object.values(allLocalStorageItems);


        return allAnalysisHistoryValues.reduce((acc: WordAnalysis[], currentValue: string) => {
            try {
                const parsedValue = JSON.parse(currentValue);
                if (Array.isArray(parsedValue)) {
                    acc.push(...parsedValue);
                } else {
                    acc.push(parsedValue);
                }
            } catch (error) {
                console.error('Error parsing localStorage item:', error);
            }
            return acc;
        }, []);
    });
    
    const [analysis, setAnalysis] = useState<WordAnalysis>(() => {
        if (analysisHistory.length > 0) {
            return analysisHistory[0];
        } else {
            return WordAnalysis.createEmpty();
        }
    })

    const onStartNewAnalysis = () => {
        onStartAnalysis(WordAnalysis.createEmpty());
    }
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

    const persistUpdatedAnalysis = (updatedAnalysis: WordAnalysis): void => {
        localStorage.setItem(updatedAnalysis.id, JSON.stringify(updatedAnalysis));
        let found = false;
        const updatedList = analysisHistory.map((ah) => {
            if (ah.id === updatedAnalysis.id) {
                found = true;
                return updatedAnalysis;
            } else {
                return ah;
            }
        });
        if (found)
            setAnalysisHistory(updatedList);
        else {
            setAnalysisHistory([updatedAnalysis, ...updatedList])
        }
    };
    
    const onUseTextAsFinalIdea = (text: string) :void => {
        if (text.length === 0) 
            return;
        
        const updatedAnalysis = {
            ...analysis,
            finalIdea: text
        };
        
        setAnalysis(updatedAnalysis);
        persistUpdatedAnalysis(updatedAnalysis)
    }

    const selectedWords = getWordsForCurrrentRound(analysis.round, analysis.selectedWords);
    const wordsToAssociate = new Map<number, Word>();
    selectedWords.forEach(word => {
        wordsToAssociate.set(word.id, word);
    });

    return (
        <>
            <AnalysisHistory 
                analysisHistory={analysisHistory} 
                onStartNewAnalysis={onStartNewAnalysis}
                key={analysisHistory.length}/>
            <TextInput 
                onStartAnalysis={onStartAnalysis} 
                initialAnalysisData={analysis} 
                key={`ti${analysis.id}`} />
            <WordsSelector 
                initialWordsToSelect={analysis.words}
                key={`ws${analysis.id}${analysis.words.length}`} 
                onInitialWordsSelected={onInitialWordsSelected} />
            <WordsInitialAssociation
                key={`wia${analysis.id}`}
                round={analysis.round}
                wordsToAssociate={selectedWords}
                onAssociationSelected={onAssociationSelected}
                onNewWordAdded={onNewWordAdded}
                onWordCategorySelected={onWordCategorySelected}
                onNextRoundClick={onNextRoundClick}
                onGenerateCrossWordsAssocationsClick={onGenerateCrossWordsAssocationsClick} />
            <CrossWordsAssociation
                key={`cwa${analysis.id}`}
                wordsDependency={analysis.wordsDependency} 
                wordsToAssociate={wordsToAssociate} 
                onExplanationChange={onExplanationChange}
                onUseTextAsFinalIdea={onUseTextAsFinalIdea}/>
            <FinalCrossWordsAssociation
                finalIdea={analysis.finalIdea} 
                onUpdateFinalIdea={onUseTextAsFinalIdea}
                key={`fcwa${analysis.id}${analysis.finalIdea.length}`}
                 />
        </>
    );

}
