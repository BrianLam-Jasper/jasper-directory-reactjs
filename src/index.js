import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloClient from 'apollo-boost'

import { ApolloProvider} from "@apollo/react-hooks";
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import Profile from './components/Profile'

import PlacesAutocomplete from './components/GooglePlaces'

import NavFilter from './components/NavFilter'
import SearchSubmit from './components/NavFilter'
import App from './App'

const client = new ApolloClient({
  uri: 'https://jasperbrian-lam-local.local/graphql'
})


ReactDOM.render(
  
    <>
    {/* <NavFilter /> */}

    {/* <PlacesAutocomplete /> */}


    <ApolloProvider client={client}>
      
      <App />

    </ApolloProvider>



    </>

  ,
  document.getElementById('root')
);