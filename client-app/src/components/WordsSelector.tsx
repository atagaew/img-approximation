import React, { useState } from 'react';
import { Button, Dropdown, Nav, Tab } from 'react-bootstrap';

export default function WordsSelector() {
    return (
      <div className="container mt-4">
        <div className="row">
          <section>
            <h2>Select words to analyze</h2>
  
  
            <div className="col-md-6 text-left">
              <p>
                <button type="button" className="btn btn-primary">Храня</button>
                <button type="button" className="btn btn-primary">убогое</button>
                <button type="button" className="btn btn-success">молчанье</button>
              </p>
              <p>
                <button type="button" className="btn btn-primary">Над</button>
                <button type="button" className="btn btn-success">сумраком</button>
                <button type="button" className="btn btn-primary">гниющих</button>
                <button type="button" className="btn btn-success">вод</button>
              </p>
              <p>
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }