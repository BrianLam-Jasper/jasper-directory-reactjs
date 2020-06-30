import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { InputContext } from '../InputContext'
import { CityContext } from '../CityContext'
import "../styles/profile.scss"


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


/**
 * TODO: add props here to pass user input into query later on (use CityName and StateInitials for fitler, use ZipCode for distance fitler)
 * {variables: {after: null}}
 */
function Profile(){
  // inputContext -> true/false to get user input city name
  // cityContext --> the id of the city name
    const [inputContext, setInputContext] = React.useContext(InputContext)
    const [cityContext, setCityContext] = React.useContext(CityContext)

    
    const {loading, error, data, fetchMore} = useQuery(GET_PROFILE_NAMES, 
      {variables: {after: null, regionName: cityContext.toString() }}
    )

    if (loading) return <p>Loading...</p>
    if(error) return <p>Error...</p>
    
    
    return(
      <>
        <div className="profile">
            {
                data &&
                data.listingRegions &&
                data.listingRegions.edges[0] && 
                data.listingRegions.edges[0].node && 
                data.listingRegions.edges[0].node.jobListings && 
                data.listingRegions.edges[0].node.jobListings.edges.map(
                  ({node}) => (
                    <div className="profile__wrapper" key={node.id}>

                        <div className="profile__photo">
                          {/* <img src="https://source.unsplash.com/140x140/?nature" alt="profile"/> */}
                        </div>

                        <ul className="profile__list">
                          <li>{node.title}</li>
                          <li>{node.termNames[1]}</li>
                          <li>{node.matchLocation}</li>
                        </ul>

                    </div>
                  )                
                )
            }
        </div>

   
        <button onClick={()=>{

          const {endCursor} = data && data.listingRegions && data.listingRegions.edges[0] && data.listingRegions.edges[0].node && data.listingRegions.edges[0].node.jobListings.edges && data.listingRegions.edges[0].node.jobListings.pageInfo
        
          fetchMore({
            variables: {after: endCursor},

            // merge old results to new results
            updateQuery: (prevResult, {fetchMoreResult}) => {                            
              fetchMoreResult.listingRegions.edges[0].node.jobListings.edges = [
                ...prevResult && prevResult.listingRegions && prevResult.listingRegions.edges[0] && prevResult.listingRegions.edges[0].node && prevResult.listingRegions.edges[0].node.jobListings.edges,
                ...fetchMoreResult && fetchMoreResult.listingRegions && fetchMoreResult.listingRegions.edges[0] && fetchMoreResult.listingRegions.edges[0].node && fetchMoreResult.listingRegions.edges[0].node.jobListings.edges
              ]

              return fetchMoreResult
            }
          })
        }}>Next 3</button> 


        
      </>
    )
    
        
}


export default Profile