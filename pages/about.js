import React from "react"

import Head from "next/head"

import { db } from "../Firebase/FirebaseInit"
import { collection, onSnapshot } from "firebase/firestore"

import { Grid, Button, Typography, Avatar } from "@mui/material"

import CountryRoad from "../components/Animations/CountryRoad"


export default class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            profiles: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        
    }


    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        const profilesRef = collection(db, "profiles")

        this.unsub = onSnapshot(profilesRef, (profilesSnap) => {

            this.setState({profiles: []})

            profilesSnap.forEach((profile) => {
                this.setState(prevState => ({
                    profiles: [...prevState.profiles, profile.data()]
                }))
            })
        })


    }
    
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this.unsub()
        
    }
      
    render() {

        return (
            <div>
                <Head>
                <title>About</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="With over 500 driveways completed on whidbey island, we have a skilled, focused, talented team and the best equipment. We have extensive experience building and restoring gravel driveways, roads and parking areas. We provide fast, free estimates and will work with you to meet your needs." />
                <meta name="keywords" content="Who we are, meet the team, about us" />

                
                </Head>

                <Grid container alignItems="center" >
                    <Grid item xs={12} sm={6} md={6}>
                        <>
                        <Typography align="center" variant="h1" style={{fontFamily: "Anton", color: "#FFFFFF", margin: "5%"}}> ABOUT US</Typography>
                        </>
                        
                        
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        
                    <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#000000", margin: "5%", marginTop: "5%"}}> Our team is efficient, knowledgeable, and built to serve, and equipped with specialized machines that enable us to provide you with the best possible solution within your budget.</Typography>

                    </Grid>
                </Grid>

                <Grid container style={{backgroundColor: "#000000", paddingBottom: "5%"}} >
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography align="left" variant="h3" style={{fontFamily: "Anton", color: "#E5650F", margin: "10%", marginBottom: 0}}> OUR PROCESS</Typography>
                        <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#FFFFFF", margin: "5%"}}> We take the worry out of driveway and road maintenance by implementing a Country Road developed process that is industry leading and effective. Whether you're interested in reclaiming and utilizing what is already in place or adding a durable layer of new high quality gravel, we have the tools and expertise you need. Our skilled team and top equipment allow us to be highly productive and ensure you are highly satisfied with the outcome.</Typography>
                        <img src={"/OrangeStamp.svg"} alt={"Stamp"} style={{ width: "50%", display: "flex", margin: "auto", padding: "10%", paddingBottom: 0, paddingTop: 0}} />

                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                    <img src={"/Truck.png"} alt={"Truck"} style={{ width: "50%", display: "flex-inline", padding: "10%", paddingBottom: 0}} />
                    <img src={"/Equipment.png"} alt={"Equipment"} style={{ width: "50%", display: "flex-inline", padding: "10%", paddingBottom: 0}} />

                    <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#FFFFFF", margin: "5%", marginTop: "5%"}}> "Excellent company! Unlike other companies that we have dealt with, Clayton actually showed up on time for the estimate as did his EXCELLENT CREW on the day the work was to be performed. The resurfacing of our LONG drive was done in a day and the cost was well within our budget. We are very pleased with the overall quality of the drive and it was a true pleasure working with this company of positive young professionals. We highly recommend them!”
-    D. J.</Typography>

                    </Grid>
                </Grid>

                <div style={{backgroundColor: "#FFFFFF"}}>
                <Typography align="left" variant="h3" style={{fontFamily: "Anton", color: "#000000", padding: "5%", paddingBottom: 0}}> MEET THE TEAM </Typography>

                {this.state.profiles.length > 0 ? this.state.profiles.map((profile, index) => {
                    
                    return (
                    <Grid container alignItems="center" key={index}>
                        <Grid item xs={12} sm={12} md={6} >
                        <Avatar src={profile.profilePic} variant="square" alt={"ProfilePic"} style={{ width: 250, height: 300, borderRadius: 50, display: "flex", margin: "auto", marginTop: "5%", marginBottom: "5%"}} />

                        <Typography align="center" variant="h4" style={{fontFamily: "Anton", color: "#000000"}}> {profile.name} </Typography>
                        <Typography align="center" variant="h5" style={{fontFamily: "Signika", color: "#000000", marginBottom: "2%"}}> {profile.title} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} >
                        <Typography align="center" variant="h5" style={{fontFamily: "Signika", color: "#000000", padding: "5%", paddingBottom: 0, marginBottom: "2%"}}> {profile.description} </Typography>

                        </Grid>
                    </Grid>
                    )
                })
                :
                null
                }

                </div>


                

              


                

                   
                           
            </div>
        )
    }
    
}