import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const ViewAllPlants = ({state, setState, removeFromDom}) => {
  // const [state, setState] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/plants")
      .then((res) => {
        setState(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },[]) //empty dependency array calls axios to get all once component is mounted
//browser inspect tool > components > Select Route .jsx on > hooks > State: (see if array of objects in state)
  return (
    <div className="col">
      <h2>Shop All Plants:</h2>
      <div className="bg-light rounded p-2 m-5">
          {
            state.map((oneplant, index) => {
            return <div key={index} className="bg-white m-3 p-2 border rounded">
                <li className="list-group-item h3">{oneplant.name}</li>
                <li className="list-group-item h5">{oneplant.botanicalName}</li>
                {/* <li className="list-group-item h4 mb-0">{oneplant.lightRequirements}</li> */}
                <li className="list-group-item">Price: ${oneplant.price}</li>
                {/* :id gets its value when clicking this element to assign the "id" param & take us to a path */}
                <p className="fs-6 mt-3">
                    <Link to={`/api/plants/${oneplant._id}`} className="link-dark">View Details</Link>
                </p>
                <p>
                    <Link to={"/api/plants/edit/" + oneplant._id}>Edit Plant</Link>
                </p>
                <button className="btn btn-danger mt-3" onClick={(e)=>{removeFromDom(oneplant._id)}}>Delete Item</button>
            </div>
            })
          }
      </div>
    </div>
  )
}

export default ViewAllPlants