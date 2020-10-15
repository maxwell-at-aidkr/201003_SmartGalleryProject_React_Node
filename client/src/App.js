import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage.js";
import LoginPage from "./components/views/LoginPage/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage/RegisterPage.js";
import WorkUploadPage from "./components/views/WorkUploadPage/WorkUploadPage";
import Auth from "./hoc/auth";

function App() {
  return (
<Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          {/* TODO: 추후 관리자만 접속 가능하도록 수정 */}
          <Route exact path="/work/upload" component={Auth(WorkUploadPage, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
