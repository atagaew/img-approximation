import { useState, ChangeEvent } from 'react';
import { Word } from '../interfaces/Word';
import WordAssociation from './Shared/WordAssociation';
import WordCategorySelector from './Shared/WordCategorySelector';
import { WordCategory } from '../interfaces/WordCategory';

const WordsInitialAssociation: React.FC<{
  round: number,
  wordsToAssociate: Word[];
  onAssociationSelected: (sourceWord: Word, targetWord: Word) => void;
  onNewWordAdded: (wordText: string, category: WordCategory) => void;
  onWordCategorySelected: (word: Word, wordCategory: WordCategory) => void;
  onNextRoundClick: () => void;
}> = ({ round, wordsToAssociate, onAssociationSelected, onNewWordAdded, onWordCategorySelected, onNextRoundClick }) => {
  //todo fix this
  const [alphabeticalSorting, setAlphabeticalSorting] = useState(false);
  const [currectCategory, setCurrentCategory] = useState(WordCategory.Nouns);
  const [newWordText, setNewWordText] = useState('');


  let sortedWordsToAssociate: Word[] | null = wordsToAssociate;
  if (sortedWordsToAssociate) {
    sortedWordsToAssociate = sortedWordsToAssociate.filter(word => word.category === currectCategory)
  }
  if (sortedWordsToAssociate && alphabeticalSorting) {
    sortedWordsToAssociate = [...sortedWordsToAssociate].sort((a, b) => a.value.localeCompare(b.value));
  }

  const handleNewWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewWordText(event.target.value);
  }

  const onAddNewWord = (event: React.KeyboardEvent | React.FormEvent): void => {
    onNewWordAdded(newWordText, currectCategory);
    setNewWordText('');
    event.preventDefault();
  }

  const onFilterByCategoryChanged = (category: WordCategory) => {
    setCurrentCategory(category);
  }

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <section>
            <h2>Round {round}</h2>
            <h3>Associate each word with another and chouse a category</h3>
            <div className="row mb-3 align-items-center">
              <div className="col-md-7 d-flex align-items-center"> {/* Adjusted for automatic width */}
                <span className="mr-2 sort-label">Filter by category</span> <WordCategorySelector onWordCategorySelected={onFilterByCategoryChanged} category={currectCategory}  ></WordCategorySelector>
              </div>

              <div className="col-md-5 col-lg-3 d-flex align-items-center"> {/* Adjusted for automatic width */}
                <span className="mr-2 sort-label">Sort Alphabetically</span>
                <input
                  type="checkbox"
                  checked={alphabeticalSorting}
                  onChange={() => setAlphabeticalSorting(!alphabeticalSorting)}
                />


              </div>
            </div>
            <div>
              <ul className="list-group spaced-list-items">
                {sortedWordsToAssociate?.map((wordToAssociate) =>
                  <WordAssociation 
                    allWords={wordsToAssociate} 
                    word={wordToAssociate} 
                    key={wordToAssociate.id} 
                    onAssociationSelected={onAssociationSelected} 
                    onWordCategorySelected={onWordCategorySelected} />
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <div className="row mb-3">
        <form onSubmit={onAddNewWord} className="col-md-6"> {/* Wrapping elements in form */}
          <div className="row">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                id="exampleTextBox"
                placeholder="Enter new word"
                value={newWordText}
                onChange={handleNewWordChange}
              />
            </div>

            <div className="col-md-2">
              <button
                type="submit"
                className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
            <div className="col-md-2">
              <button
                type="submit"
                className="btn btn-primary" onClick={onNextRoundClick}>
                Next Round
              </button>
            </div>
          </div>      

    </div>
  )
}
export default WordsInitialAssociation;