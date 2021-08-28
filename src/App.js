import { BrowserRouter as Router, Route } from "react-router-dom";
import Album from "./Album";
import Create from "./Create";
import Edit from "./Edit";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Route path="/" component={Login} exact />
      <Route path="/album" component={Album} />
      <Route path="/album-create" component={Create} />
      <Route path="/album-edit" component={Edit} />
    </Router>
  );
}

export default App;
