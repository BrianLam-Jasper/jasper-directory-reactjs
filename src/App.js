import React from 'react';
import './styles/main.scss';
import './styles/app.scss'

import { InputContext } from './InputContext';
import { CityContext } from './CityContext';
import NavFilter from './components/NavFilter';
import Profile from './components/Profile';
import {reducer, initialState, WebContext} from './Reducer'


function App() {
  
  const [inputContext, setInputContext] = React.useState(InputContext)
  const [cityContext, setCityContext] = React.useState(CityContext)

  const store = React.useReducer(reducer, initialState)

  
  return (
    <div className="App">

        <CityContext.Provider value={[cityContext, setCityContext]}>
          <InputContext.Provider value={[inputContext, setInputContext]}>
              <WebContext.Provider value={store}>

                  <NavFilter  />
                  {/* {console.log('app.js inputContext is inputContext: ==>' + inputContext)}
                  {console.log('app.js inputContext is store: ==>' + store)} */}
                  {/* {store.inputValue ? <Profile /> : "No Results."} */}
                  
              </WebContext.Provider>
          </InputContext.Provider>
        </CityContext.Provider>
    </div>
  );
}

export default App;
