import React, { useState } from 'react'
import axios from 'axios';
import NewPlant from '../components/NewPlant';
import ViewAllPlants from '../components/ViewAllPlants';
import {useNavigate} from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate();
    //state for one plant in array
    const [state, setState] = useState([]);

    const removeFromDom = plantId => {
        // setPlant(plant.filter(plant => plant._id != plantId)); //We could also write this in our PlantList component
        const newList = state.filter((item, index)=>(index !== plantId))
        setState(newList)

        axios.delete(`http://localhost:8000/api/plants/${plantId}`)
            .then((res)=>{
                console.log(res)
                navigate("/") //redirect refresh
            })
            .catch((err)=>{
                console.log(err)
            });
    }

    return (
        <div className="d-flex justify-content-center">
    	{/* PlantForm and Plant List can both utilize the getter and setter established in their parent component: */}
           <NewPlant/>
            <hr/>
           <ViewAllPlants state={state} setState={setState} removeFromDom={removeFromDom}/>
        </div>
    )
}
export default Main;