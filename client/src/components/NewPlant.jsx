import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const NewPlant = () => {

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "", 
    botanicalName: "",
    lightRequirements: "",
    description: "",
    price: ""
  });

  const changeHandler = (e) => {
    setState({
      ...state, [e.target.name]:e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/api/plants", state)
    .then((res)=>{
      console.log(res.data)
      navigate("/api/plants")
    })
    .catch((err)=>{
      console.log(err);
      const errorResponse = err.response.data.errors;
      const errorArray = []
      for (const key of Object.keys(errorResponse)) {//loop through all errors}
        errorArray.push(errorResponse[key].message)
      }
      console.log("Something went wrong submitHandler")
      setErrors(errorArray)
    })
  }

  return (
    <div className="col">
      <h2>Create New Plant:</h2>
          {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
      <div className="form m-5">
        <form action="" onSubmit={submitHandler} className="col-md bg-light rounded p-3">
          <div className="form-group">
            <label htmlFor="name">Name:</label> 
            <input type="text" name="name" id="name" className="form-control" onChange={changeHandler} value={state.name}/>
          </div>
          <div className="form-group">
            <label htmlFor="botanicalName">Botanical Name:</label> 
            <input type="text" name="botanicalName" id="botanicalName" className="form-control" onChange={changeHandler} value={state.botanicalName}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea className="form-control" name="description" id="description" rows="7" onChange={changeHandler} value={state.description}/>
          </div>
          <div className="form-group">
            {/* <label>Light Requirements:</label>
            <select class="form-select" aria-label="Light Requirements:">
              <option selected>Open this select menu</option>
              <option value="full sun">Full Sun</option>
              <option value="partial sunlight">Partial Sunlight</option>
              <option value="full shade">Full Shade</option>
            </select> */}
            <label htmlFor="lightRequirements">Light Requirements:</label> 
            <input type="text" name="lightRequirements" id="lightRequirements" className="form-control" placeholder="full sun, partial sunlight or full shade" onChange={changeHandler} value={state.lightRequirements}/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label> 
            <input type="number" name="price" id="price" className="form-control" onChange={changeHandler} value={state.price}/>
          </div>
          <button className="btn btn-info mt-3">Submit</button>
        </form>

      </div>

    </div>
  )
}

export default NewPlant