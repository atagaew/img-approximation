import CrossWordsAssociation from "../components/CrossWordsAssociation";
import TextInput from "../components/TextInput";
import WordsAssociation from "../components/WordsAssociation";
import WordsInitialAssociation from "../components/WordsInitialAssociation";
import WordsSelector from "../components/WordsSelector";
import FinalCrossWordsAssociation from "../components/FinalCrossWordsAssociation";
import { WordAnalysis } from "../interfaces/WordAnalysis";

export default function Home() {
    const onStartAnalysis = (data: WordAnalysis) => {
        // Handle the analysis logic here
        console.log('Analysis started with data:', data);
      };
      
      const initialValues: WordAnalysis = {
        title: '',
        text: '',
        words: []
    };
    return (
        <>
          <TextInput  onStartAnalysis={onStartAnalysis} initialAnalysisData={initialValues}/>
          <WordsSelector />
          <WordsInitialAssociation />
          <WordsAssociation />
          <CrossWordsAssociation />
          <FinalCrossWordsAssociation />
        </>
      );
   
}
