import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Word } from '../../interfaces/Word';
import { WordCategory, WordCategoryDescriptions } from '../../interfaces/WordCategory';

const WordCategorySelector: React.FC<{
  category: WordCategory;
  onWordCategorySelected: (selectedCategory: WordCategory) => void;
}> = ({category, onWordCategorySelected }) => {

  return (
    <Dropdown onSelect={(selectedCategory: string | null) => {
      onWordCategorySelected(selectedCategory as WordCategory);
    }}>
      <Dropdown.Toggle variant="secondary">
        {WordCategoryDescriptions[category]}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(WordCategoryDescriptions).filter((key) => isNaN(Number(key))).map((actionKey) => (
          <Dropdown.Item href="#" key={actionKey} eventKey={actionKey}>
            {WordCategoryDescriptions[actionKey as keyof typeof WordCategoryDescriptions]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default WordCategorySelector;