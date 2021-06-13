import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';
import AnswerSecretQuestion from '../pages/AnswerSecretQuestion';
import RecoverPassword from '../pages/RecoverPassword';
import RegisterUser from '../pages/RegisterUser';
import AskQuestion from '../pages/AskQuestion';
import NotFound from '../pages/NotFound';
import LawyerQuestions from '../pages/LawyerQuestions';
import UserQuestions from '../pages/UserQuestions';
import QuestionDetails from '../pages/QuestionDetails';
import AnswerQuestion from '../pages/AnswerQuestion';
import Acknowledgment from '../pages/Acknowledgment';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/forget-password" exact component={ForgetPassword} />
    <Route path="/secret-question" exact component={AnswerSecretQuestion} />
    <Route path="/recover-password" exact component={RecoverPassword} />
    <Route path="/register" exact component={RegisterUser} />
    <Route path="/ask-question" isPrivate exact component={AskQuestion} />
    <Route
      path="/lawyer-questions"
      isPrivate
      exact
      component={LawyerQuestions}
    />
    <Route path="/questions" isPrivate exact component={UserQuestions} />
    <Route
      path="/question/details"
      isPrivate
      exact
      component={QuestionDetails}
    />
    <Route path="/answer-question" isPrivate exact component={AnswerQuestion} />
    <Route path="/acknowledgment" exact component={Acknowledgment} />

    <Route path="" exact component={NotFound} />
  </Switch>
);

export default Routes;
