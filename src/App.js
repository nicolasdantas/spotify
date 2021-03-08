import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DisplayAllAlbums from "./components/DisplayAllAlbums"
import CreateAlbum from "./components/CreateAlbum"
import CreateSong from "./components/CreateSong"
import Navbar from './components/Navbar'

import {EventEmitter} from "fbemitter"

function App() {

  global.emitter = new EventEmitter();

  // let subscription = global.emitter.addListener("testEvent",(args)=>{
  //     console.log("Here --->",args);
  // })

  return (
   <Router>
       <Navbar/>
     <Switch>
         <Route exact path="/albums">
             <DisplayAllAlbums />
         </Route>
         <Route exact path="/create-album">
             <CreateAlbum />
         </Route>
         <Route path="/add-songs/:id">
             <CreateSong />
         </Route>
     </Switch>
   </Router>
  );
}

export default App;
