import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { InputContext } from '../InputContext'
import { CityContext } from '../CityContext'
import "../styles/profile.scss"
import Spinner from 'react-bootstrap/Spinner'

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
              matchCompanyWebsite
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


function Profile(){
  // inputContext -> true/false to get user input city name
  // cityContext --> the id of the city name
    const [inputContext, setInputContext] = React.useContext(InputContext)
    const [cityContext, setCityContext] = React.useContext(CityContext)

    
    const {loading, error, data, fetchMore} = useQuery(GET_PROFILE_NAMES, 
      {variables: {after: null, regionName: cityContext.toString() }}
    )

    if (loading) return <Spinner variant="primary" animation="grow" size="lg" />
    if(error) return <p>Error...</p>
    
    // console.log('Profile.js is called here')
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
                  ({node}, index) => (
                    <div className="profile__wrapper" key={node.id}>
                        <div className="profile__index">{index+1}</div>

                        <div className="profile__photo">
                          <img src="https://source.unsplash.com/240x240/?nature" alt="profile"/>
                        </div>

                        <ul className="profile__list">
                          <li>{node.title}</li>
                          <li><a href={node.matchCompanyWebsite} target="_blank">{node.matchCompanyWebsite}</a></li>
                          <li>{node.termNames[1]}</li>
                          <li>{node.matchLocation}</li>
                        </ul>

                    </div>
                  )                
                )             
            }




            
                <button class="btn fetch-more" onClick={()=>{
                
                  
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
                  }).catch(e => {alert('fetchMore failed')})
                  
                }}>Next 10</button> 
                
               

        </div>
      </>
    )
    
        
}


export default Profile