import { Dropdown } from 'react-bootstrap';
import { Association } from '../../interfaces/Association';
import { Word } from '../../interfaces/Word';
import { useState } from 'react';

interface WordAssociationProps {
  association: Association | null;
  allWords: Word[];
}

const WordAssociation: React.FC<WordAssociationProps> = ({ association, allWords }) => {
  const [selectedWord, setSelectedWord] = useState(association?.targetWord);
  const handleDropdownSelect = (selectedValue: string | null) => {
    setSelectedWord(allWords.find(word => word.value === selectedValue));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <span>{association?.sourceWord.value} {association?.sourceWord.id}</span>
      </div>
      <div>
        <Dropdown onSelect={handleDropdownSelect}>
          <Dropdown.Toggle variant="secondary" id="dropdown2">
            {`${selectedWord?.value} ${selectedWord?.id}`}
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