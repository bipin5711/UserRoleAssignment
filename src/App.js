import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import User from './pages/user';
import Roles from './pages/roles';
import { store } from './redux/store'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
     <Router>
      <Routes>
          <Route index element={<User />} />
          <Route exact path="users" element={<User />} />
          <Route exact path="roles" element={<Roles />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
