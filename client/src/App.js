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
const ShowDegGroups = React.lazy(()=> import('./components/AdminMenu/DegGropsList/ShowDegGroups/ShowDegGroups'));
const DegResults = React.lazy(()=> import('./containers/DegResults/DegResults'));

function App(props) {
  useEffect(() => {
    props.onAdminAutoLogin();
    props.onDegAutoLogin();
  })
  let routes = (
    <Switch>
      <Route path="/author" />
      <Route path="/adminzone" render={()=><Suspense fallback={<Spinner />}><AdminLogin /></Suspense>}/>
      <Route path="/" exact component={EntryLogin} />
      <Redirect to="/" /> 
    </Switch>
  );
  if (props.isAdminAuth) {
    routes = (
      <Switch>
        <Route path="/author" />
        <Route path="/results" />
        <Route path="/logout" component={Logout}/>
        <Route path="/deg-groups" render={()=><Suspense fallback={<Spinner />}><ShowDegGroups /></Suspense>} />
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
  } else if (props.isDegustatorAuth) {
    routes = (
      <Switch>
        <Route path="/author" />
        <Route path="/logout" component={Logout}/>
        <Route path="/results" render={()=><Suspense fallback={<Spinner/>}><DegResults /></Suspense>}/>
        <Route path="/rating" render={()=><Suspense fallback={<Spinner />}><Degustator /></Suspense>} />
        <Route path="/" exact render={()=><Suspense fallback={<Spinner />}><Degustator /></Suspense>} />
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
      isAdminAuth: state.adminAuth.token !== null && state.adminAuth.isValid,
      isDegustatorAuth: state.degAuth.token !== null && state.degAuth.isValid
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAdminAutoLogin: () => dispatch(action.adminAuthCheckState()),
    onDegAutoLogin: () => dispatch(action.degAuthCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
