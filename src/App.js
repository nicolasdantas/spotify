import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayAllAlbums from "./components/DisplayAllAlbums";
import CreateAlbum from "./components/CreateAlbum";
import CreateSong from "./components/CreateSong";
import Navbar from "./components/Navbar";
import { ToastProvider } from "react-toast-notifications";

import { EventEmitter } from "fbemitter";

function App() {
  global.emitter = new EventEmitter();

  // let subscription = global.emitter.addListener("testEvent",(args)=>{
  //     console.log("Here --->",args);
  // })

  return (
    <ToastProvider autoDismiss autoDismissTimeout={6000} placement="top-right">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={DisplayAllAlbums} />
          <Route exact path="/create-album" component={CreateAlbum} />
          <Route path="/add-songs/:id" component={CreateSong} />
        </Switch>
      </Router>
    </ToastProvider>
  );
}

export default App;
