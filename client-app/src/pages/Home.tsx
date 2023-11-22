import CrossWordsAssociation from "../components/CrossWordsAssociation";
import TextInput from "../components/TextInput";
import WordsAssociation from "../components/WordsAssociation";
import WordsInitialAssociation from "../components/WordsInitialAssociation";
import WordsSelector from "../components/WordsSelector";
import FinalCrossWordsAssociation from "../components/FinalCrossWordsAssociation";

export default function Home() {
    return (
        <>
          <TextInput />
          <WordsSelector />
          <WordsInitialAssociation />
          <WordsAssociation />
          <CrossWordsAssociation />
          <FinalCrossWordsAssociation />
        </>
      );
   
}
