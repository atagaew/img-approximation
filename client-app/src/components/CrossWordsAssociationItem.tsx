import React from 'react';
import { Word } from '../interfaces/Word';

export const CrossWordsAssociationItem: React.FC<{
  mainWord: Word;
  associatedWords: Word[];
  explanation: string;
  isAccordionOpen: (wordId: number) => boolean;
  handleAccordionClick: (wordId: number) => void;
  onExplanationChange: (wordId: number, explanation: string) => void;
}> = ({ mainWord, associatedWords, explanation, isAccordionOpen, handleAccordionClick, onExplanationChange }) => {

  if (!mainWord)
    return null;
  
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
          <div className="mb-3 d-inline-flex flex-wrap gap-2">
            <button className="btn btn-dark">{mainWord.value}</button> &rarr;&nbsp;
            {associatedWords.map(owd => <button className="btn btn-light">{owd.value}</button>)}
          </div>
        </div>
        <div className="row mb-3">
          <textarea
            className="form-control"
            rows={4}
            placeholder={`Все дело в том что ${mainWord.value} ...`}
            value={explanation}
            onChange={(event) => { onExplanationChange(mainWord.id, event.target.value); }}>
          </textarea>
        </div>
        <div className="row">
          <div className="col-md-7">
            <button type="button" className="btn btn-primary">Save as final</button>
          </div>
        </div>
      </div>
    </div>
  </div>);
};
