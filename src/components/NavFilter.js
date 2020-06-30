import React from 'react'
import {useQuery, useLazyQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { InputContext } from '../InputContext'
import { CityContext } from '../CityContext'
import Profile from './Profile'
import PlacesAutocomplete from './GooglePlaces'

const GET_PROFILE_NAMES = gql`
query ProfileQuery($after: String, $regionName: [String]) {
  listingRegions(first: 3, where: {name: $regionName}) {
    edges {
      node {
        jobListings(first: 3, after: $after) {
          edges {
            cursor
            node {
              termNames
              title
              matchLocation
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

    let parseLocation = []
    let newParseLocation = ""



    React.useEffect(()=>{
      async function fetchData(){
          const fetchRegion = await fetch('https://jasperbrian-lam-local.local/wp-json/wp/v2/job_listing_region')
          const jsonRegion = await fetchRegion.json()
          setRegion(jsonRegion)
      }
      fetchData()
      
      if(locationInput !== ""){
        setInputContext(true)
        console.log('useEffect here works')
      }
      
      console.log('useEffect: ' + inputContext + ' ' + cityContext)
  },[inputContext, cityContext])
    



    // const [getProfile, {loading, data}] = useLazyQuery(GET_PROFILE_NAMES)
    // if (loading) return <p>Loading ...</p>;
  

      // validate with WP to see if a region exists in the server.
      const SearchSubmit2 = () => {

        setLocationInput(refLocation.current.value)
        
        parseLocation = locationInput.match(/[,]|.*|(?=, United States)/g)

        newParseLocation = String(parseLocation).replace(/[,]/g,'')
        
        region.forEach((entry)=>{
            if(newParseLocation.includes(entry.name)){
                setInputContext(true)
                setCityContext(entry.name)
                return 
            }
            else{
                return false
            }
        })
      }

    
    return (
        <div>

            <div className="search">
                {/* <input type="text" placeholder="Doctor Name/Specialties/Issues" className="search__doctor"/> */}
                <input ref={refLocation} defaultValue="Chicago / Brooklyn / Pittsburgh / St. Louis" placeholder="City/State/Zip Code" type="text" className="search__location"/>
                {/* <button onClick={()=>getRegionInfo()} type="submit" className="search__submit">getRegionInfo</button> */}

                {/* <PlacesAutocomplete refLoc={refLocation} /> */}

                <button onClick={SearchSubmit2} type="submit" className="search__submit">Find Locations</button>
            </div>         
                        
        </div>
    )
}
