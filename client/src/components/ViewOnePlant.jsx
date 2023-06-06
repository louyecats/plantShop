import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'


const ViewOnePlant = () => {

  const {id} = useParams()
  const [PlantDetail, setPlantDetail] = useState({})

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/plants/${id}`)
    .then((res)=>{
      console.log(res.data.plant)
      setPlantDetail(res.data.plant) //use .plant because on controller getOnePlant puts in object with key: plant
    })
    .catch((err)=>{
      console.log(err)
    })
  },[]) //empty dependency array loads data when component is mounted

  return (
    <div className="col-md-6 mx-auto bg-light rounded p-3">
      <h2>{PlantDetail.name}</h2>
      <p>Botanical Name: {PlantDetail.botanicalName}</p>
      <p>Description: {PlantDetail.description}</p>
      <p>Light Requirements: {PlantDetail.lightRequirements}</p>
      <p>Price: ${PlantDetail.price}</p>
      <p>
          <Link to={"/"} className="link-dark">Dashboard</Link>
      </p>
      <p>
          <Link to={"/api/plants/edit/" + PlantDetail._id}>Edit Plant</Link>
      </p>
    </div>
  )
}

export default ViewOnePlant