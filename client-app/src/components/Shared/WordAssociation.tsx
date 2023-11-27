import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Word } from '../../interfaces/Word';
import { useState } from 'react';

const WordTitle = (word: Word|null, defaultValue?: string): string => {
  return word ? `${word.value} ${word.id}` : (defaultValue ? defaultValue : "Not Set");
};

const WordAssociation: React.FC<{
  word: Word;
  allWords: Word[];
  onAssociationSelected: (sourceWord: Word, targetWord: Word) => void;
}> = ({ word, allWords, onAssociationSelected }) => {
  const [selectedCategory, setSelectedCategory] = useState(word);
  const handleDropdownSelect = (selectedValue: string | null) => {
    onAssociationSelected(word, allWords.find((word: Word) => word.value === selectedValue) as Word);
  };

  return (
    <li className="d-flex justify-content-between align-items-center">
      <div>
        <span>{WordTitle(word)}</span>
      </div>
      <div>
        <span>&rarr;</span>
      </div>

      <div>
        <Dropdown onSelect={handleDropdownSelect}>
          <Dropdown.Toggle variant="secondary" id="dropdown2">
            {WordTitle(word, "Select Association")}
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
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown1">
            Chouse Category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Action 1.1</Dropdown.Item>
            <Dropdown.Item href="#">Action 1.2</Dropdown.Item>
            <Dropdown.Item href="#">Action 1.3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </li>

  )
}

export default WordAssociation;