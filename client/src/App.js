import React, {Suspense, useEffect} from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './hoc/Layout/Layout';
import EntryLogin from './containers/EntryLogin/EntryLogin';
import AdminLogin from './components/Login/AdminLogin/AdminLogin';
import Logout from './components/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import * as action from './store/actions/index';

//lazy loading components
const Degustator = React.lazy(()=> import ('./containers/Degustator/Degustator'));
const AdminZone = React.lazy(()=> import ('./containers/AdminZone/AdminZone'));
const EditWine = React.lazy(()=> import ('./containers//EditWine/EditWine'));
const ShowWineList = React.lazy(()=> import('./components/AdminMenu/WineList/ShowWineTable/ShowWineTable'));
const EditDegustator = React.lazy(()=> import('./containers/EditDegustator/EditDegustator'));
const ShowDegList = React.lazy(()=>import('./components/AdminMenu/DegustatorList/ShowDegList/ShowDegList'));
const EditDegGroups = React.lazy(()=> import('./containers/EditDegGroups/EditDegGroups'));

const isDegustatorAuth = false;

function App(props) {
  useEffect(() => {
    props.onAutoLogin()
  })
  let routes = (
    <Switch>
      <Route path="/about" />
      <Route path="/adminzone" render={()=><Suspense fallback={<Spinner />}><AdminLogin /></Suspense>}/>
      <Route path="/" exact component={EntryLogin} />
      <Redirect to="/" /> 
    </Switch>
  );
  if (props.isAdminAuth) {
    routes = (
      <Switch>
        <Route path="/about" />
        <Route path="/results" />
        <Route path="/logout" component={Logout}/>
        <Route path="/edit-deg-group" render={()=><Suspense fallback={<Spinner />}><EditDegGroups /></Suspense>} />
        <Route path="/deglist" render={()=><Suspense fallback={<Spinner />}><ShowDegList /></Suspense>} />
        <Route path="/edit-degustator" render={()=><Suspense fallback={<Spinner />}><EditDegustator /></Suspense>} />
        <Route path="/winelist" render={()=><Suspense fallback={<Spinner />}><ShowWineList /></Suspense>} />
        <Route path="/editwine" render={()=><Suspense fallback={<Spinner />}><EditWine /></Suspense>} />
        <Route path="/adminzone" render={()=><Suspense fallback={<Spinner />}><AdminZone /></Suspense>} />
        <Route path="/" exact render={()=><Suspense fallback={<Spinner />}><AdminZone /></Suspense>}/>
        <Redirect to="/" />
    </Switch>
    );
  } else if (isDegustatorAuth) {
    routes = (
      <Switch>
        <Route path="/about" />
        <Route path="/logout" component={Logout}/>
        <Route path="/results" />
        <Route path="/rating" render={()=><Suspense fallback={<Spinner />}><Degustator /></Suspense>} />
        <Route path="/" render={()=><Suspense fallback={<Spinner />}><Degustator /></Suspense>} />
        <Redirect to="/" />
      </Switch>
    );
  }
  
  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      isAdminAuth: state.adminAuth.token !== null && state.adminAuth.isValid
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(action.adminAuthCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
