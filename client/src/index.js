import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// reducers
import degRatingReducer from './store/reducers/degRating';
import degAuthReducer from './store/reducers/degAuth';
import adminAuthReducer from './store/reducers/adminAuth';
import wineResultsReducer from './store/reducers/wineResults';
import wineListReducer from './store/reducers/wineList';
import degListReducer from './store/reducers/degList';
import degGroupsReducer from './store/reducers/degGroups';
import degResultsReducer from './store/reducers/degResults';
import adminSystemInfoReducer from './store/reducers/SystemInfo';
import systemSettingsReducer from './store/reducers/systemSettings';
import wineGroupsReducer from './store/reducers/wineGroups';
import finalResultsReducer from './store/reducers/finalResults';

//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = compose;

const rootReducer = combineReducers({
  adminAuth: adminAuthReducer,
  degAuth: degAuthReducer,
  degRating: degRatingReducer,
  wineResults: wineResultsReducer,
  wineList: wineListReducer,
  degList: degListReducer,
  degGroups: degGroupsReducer,
  degResults: degResultsReducer,
  systemInfo: adminSystemInfoReducer,
  systemSettins: systemSettingsReducer,
  wineGroups: wineGroupsReducer,
  finalResults: finalResultsReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render( app, document.getElementById('root')
);

serviceWorker.unregister();
