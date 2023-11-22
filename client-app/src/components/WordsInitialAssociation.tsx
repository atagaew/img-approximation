import WordAssociation from './Shared/WordAssociation';

export default function WordsInitialAssociation() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <section>
              <h2>Associate each word with another and chouse a category</h2>
              <div>
                <ul className="list-group">
                  <WordAssociation/>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }