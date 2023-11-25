import { useState, ChangeEvent } from 'react';
import { Association } from '../interfaces/Association';
import { Word } from '../interfaces/Word';
import WordAssociation from './Shared/WordAssociation';
import { WordCategory } from '../interfaces/WordCategory';

interface WordsInitialAssociationProps {
  initialAssociations: Association[] | null;
  allWords: Word[];
}
const WordsInitialAssociation: React.FC<WordsInitialAssociationProps> = ({ initialAssociations, allWords }) => {
  const [associations, setAssociations] = useState<Association[]>(initialAssociations || []);
  const [wordsToAssociate, setWordsToAssociate] = useState<Word[]>(allWords);
  const [alphabeticalSorting, setAlphabeticalSorting] = useState(false);
  const [newWordText, setNewWordText] = useState('');

  let sortedAssociations: Association[] | null = associations;
  if (initialAssociations && alphabeticalSorting)
    sortedAssociations = [...initialAssociations].sort((a, b) => a.sourceWord.value.localeCompare(b.sourceWord.value));

  const handleNewWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewWordText(event.target.value);
  }

  const getMaxIdAndLineNumber = (words: Word[]): Word | null => {
    let maxWord: Word | null = null;

    for (const word of words) {
      if (maxWord === null || word.id > maxWord.id || word.lineNumber > maxWord.lineNumber) {
        maxWord = word;
      }
    }

    return maxWord;
  };
  const onAddNewWord = (): void => {
    const maxWord = getMaxIdAndLineNumber(wordsToAssociate);
    const newWord = {
      id: maxWord ? maxWord.id + 1 : 0,
      value: newWordText,
      lineNumber: maxWord ? maxWord.lineNumber : 1,
      isSelected: true,
      category: WordCategory.Nouns,
      referencedWords: []
    };
    setAssociations([
      ...associations,
      {
        sourceWord: newWord,
        targetWord: null,
      }]);
    setWordsToAssociate([...wordsToAssociate, newWord]);
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
                {sortedAssociations?.map((association) =>
                  <WordAssociation association={association} allWords={wordsToAssociate} key={association.sourceWord.id} />
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
            onClick={() => onAddNewWord()}>
            Add
          </button>
        </div>
      </div>

    </div>
  )
}
export default WordsInitialAssociation;