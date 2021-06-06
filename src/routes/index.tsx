import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';
import AnswerSecretQuestion from '../pages/AnswerSecretQuestion';
import RecoverPassword from '../pages/RecoverPassword';
import RegisterUser from '../pages/RegisterUser';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/forget-password" exact component={ForgetPassword} />
    <Route path="/secret-question" exact component={AnswerSecretQuestion} />
    <Route path="/recover-password" exact component={RecoverPassword} />
    <Route path="/register" exact component={RegisterUser} />
  </Switch>
);

export default Routes;
