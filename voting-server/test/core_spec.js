import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 days later');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 days later')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 days later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later')
        }),
        entries: List.of('Sunshine')
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 1
          })
        }),
        entries: List()
      }));
    });

    it('it adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 3,
            '28 days later': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 2
          })
        }),
        entries: List()
      }));
    });

  });

});
