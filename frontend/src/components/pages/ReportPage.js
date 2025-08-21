import React from 'react';

const ReportPage = () => {
  return (
    <div className="report-content">
      <h2>Report an Environmental Issue</h2>
      <p>Help us identify and resolve environmental problems in your area</p>
      
      <form className="report-form">
        <div className="form-group">
          <label>Issue Type</label>
          <select className="form-control">
            <option value="garbage">Garbage</option>
            <option value="recycling">Recycling</option>
            <option value="water">Water Issue</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Brief description of the issue" 
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea 
            className="form-control" 
            rows="4" 
            placeholder="Detailed description of the problem"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Address or location details" 
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportPage;
