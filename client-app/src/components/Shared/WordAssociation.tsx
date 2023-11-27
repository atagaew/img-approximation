import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Word } from '../../interfaces/Word';
import { useState } from 'react';
import { WordCategory, WordCategoryDescriptions } from '../../interfaces/WordCategory';


const WordAssociation: React.FC<{
  word: Word;
  allWords: Word[];
  onAssociationSelected: (sourceWord: Word, targetWord: Word) => void;
  onWordCategorySelected: (word:Word, WordCategory: WordCategory) => void;
}> = ({ word, allWords, onAssociationSelected, onWordCategorySelected }) => {
  


  const wordTitle = (word: Word | null, defaultValue?: string): string => {
    return word ? `${word.value} ${word.id}` : (defaultValue ? defaultValue : "Not Set");
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
        <Dropdown onSelect={(selectedValue: string | null) => {
          onAssociationSelected(word, allWords.find((word: Word) => word.value === selectedValue) as Word);
        }}>
          <Dropdown.Toggle variant="secondary" id="dropdown2">
            {wordTitle(word, "Select Association")}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {allWords.map(word => (
              <Dropdown.Item key={word.id} eventKey={word.value}>
                {word.value} {word.id}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <Dropdown onSelect={(selectedCategory: string | null) => {
          onWordCategorySelected(word, selectedCategory as WordCategory);
        }}>
          <Dropdown.Toggle variant="secondary" id="dropdown1">
            {WordCategoryDescriptions[word.category]}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(WordCategoryDescriptions).filter((key) => isNaN(Number(key))).map((actionKey) => (
              <Dropdown.Item href="#" key={actionKey}  eventKey={actionKey}>
                {WordCategoryDescriptions[actionKey as keyof typeof WordCategoryDescriptions]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </li>

  )
}

export default WordAssociation;