import logo from './mandala.jpg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
// import ViewAllPlants from './components/ViewAllPlants';
import ViewOnePlant from './components/ViewOnePlant';
// import NewPlant from './components/NewPlant';
import UpdatePlant from './components/UpdatePlant';
import Main from './views/Main';


function App() {

  // const [state, setState] = useState("");

  // const [plant, setPlant] = useState([]);

  // useEffect(()=> {
  //   axios.get("http://localhost:8000/api/plants")
  //   .then((res)=>{
  //     setState(res.data)
  //   })
  //   .catch((err)=> {
  //     console.log(err)
  //   })
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="mt-4 mb-0">Plants, plants, plants </h1>
      </header>

      {/* <h2>{JSON.stringify(state)}</h2> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to= "/api/plants"/>}/>
          <Route path="/api/plants" element={<Main/>}/>
          <Route path="/api/plants/:id" element={<ViewOnePlant/>}/>
          <Route path="/api/plants/edit/:id/" element={<UpdatePlant/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
