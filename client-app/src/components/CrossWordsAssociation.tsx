import React, { useState } from 'react';
import { WordsDependencyExplanation } from '../interfaces/WordsDependencyExplanation';
import { Word } from '../interfaces/Word';
import { CrossWordsAssociationItem } from './CrossWordsAssociationItem';

const CrossWordsAssociation: React.FC<{
  wordsDependency: WordsDependencyExplanation[];
  wordsToAssociate: Map<number, Word>;
  onExplanationChange: (wordId: number, explanation: string) => void;
}> = ({ wordsDependency, wordsToAssociate, onExplanationChange }) => {
  const [activeAccordion, setActiveAccordion] = useState<number>(wordsDependency?.[0]?.mainWordId || 0);

  const handleAccordionClick = (accordionNumber: number) => {
    setActiveAccordion(accordionNumber === activeAccordion ? 0 : accordionNumber);
  };

  const isAccordionOpen = (accordionNumber: number) => {
    return accordionNumber === activeAccordion;
  };

  return (
    <div className="container-sm mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2>Describe a word on the left using words on the right</h2>
        </div>
      </div>
      <div className="accordion col-md-8 mb-2" id="accordionExample">
        {wordsDependency.map(wd => {
          return (
            <CrossWordsAssociationItem
              key={wd.mainWordId}
              mainWord={wordsToAssociate.get(wd.mainWordId)!}
              explanation={wd.explanation}
              associatedWords={wd.otherWordsIds.map(owd => { return wordsToAssociate.get(owd)! }).filter(Boolean)}
              isAccordionOpen={isAccordionOpen}
              handleAccordionClick={handleAccordionClick}
              onExplanationChange={onExplanationChange}
            />
          )
        })}
      </div>
      <div className="row">
        <div className="col-md-7">
          <button type="button" className="btn btn-primary">Back</button>
        </div>
      </div>

    </div>
  );
}
export default CrossWordsAssociation;
