import React from 'react';
import './styles/main.scss';
import { InputContext } from './InputContext';
import { CityContext } from './CityContext';
import NavFilter from './components/NavFilter';
import Profile from './components/Profile';


function App() {
  
  const [inputContext, setInputContext] = React.useState(InputContext)
  const [cityContext, setCityContext] = React.useState(CityContext)

  // const store = React.useReducer(reducer, initialState)

  // React.useEffect(()=>{
  //   console.log('app.js is true: ' + inputContext)
  // },[cityContext,inputContext])

  
  
  return (
    <div className="App">


      <CityContext.Provider value={[cityContext, setCityContext]}>
        <InputContext.Provider value={[inputContext, setInputContext]}>

          <NavFilter  />
          
          {inputContext ? <Profile /> : "No Results."}

        </InputContext.Provider>
      </CityContext.Provider>
      
    </div>
  );
}

export default App;
