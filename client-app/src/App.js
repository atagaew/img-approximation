import React, { useState } from 'react';
import { Button, Dropdown, Nav, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TextInput() {
  return (
    <div class="container mt-4">
      <div class="row">
        <section>
          <h2>Enter text to analyze</h2>

          <div class="col-md-6">
            <form>
              <div className="mb-3">
                <label htmlFor="analysisTitle" className="form-label">Title:</label>
                <input type="text" className="form-control" id="analysisTitle" />
              </div>
              <div class="mb-3">
                <label for="textArea" class="form-label">Enter Text:</label>
                <textarea class="form-control" id="textArea" rows="5"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

function WordsSelector() {
  return (
    <div class="container mt-4">
      <div class="row">
        <section>
          <h2>Select words to analyze</h2>


          <div class="col-md-6 text-left">
            <p>
              <button type="button" class="btn btn-primary">Храня</button>
              <button type="button" class="btn btn-primary">убогое</button>
              <button type="button" class="btn btn-success">молчанье</button>
            </p>
            <p>
              <button type="button" class="btn btn-primary">Над</button>
              <button type="button" class="btn btn-success">сумраком</button>
              <button type="button" class="btn btn-primary">гниющих</button>
              <button type="button" class="btn btn-success">вод</button>
            </p>
            <p>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

function WordsInitialAssociation() {
  return (
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6">
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

function WordAssociation() {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <span>Храня</span>
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
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown2">
            Chouse Association
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Action 2.1</Dropdown.Item>
            <Dropdown.Item href="#">Action 2.2</Dropdown.Item>
            <Dropdown.Item href="#">Action 2.3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </li>

  )
}
function WordsAssociation() {
  const [key, setKey] = useState('concepts');
  return (
    <div className="container-sm mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Associate each word with another until you will have 2-5 words in each category</h2>
          <Tab.Container id="tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="nouns">Существительные</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="states">Состояния</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="concepts">Образы</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="concepts">
                <section>
                  <ul className="list-group">
                    <WordAssociation />
                    {/* Add more list items with additional dropdowns and words */}
                  </ul>
                </section>
              </Tab.Pane>
              <Tab.Pane eventKey="states">
                <section>
                  {/* Content for the "Состояния" tab */}
                </section>
              </Tab.Pane>
              <Tab.Pane eventKey="nouns">
                <section>
                  {/* Content for the "Существительные" tab */}
                </section>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  )
}

function CrossWordsAssociation() {
  return (
    <div className="container-sm mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Describe a word on the left using words on the rigth</h2>
        </div>
      </div>
      <div className="row">
        {/* Left Column */}
        <div className="col-md-2">
          <button className="btn btn-primary">Click Me</button>
        </div>

        {/* Right Column */}
        <div className="col-md-4">
          {/* List of Buttons on the Top */}
          <div className="mb-3">
            <button className="btn btn-secondary mr-2">Button 1</button>
            <button className="btn btn-secondary mr-2">Button 2</button>
            <button className="btn btn-secondary">Button 3</button>
          </div>

          {/* Big Multiline Textbox on the Bottom */}
          <textarea className="form-control" rows="4" placeholder="Type something..."></textarea>
        </div>
      </div>
    </div>
  );
};

function FinalCrossWordsAssociation() {
  return (
    <div className="container-sm mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Write final idea coming to your mind</h2>
        </div>
      </div>
      <div className="row">
        {/* Right Column */}
        <div className="col-md-6">
          {/* List of Buttons on the Top */}
          <div className="mb-3">
            <button className="btn btn-secondary mr-2">Button 1</button>
            <button className="btn btn-secondary mr-2">Button 2</button>
            <button className="btn btn-secondary">Button 3</button>
          </div>

          {/* Big Multiline Textbox on the Bottom */}
          <textarea className="form-control" rows="4" placeholder="Type something..."></textarea>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <TextInput />
      <WordsSelector />
      <WordsInitialAssociation />
      <WordsAssociation />
      <CrossWordsAssociation />
      <FinalCrossWordsAssociation />
    </>
  );
}

export default App;
