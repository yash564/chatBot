import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Join from "./Component/Join/Join";
import Chat from "./Component/Chat/Chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Join}></Route>
        <Route path="/chat" component={Chat}></Route>
      </Switch>
    </Router>
  );
}

export default App;
