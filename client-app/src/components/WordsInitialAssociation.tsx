import { useState } from 'react';
import { Association } from '../interfaces/Association';
import { Word } from '../interfaces/Word';
import WordAssociation from './Shared/WordAssociation';

interface WordsInitialAssociationProps {
  initialAssociations: Association[] | null;
  allWords: Word[];
}
const WordsInitialAssociation: React.FC<WordsInitialAssociationProps> = ({ initialAssociations, allWords }) => {
  const [alphabeticalSorting, setAlphabeticalSorting] = useState(false);

  let sortedAssociations: Association[] | null = initialAssociations;
  if (initialAssociations && alphabeticalSorting)
    sortedAssociations = [...initialAssociations].sort((a, b) => a.sourceWord.value.localeCompare(b.sourceWord.value));

  return (
    <div className="container mt-4">
      <div className="row">
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
              <ul className="list-group">
                {sortedAssociations?.map((association) => 
                  <WordAssociation association={association} allWords={allWords} key={association.sourceWord.id} />
                  )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
export default WordsInitialAssociation;