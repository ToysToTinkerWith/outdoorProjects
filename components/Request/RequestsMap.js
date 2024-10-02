import React from "react"

import { db } from "../../Firebase/FirebaseInit"
import { collection, onSnapshot } from "firebase/firestore"

import GoogleMapReact from 'google-map-react'
import Geocode from "react-geocode";

import RequestDisplay from "./RequestDisplay";

import { Button, Modal, Card, Typography, IconButton } from "@material-ui/core"

import HomeIcon from '@mui/icons-material/Home';

const getMapOptions = (maps) => {

  return {
      streetViewControl: true,
      scaleControl: true,
      fullscreenControl: false,
      scrollwheel: false,
      
      gestureHandling: "greedy",

      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.SATELLITE,
      mapTypeControlOptions: {
          style: maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: maps.ControlPosition.TOP_LEFT,
          mapTypeIds: [
              maps.MapTypeId.ROADMAP,
              maps.MapTypeId.SATELLITE,
              maps.MapTypeId.HYBRID
          ]
      },

      zoomControl: true,
      clickableIcons: false
  };
}

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("us");

export default class RequestsMap extends React.Component {

   constructor() {
    super()
    this.state = {
      requests: [],
      zoom: 10,
      lat: 48.1983,
      lng: -122.4395,
      request: null
    }
  }

  componentDidMount() {

    
    const requestsRef = this.props.query


    this.unsub = onSnapshot(requestsRef, (requestsSnap) => {

      this.setState({
          requests: [],
      })

      requestsSnap.forEach((request) => {

        let requestData = request.data()

        console.log(requestData.address)

        if (requestData.address) {

            Geocode.fromAddress(requestData.address + " Whidbey Island").then(
              (response) => {
                console.log(response.results)
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng)
                requestData.lat = lat
                requestData.lng = lng
                this.setState(prevState => ({
                  requests: [...prevState.requests, [requestData, request.id]],
                }))
              },
              (error) => {
                  console.log(error)
                  requestData.lat = 0
                  requestData.lng = 0
                  this.setState(prevState => ({
                      requests: [...prevState.requests, [requestData, request.id]],
                  }))
              }
            )
     
            
        }

        else {
            requestData.lat = 0
            requestData.lng = 0
            this.setState(prevState => ({
                requests: [...prevState.requests, [requestData, request.id]],
            }))
        }

          

      });


  });

  }

  componentWillUnmount() {
    this.unsub()
  }



  render() {

    var width = this.state.zoom * 2

    return (
      <div>
        <div style={{ height: "100vh",  width: "100%"}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY}}
            options={getMapOptions}
            center={{lat: this.state.lat, lng: this.state.lng}}
            zoom={this.state.zoom}        
            onChange={({ zoom, center }) => {
              this.setState({
                zoom: zoom,
                lat: center.lat,
                lng: center.lng
              })
            }
            }    
          >

            {this.state.requests.length > 0 ? this.state.requests.map((request, index) => {
              return <IconButton key={index} lat={request[0].lat} lng={request[0].lng} onClick={() => this.setState({request: request[1]})}>
                        <HomeIcon style={{color: "#E5650F"}} />
                  </IconButton>
            }) :  null }

          
          
            
          
          </GoogleMapReact>

          {this.state.request ? 
          <Modal 
          disableEnforceFocus 
          open={true} 
          onClose={() => this.setState({request: null})}
          style={{
              overflowY: "auto",
              overflowX: "hidden"
          }}>
              <Card>
              <Button variant="contained" color="primary" style={{margin: "5%", padding: 10, backgroundColor: "#E5650F"}} onClick={() => this.setState({request: null})}> Back </Button>
              <RequestDisplay closeModal={() => this.setState({request: null})} requestId={this.state.request} />
              </Card>
          
          </Modal>
          
              :
              null
          }
          
          
        </div>

        

      </div>
  )
  }
    
    
  
}


