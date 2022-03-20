import { Switch, Route, Redirect } from 'react-router-dom';
import Main from "../main"
import Timetable from "../timetable";
import Branches from "../branches";

function App() {
  return (
    <div>
      <Switch>
        <Redirect exact from='/' to='/main' />
        <Route path='/main' component={Main}/>
        <Route path='/timetable' component={Timetable}/>
        <Route path='/branchers' component={Branches}/>
      </Switch>

    </div>
  );
}

export default App;
