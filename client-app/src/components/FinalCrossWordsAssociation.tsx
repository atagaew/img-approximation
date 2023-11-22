import React, { useState } from 'react';
import { Button, Dropdown, Nav, Tab } from 'react-bootstrap';

export default function FinalCrossWordsAssociation() {
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
          <textarea className="form-control" rows={4} placeholder="Type something..."></textarea>
        </div>
      </div>
    </div>
  );
};