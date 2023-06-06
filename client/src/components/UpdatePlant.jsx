import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'

const UpdatePlant = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "", 
    botanicalName: "",
    lightRequirements: "",
    description: "",
    price: ""
  });
  const {id} = useParams()

  //useEffect runs when component renders to get onePlant for current values- 
  useEffect(() => {
    axios.get(`http://localhost:8000/api/plants/${id}`)
      .then((res)=> {
        setState(res.data.plant) //.plant bc controller placed in object on getOnePlant
      })
      .catch((err)=>{
        console.log(err)
      })
  }, []);

  const changeHandler = (e) => {
    setState({
      ...state, [e.target.name]:e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:8000/api/plants/${id}`, state)
    .then((res)=>{
      console.log(res.data)
      navigate(`/api/plants/${id}`)
    })
    .catch((err)=>{
      console.log(err);
      const errorResponse = err.response.data.error.errors;
      const errorArray = []
      for (const key of Object.keys(errorResponse)) {//loop through all errors}
        errorArray.push(errorResponse[key].message)
      }
      console.log("Something went wrong submitHandler")
      setErrors(errorArray)
    })
  }

  return (
    <div className="row">
      <p>
          <Link to={"/"} className="link-dark">Dashboard</Link>
      </p>
      <h2>Update Plant:</h2>
      {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
      <div className="form col-md-6 offset-3">
        <form action="" onSubmit={submitHandler} className="col-md bg-light rounded p-2 mb-5">
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

export default UpdatePlant