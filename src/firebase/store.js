import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';


var firebaseConfig = {
  apiKey: "AIzaSyB86Je8ILbbAh_wOhjqmC8ELUo_SbcSkds",
  authDomain: "contableezee.firebaseapp.com",
  databaseURL: "https://contableezee.firebaseio.com",
  projectId: "contableezee",
  storageBucket: "contableezee.appspot.com",
  messagingSenderId: "453406212176"
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};

const store = createStoreWithFirebase(rootReducer, initialState,
  compose(reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;