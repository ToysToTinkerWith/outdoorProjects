import React from "react"

import { db } from "../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, limit, where } from "firebase/firestore";

import { Grid, Typography } from "@mui/material"

import ImgsDisplay from "./ImgsDisplay";

export default class PostsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        
    }

    componentDidMount() {
        
        const postRef = collection(db, "requests")

        const postQuery = query(postRef, where("completed", "==", true), orderBy("scheduled", "desc"),  limit(4))

        this.unsub = onSnapshot(postQuery, (postSnap) => {

        this.setState({
            posts: []
        })
            
        postSnap.forEach((post) => {
            console.log(post.data())
            this.setState(prevState => ({
                posts: [...prevState.posts, [post.data(), post.id]]
            }))
        });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    render() {

        return (
            <>
            <Grid container >
            {this.state.posts.length > 0 ?
            this.state.posts.map((post, index) => {

                let postDate = new Date(post[0].scheduled.replace(/-/g, '\/'))
                
                
                return (
                    <Grid item key={index} xs={12} sm={6} style={{padding: "2%", borderRight: "1px solid white"}}>
                        <Typography variant="h3" style={{color: "#E5650F", fontFamily: "Anton", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {post[0].title}</Typography>
                        <Typography variant="h6" style={{color: "#FFFFFF", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {post[0].description}</Typography>
                        <Typography variant="h4" style={{color: "#FFFFFF", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {postDate.toLocaleDateString()}</Typography>

                        <ImgsDisplay postId={post[1]} />
                    </Grid>
                        
                        
                        )
                    })
                    
                    :
                    null
                    }
            </Grid>

           
            </>
        )
    }
}