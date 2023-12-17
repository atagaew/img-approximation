
export default function FinalCrossWordsAssociation() {
  return (
    <div className="container-sm mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Write final idea coming to your mind</h2>
        </div>
      </div>
      <div className="row  mb-3">
        <div className="col-md-6">
          <textarea className="form-control" rows={4} placeholder="Type something..."></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <button type="button" className="btn btn-primary">Save as final</button>
          <button type="button" className="btn btn-secondary">Edit</button>
        </div>
      </div>

    </div>
  );
}