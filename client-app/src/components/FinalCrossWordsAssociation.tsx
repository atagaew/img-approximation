import React, {useState} from "react";
import {Word} from "../interfaces/Word";
import {WordAnalysis} from "../interfaces/WordAnalysis";

export const FinalCrossWordsAssociation: React.FC<{
    finalIdea: string;
    onUpdateFinalIdea: (text: string) => void;
}> = ({ finalIdea , onUpdateFinalIdea}) => {
    const [updatedIdea, setUpdatedIdea] = useState<string>(finalIdea);
  return (
    <div className="container-sm mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Write final idea coming to your mind</h2>
        </div>
      </div>
      <div className="row  mb-3">
        <div className="col-md-6">
          <textarea className="form-control" rows={4} placeholder="Type something..." value={updatedIdea}></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <button type="button" className="btn btn-primary" onClick={() => onUpdateFinalIdea(updatedIdea)}>Save as final</button>
        </div>
      </div>

    </div>
  );
};