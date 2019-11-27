/**
 * ************************************
 *
 * @module  store.js
 * @author Joseph Michael Corrado
 * @date 11/26/19
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

 import { createStore } from 'redux';
 import { composeWithDevTools } from 'redux-devtools-extension';
 import reducers from '../reducers/index';

 const store = createStore(
   reducers,
   composeWithDevTools()
 );

 export default store;