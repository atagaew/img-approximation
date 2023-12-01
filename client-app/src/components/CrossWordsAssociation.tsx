import React, { useState } from 'react';
import { WordsDependencyExplanation } from '../interfaces/WordsDependencyExplanation';
import { Word } from '../interfaces/Word';

const CrossWordsAssociationItem: React.FC<{
  mainWord: Word;
  associatedWords: Word[];
  explanation: string;
  isAccordionOpen: (wordId: number) => boolean;
  handleAccordionClick: (wordId: number) => void;
  onExplanationChange: (wordId: number, explanation: string) => void;
}> = ({ mainWord, associatedWords, explanation, isAccordionOpen, handleAccordionClick, onExplanationChange }) => {

  return (<div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button
        className={`accordion-button ${isAccordionOpen(mainWord.id) ? '' : 'collapsed'}`}
        type="button"
        onClick={() => handleAccordionClick(mainWord.id)}
        aria-expanded={isAccordionOpen(mainWord.id)}
        aria-controls="collapseOne"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {explanation}

            </div>
          </div>

          <div className="row">
            <div className="col-12 text-secondary">
              <sub>{mainWord.value} &nbsp;&rarr;&nbsp;{associatedWords.map((owd, index) => (
                `${owd.value}${index < associatedWords.length - 1 ? ', ' : ''}`
              ))}
              </sub>
            </div>
          </div>
        </div>
      </button>
    </h2>
    <div
      id="collapseOne"
      className={`accordion-collapse collapse ${isAccordionOpen(mainWord.id) ? 'show' : ''}`}
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample"
    >
      <div className="accordion-body">
        <div className="row">
          <div className="mb-3">
            <button className="btn btn-primary">{mainWord.value}</button> &rarr;&nbsp;
            {associatedWords.map(owd => <button className="btn btn-secondary">{owd.value}</button>)}
          </div>
        </div>
        <div className="row">
          <textarea
            className="form-control"
            rows={4}
            placeholder={`Все дело в том что ${mainWord.value} ...`}
            value={explanation}
            onChange={(event) => { onExplanationChange(mainWord.id, event.target.value) }}>
          </textarea>
        </div>
      </div>
    </div>
  </div>)
}

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
        <div className="col-md-6">
          <h2>Describe a word on the left using words on the rigth</h2>
        </div>
      </div>
      <div className="accordion col-md-8 mb-2" id="accordionExample">
        {wordsDependency.map(wd => {
          return (
            <CrossWordsAssociationItem
              key={wd.mainWordId}
              mainWord={wordsToAssociate.get(wd.mainWordId)!}
              explanation={wd.explanation}
              associatedWords={wd.otherWordsIds.map(owd => { return wordsToAssociate.get(owd)! })}
              isAccordionOpen={isAccordionOpen}
              handleAccordionClick={handleAccordionClick}
              onExplanationChange={onExplanationChange}
            />
          )
        })}
      </div>
      <div className="row">
        <div className="col-md-2">
          <button
            type="submit"
            className="btn btn-primary">
            Next Round
          </button>
        </div>
      </div>

    </div>
  );
}
export default CrossWordsAssociation;
