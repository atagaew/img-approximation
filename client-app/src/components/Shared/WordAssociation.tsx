import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Word } from '../../interfaces/Word';
import { useState } from 'react';
import { WordCategory } from '../../interfaces/WordCategory';
import WordCategorySelector from './WordCategorySelector';

const WordAssociation: React.FC<{
  word: Word;
  allWords: Word[];
  onAssociationSelected: (sourceWord: Word, targetWord: Word) => void;
  onWordCategorySelected: (word: Word, WordCategory: WordCategory) => void;
}> = ({ word, allWords, onAssociationSelected, onWordCategorySelected }) => {

  const sortedWords = [...allWords].sort((a, b) => a.value.localeCompare(b.value)).filter(w => w.category === word.category);

  const wordTitle = (word: Word | null | undefined, defaultValue?: string): React.ReactNode => {
    return (<>{word?.value} <sub>({word?.lineNumber},{word?.wordNumber})</sub> - {word?.referencingWordIds.length}</>);
  };

  return (
    <li className="d-flex justify-content-between align-items-center">
      <div>
        <span>{wordTitle(word)}</span>
      </div>
      <div>
        <span>&rarr;</span>
      </div>

      <div>
        <Dropdown onSelect={(selectedKey: string | null | undefined) => {
          if (selectedKey) {
            const selectedObj = JSON.parse(selectedKey);
            const selectedWordId = selectedObj.id;

            const selectedWord = sortedWords.find((word) => word.id === selectedWordId);
            if (selectedWord) {
              onAssociationSelected(word, selectedWord);
            } else {
              console.error('Selected word not found!');
            }
          }
        }}>
          <Dropdown.Toggle variant="secondary" id="dropdown2">
            {word.associatedWordId ? wordTitle(allWords.find(associatedWord => associatedWord.id === word.associatedWordId) , '') : wordTitle(word, '')}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sortedWords.map(word => (
              <Dropdown.Item key={word.id} eventKey={JSON.stringify({ value: word.value, id: word.id })}>
                {wordTitle(word, '')}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <WordCategorySelector onWordCategorySelected={(category) => { onWordCategorySelected(word, category) }} category={word.category} />
      </div>
    </li>

  )
}

export default WordAssociation;