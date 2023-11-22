export default function TextInput() {
    return (
      <div className="container mt-4">
        <div className="row">
          <section>
            <h2>Enter text to analyze</h2>
  
            <div className="col-md-6">
              <form>
                <div className="mb-3">
                  <label htmlFor="analysisTitle" className="form-label">Title:</label>
                  <input type="text" className="form-control" id="analysisTitle" />
                </div>
                <div className="mb-3">
                  <label htmlFor="textArea" className="form-label">Enter Text:</label>
                  <textarea className="form-control" id="textArea" rows={5}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    )
  }