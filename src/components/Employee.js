import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employee.css'; 

const Employee = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    mobilenumber: '',
    location: '',
    qualifications: [
      { id: nextId, qualification: '', percentage: '' }
    ]
  });

  const [data, setData] = useState([
    {
      id: "1",
      username: "Ajith Kumar",
      mobilenumber: "9876543210",
      location: "Kovilpatti",
      details: [
        { id: "1", qualification: "MBA", percentage: "80%" }
      ]
    },
    {
      id: "2",
      username: "Naveen",
      mobilenumber: "6374467543",
      location: "Tenkasi",
      details: [
        { id: "1", qualification: "BCA", percentage: "84%" }
      ]
    },
    {
      id: "3",
      username: "Raina",
      mobilenumber: "9944678765",
      location: "Kerala",
      details: [
        { id: "1", qualification: "B.COM", percentage: "90%" }
      ]
    }
  ]);

  const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);

  const handleOpenPopup = () => setIsPopupVisible(true);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setFormData({
      username: '',
      mobilenumber: '',
      location: '',
      qualifications: [
        { id: nextId, qualification: '', percentage: '' }
      ]
    });
    setNextId(nextId + 1); 
  };

  const logOut = ()=>{
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const newQualifications = formData.qualifications.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    
    setFormData({
      ...formData,
      qualifications: newQualifications
    });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { id: nextId, qualification: '', percentage: '' }
      ]
    });
    setNextId(nextId + 1);
  };

  const removeQualification = (index) => {
    const newQualifications = formData.qualifications.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      qualifications: newQualifications
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: (data.length + 1).toString(), 
      username: formData.username,
      mobilenumber: formData.mobilenumber,
      location: formData.location,
      details: formData.qualifications.map(qual => ({
        id: qual.id.toString(),
        qualification: qual.qualification,
        percentage: qual.percentage
      }))
    };

    setData([...data, newEmployee]);
    handleClosePopup();
  };

  const handleExpandToggle = (id) => {
    setExpandedEmployeeId(expandedEmployeeId === id ? null : id);
  };

  return (
    <>
      <div className="container">
        <div className='normal-col'>
          <h2 className='head-line'><span className='single-co'>Tech</span>Lambdas</h2>
        </div>
        <div className='emp-det'>
          <div className='emp-row'>
            <div className='btn-row'>
            <h2 className='single-co'>Employee View</h2>
            <button className='btn-logout' onClick={logOut}>LogOut</button>
            </div>
            <hr />
            <div className='btn-row'>
              <h2>All Employees</h2>
              <button className='btn-new' id="openFormBtn" onClick={handleOpenPopup}>+ Add New</button>
            </div>
            <div className='tab-deat'>
            <table className='wid'>
  <thead>
    <tr>
      <th className='tab-sno' data-label="SNo">SNo</th>
      <th className='emp-tab' data-label="Employee Name">Employee Name</th>
      <th className='emp-tab' data-label="Mobile Number">Mobile Number</th>
      <th className='emp-tab' data-label="Location">Location</th>
    </tr>
  </thead>
  <tbody>
    {data.map((employee, index) => (
      <React.Fragment key={employee.id}>
        <tr>
          <td className='tab-sno'>{index + 1}</td>
          <td className='emp-tab'>
            <button className='btn-expand' onClick={() => handleExpandToggle(employee.id)}>
              {expandedEmployeeId === employee.id ? '-' : '+'}
            </button>
            <span className='spac-expand'>{employee.username}</span>
          </td>
          <td className='emp-tab'>{employee.mobilenumber}</td>
          <td className='emp-tab'>{employee.location}</td>
        </tr>
        {expandedEmployeeId === employee.id && employee.details.length > 0 ? (
          <>
            <tr>
              <th></th>
              <th>S.No</th>
              <th>Qualification</th>
              <th>Percentage</th>
            </tr>
            {employee.details.map((qual, i) => (
              <tr key={qual.id}>
                <td></td>
                <td>{i + 1}</td>
                <td>{qual.qualification}</td>
                <td>{qual.percentage}</td>
              </tr>
            ))}
          </>
        ) : null}
      </React.Fragment>
    ))}
  </tbody>
</table>

            </div>
          </div>
        </div>
        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="popup-close" onClick={handleClosePopup}>X</button>
              <h3>Add New Employee</h3>
              <form onSubmit={handleSubmit} className='emp-form'>
                <div className="form-group">
                  <label htmlFor="username">Employee Name <span className='red'>*</span></label>
                  <input type="text" placeholder='Ex: Sathish' autoComplete='off' className='emp-input' id="username" name="username" value={formData.username} onChange={handleChange} required maxLength={15}/>
                </div>
                <div className="form-group">
                  <label htmlFor="mobilenumber">Mobile Number<span className='red'>*</span></label>
                  <input type="tel" placeholder="Ex: 6356789076" autoComplete="off" id="mobilenumber" name="mobilenumber" maxlength="10" pattern="\d{10}" value={formData.mobilenumber} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location:</label>
                  <input type="text" placeholder='Ex: Kovilpatti' autoComplete='off' id="location" name="location" value={formData.location} onChange={handleChange} maxLength={15}/>
                </div>
                <div className='qua-per'>
                  {formData.qualifications.map((qual, index) => (
                    <div key={qual.id} className="form-group" id='qua-per-total'>
                      <div id='perq'>
                        <label htmlFor={`qualification-${qual.id}`}>Qualification:</label>
                        <input type="text" placeholder='School/Degree' autoComplete='off' id={`qualification-${qual.id}`} name="qualification" value={qual.qualification} onChange={(e) => handleQualificationChange(index, e)} required/>
                      </div>
                      <div id='per'>
                        <label htmlFor={`percentage-${qual.id}`}>Percentage:</label>
                        <input type="number" placeholder='%' autoComplete='off' required id={`percentage-${qual.id}`} name="percentage" value={qual.percentage} min={0} max={100} onChange={(e) => handleQualificationChange(index, e)}/>
                      </div>
                      {formData.qualifications.length > 1 && (
                        <button type="button" className="btn-remove" onClick={() => removeQualification(index)}>x</button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="btn-add" onClick={addQualification}>+ Add New</button>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn-submit">Submit</button>
                  <button type="button" className="btn-cancel" onClick={handleClosePopup}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Employee;
