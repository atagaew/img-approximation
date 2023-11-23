import CrossWordsAssociation from "../components/CrossWordsAssociation";
import TextInput from "../components/TextInput";
import WordsAssociation from "../components/WordsAssociation";
import WordsInitialAssociation from "../components/WordsInitialAssociation";
import WordsSelector from "../components/WordsSelector";
import FinalCrossWordsAssociation from "../components/FinalCrossWordsAssociation";
import { WordAnalysis } from "../interfaces/WordAnalysis";
import { Association } from "../interfaces/Association";
import { useState } from 'react';
import { Word } from "../interfaces/Word";
import WordAssociation from "../components/Shared/WordAssociation";

export default function Home() {
    const [analysis, setAnalysis] = useState<WordAnalysis>(WordAnalysis.createEmpty())
    const onStartAnalysis = (analysis: WordAnalysis) => {
        setAnalysis(analysis);
    };

    const onInitialWordsSelected = (words: Word[]) => {
        setAnalysis({
                ...analysis,
                selectedWords: [...words].sort((a, b) => a.value.localeCompare(b.value)),
                iterations: [
                    { 
                        id: 0, 
                        associations: words.map((word: Word): Association => { 
                            return { 
                                sourceWord: word, 
                                targetWord: word };
                         }) }]
            });
    }
    const initialAssociations = analysis.iterations[0]?.associations;
    return (
        <>
            <TextInput onStartAnalysis={onStartAnalysis} initialAnalysisData={analysis} />
            <WordsSelector initialWordsToSelect={analysis.words} key={analysis.words.length}  onInitialWordsSelected={onInitialWordsSelected}/>
            <WordsInitialAssociation initialAssociations={initialAssociations} allWords={analysis.selectedWords}/>
            <WordsAssociation />
            <CrossWordsAssociation />
            <FinalCrossWordsAssociation />
        </>
    );

}
