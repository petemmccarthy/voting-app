import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducerr.js';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

});
