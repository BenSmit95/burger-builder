import reducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    expect(reducer(initialState, { 
      type: actionTypes.AUTH_SUCCESS,
      token: 'some-value',
      userId: 'some-user-id'
    })).toEqual({...initialState, token: 'some-value', userId: 'some-user-id' });
  })
});