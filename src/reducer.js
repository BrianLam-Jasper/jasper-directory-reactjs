import React from 'react'
import { InputContext } from './InputContext';



export const initialState = {
  inputValue: false
}
  

export function reducer(state, action) {

  const { type, payload } = action;
  switch (type) {

    case 'FALSE_LOCATION': {
      return { ...state, inputValue: false }
    }
    case 'TRUE_LOCATION': {
      console.log('TRUE_LOCATION called: ' + payload)
      return {...state, inputValue: true}
    }

    default: return state;
  }
}

export const WebContext = React.createContext(InputContext)
