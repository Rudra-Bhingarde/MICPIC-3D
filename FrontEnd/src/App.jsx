import { useState } from "react";
import Homepage from "./homepage";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Roompage from "./roompage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Homepage/>}/>
                <Route path = "/roompage" element = {<Roompage/>}/>
            </Routes>
        </Router>
    );
}

export default App;

