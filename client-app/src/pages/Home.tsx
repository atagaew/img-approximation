import CrossWordsAssociation from "../components/CrossWordsAssociation";
import TextInput from "../components/TextInput";
import WordsAssociation from "../components/WordsAssociation";
import WordsInitialAssociation from "../components/WordsInitialAssociation";
import WordsSelector from "../components/WordsSelector";
import FinalCrossWordsAssociation from "../components/FinalCrossWordsAssociation";
import { WordAnalysis } from "../interfaces/WordAnalysis";
import { useState } from 'react';

export default function Home() {
    const [analysis, setAnalysis] = useState<WordAnalysis>({
        title: '',
        text: '',
        words: []
    })
    const onStartAnalysis = (analysis: WordAnalysis) => {
        // Handle the analysis logic here
        console.log('Analysis started with data:', analysis);
        setAnalysis(analysis);
      };
      
    return (
        <>
          <TextInput  onStartAnalysis={onStartAnalysis} initialAnalysisData={analysis}/>
          <WordsSelector initialWordsToSelect={analysis.words}/>
          <WordsInitialAssociation />
          <WordsAssociation />
          <CrossWordsAssociation />
          <FinalCrossWordsAssociation />
        </>
      );
   
}
