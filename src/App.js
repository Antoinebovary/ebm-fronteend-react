import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import ChangePassword from './components/forgot/ChangePassword';
import ApplicationPage from './components/Application/ApplicationPage';
import UserHome from './components/userHome/UserHome';
import ApplicationDetail from './components/Application/ApplicationDetail';
import UnAuthorized from './components/Other/UnAuthorized';
import NotFound from './components/Other/NotFound';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import Admin from './components/admin/Admin';
import ForgotPassword from './components/forgot/ForgotPassword';
import ResetPassword from './components/forgot/ResetPassword ';
// import Home from './components/userHome/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/' element={<Login />} />
        <Route exact path='/forgot' element={<ChangePassword />} />
        <Route exact path='/home' element={<UserRoute><UserHome /></UserRoute>} />
        <Route exact path='/application' element={<UserRoute><ApplicationPage /></UserRoute>} />
        <Route exact path='/applicationDetail/:tinNumber' element={<UserRoute><ApplicationDetail /></UserRoute>} />
        <Route exact path='/unauthorized' element={<UnAuthorized />} />
        <Route path='/*' element={<NotFound />} />
        <Route exact path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route exact path='/reset-password/:token' element={<ResetPassword />} />
        {/* <Route exact path='/Home/' element={<Home/>} /> */}
      </Routes>
    </Router>

  );
}

export default App;
