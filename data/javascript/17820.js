import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import peopleReducer from './peopleReducer';
import planetsReducer from './planetsReducer';
import speciesesReducer from './speciesesReducer';
import starshipsReducer from './starshipsReducer';
import vehiclesReducer from './vehiclesReducer';
import fireReducer from './fireReducer';

const rootReducer = combineReducers({
  films: filmsReducer,
  people: peopleReducer,
  planets: planetsReducer,
  specieses: speciesesReducer,
  starships: starshipsReducer,
  vehicles: vehiclesReducer,
  fireReducer: fireReducer
});

export default rootReducer;
