import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar'
import PropertyList from './components/PropertyList'
import DetailPage from './components/DetailPage'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      <Route path='/' element={ <PropertyList></PropertyList>}></Route>
      <Route exact path='/property_list/details/:id' element={ <DetailPage></DetailPage>}></Route>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
