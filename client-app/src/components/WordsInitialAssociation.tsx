import { useState, ChangeEvent } from 'react';
import { Word } from '../interfaces/Word';
import WordAssociation from './Shared/WordAssociation';
import { WordCategory } from '../interfaces/WordCategory';

const WordsInitialAssociation: React.FC<{
  wordsToAssociate: Word[];
  onAssociationSelected: (sourceWord: Word, targetWord: Word) => void;
  onNewWordAdded: (wordText: string) => void;
  onWordCategorySelected: (word:Word, wordCategory: WordCategory) => void;
}> = ({ wordsToAssociate, onAssociationSelected, onNewWordAdded, onWordCategorySelected }) => {
  //todo fix this
  const [alphabeticalSorting, setAlphabeticalSorting] = useState(false);
  const [newWordText, setNewWordText] = useState('');


  let sortedWordsToAssociate: Word[] | null = wordsToAssociate;
  if (sortedWordsToAssociate && alphabeticalSorting) {
    sortedWordsToAssociate = [...wordsToAssociate].sort((a, b) => a.value.localeCompare(b.value));
  }

  const handleNewWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewWordText(event.target.value);
  }

  const onAddNewWord = (): void => {
    onNewWordAdded(newWordText);
    setNewWordText('');
  }

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <section>
            <h2>Associate each word with another and chouse a category</h2>
            <label className="ml-2">
              <input
                type="checkbox"
                checked={alphabeticalSorting}
                onChange={() => setAlphabeticalSorting(!alphabeticalSorting)}
              />
              &nbsp;Sort Alphabetically
            </label>
            <div>
              <ul className="list-group spaced-list-items">
                {sortedWordsToAssociate?.map((wordToAssociate) =>
                  <WordAssociation allWords={wordsToAssociate} word={wordToAssociate} key={wordToAssociate.id} onAssociationSelected={onAssociationSelected} onWordCategorySelected={onWordCategorySelected} />
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-5"> {/* Adjusted for automatic width */}
          <input
            type="text"
            className="form-control"
            id="exampleTextBox"
            placeholder="Enter new word"
            value={newWordText}
            onChange={handleNewWordChange}
          />
        </div>

        <div className="col-md-1"> {/* Adjusted for automatic width */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onAddNewWord}>
            Add
          </button>
        </div>
      </div>

    </div>
  )
}
export default WordsInitialAssociation;