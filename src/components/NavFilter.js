import React from 'react'
import {useQuery, useLazyQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { InputContext } from '../InputContext'
import { CityContext } from '../CityContext'
import Profile from './Profile'
import PlacesAutocomplete from './GooglePlaces'
// import {initialState, reducer} from '../reducer'
import {WebContext} from '../Reducer'
import "../styles/nav-filter.scss"


const GET_PROFILE_NAMES = gql`
query ProfileQuery($after: String, $regionName: [String]) {
  listingRegions(first: 10, where: {name: $regionName}) {
    edges {
      node {
        jobListings(first: 10, after: $after) {
          edges {
            cursor
            node {
              termNames
              title
              matchLocation
              matchCompanyWebsite
              id
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
}
`



/***
 * * User enters 1 or more fields (specialties/location)
 * * Parse user input.
 * * Pass the parse data into graphql query as arguments.
 */
export default function NavFilter() {
    // Input Context
    const [inputContext, setInputContext] = React.useContext(InputContext)
    const [cityContext, setCityContext] = React.useContext(CityContext)
    
    const [locationInput, setLocationInput] = React.useState("")
    const [region, setRegion] = React.useState(null)
    const refLocation = React.useRef(null)

    let parseLocation = ""
    let newParseLocation = ""

    
    // const [{inputValue}, dispatch] = React.useReducer(reducer, initialState)
    // const [count, dispatch] = React.useReducer(reducer, 1)
    const [ { inputValue }, dispatch ] = React.useContext(WebContext);


    React.useEffect(()=>{
      async function fetchData(){
          const fetchRegion = await fetch('https://jasperbrian-lam-local.local/wp-json/wp/v2/job_listing_region')
          const jsonRegion = await fetchRegion.json()
          setRegion(jsonRegion)
      }
      fetchData()
         
  },[])
    

    // const [getProfile, {loading, data}] = useLazyQuery(GET_PROFILE_NAMES)
    // if (loading) return <p>Loading ...</p>;
  

      // validate with WP to see if a region exists in the server.
      const SearchSubmit = () => {
        let isTrue = false
        let validCity = ""           

        parseLocation = cityContext.match(/[,]|.*|(?=, United States)/g)

        newParseLocation = String(parseLocation).replace(/[,]/g,'')
        
        region.forEach((entry)=>{
            if(newParseLocation.includes(entry.name)){
                setInputContext(true)
                setCityContext(entry.name)
                isTrue = true
                validCity = entry.name
                return 
            }
            
        })

        // console.log(isTrue)
        // console.log(validCity)

        if(isTrue){
          handleClick()          
        }

        console.log('locationInput is: ' + locationInput)
      } //end of SearchSubmit

     

      const handleClick = () => {
        dispatch({
          type: 'TRUE_LOCATION',
          payload: true
        })
      }
    
    
    return (
        <div>

            <div className="search">
                 
                  <PlacesAutocomplete />
                  
                  {console.log('navFilter.js: ' + cityContext)}

                  {/* <input ref={refLocation} defaultValue="Chicago / Brooklyn / Pittsburgh / St. Louis" placeholder="City/State/Zip Code" type="text" className="search__location"/> */}
                  
                 
                
                  <button onClick={SearchSubmit} type="submit" className="search__submit">
                    <i className="fas fa-search"></i>
                  </button>
                

                {/* <div>{inputValue}</div>
                <button onClick={handleClick}>Click</button> */}


                

                
            </div>         

            {inputValue ? <Profile /> : null}

                        
        </div>
    )
}
