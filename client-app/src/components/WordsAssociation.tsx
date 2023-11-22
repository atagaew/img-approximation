import React, { useState } from 'react';
import { Button, Dropdown, Nav, Tab } from 'react-bootstrap';
import WordAssociation from './Shared/WordAssociation';

export default function WordsAssociation() {
    const [key, setKey] = useState<string | null>('concepts');
    return (
      <div className="container-sm mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Associate each word with another until you will have 2-5 words in each category</h2>
            <Tab.Container id="tabs" activeKey={key ?? undefined} onSelect={(k) => setKey(k)}>
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
                    {/* Content htmlFor the "Состояния" tab */}
                  </section>
                </Tab.Pane>
                <Tab.Pane eventKey="nouns">
                  <section>
                    {/* Content htmlFor the "Существительные" tab */}
                  </section>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    )
  }