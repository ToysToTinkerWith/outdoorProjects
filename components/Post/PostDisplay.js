import React from "react"

import { db } from "../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";

import CommentsDisplay from "./CommentsDisplay"

import { Card, Typography, Button, ImageList, ImageListItem, ImageListItemBar, IconButton, Modal } from "@mui/material"

import InfoIcon from '@mui/icons-material/Info';



export default class PostDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            imgs: [],
            img: null
        };
        
    }

    componentDidMount() {

        const postRef = doc(db, "requests", this.props.postId)

        this.unsub = onSnapshot(postRef, (postSnap) => {

            this.setState({
                post: postSnap.data()
            })


        })
        
        const imgsRef = collection(db, "requests", this.props.postId, "imgs")

        const imgsQuery = query(imgsRef, orderBy("created", "asc"))

        this.unsub2 = onSnapshot(imgsQuery, (imgsSnap) => {

        this.setState({
            imgs: []
        })
            
        imgsSnap.forEach(async (img) => {
                this.setState(prevState => ({
                    imgs: [...prevState.imgs, [img.data(), img.id]]
                }))
            });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    render() {

        let postDate

        if (this.state.post) {
            postDate = new Date(this.state.post.scheduled.replace(/-/g, '\/'))
        }

        return (
            <>
            {this.state.post ?
            <>
            <Typography variant="h3" style={{color: "#E5650F", fontFamily: "Anton", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {this.state.post.title}</Typography>
            <Typography variant="h6" style={{color: "#000000", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {this.state.post.description}</Typography>
            <Typography variant="h4" style={{color: "#000000", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {postDate.toDateString()}</Typography>
            </>
            :
            null
            }
            
            <ImageList >
            {this.state.imgs.length > 0 ?
            this.state.imgs.map((img, index) => {
                return (
                    <ImageListItem key={index}>
                    <img
                        src={img[0].url}
                        alt="img"
                        loading="lazy"
                    />
                    
                    <ImageListItemBar
                        title={img[0].message}
                        actionIcon={
                        <IconButton
                            onClick={() => this.setState({img: img})}
                        >
                            <InfoIcon color="secondary" />
                        </IconButton>
                        }
                    />
                    </ImageListItem>
                )
                    })
                    :
                    null
                    }
                    </ImageList>
                        
                    {this.state.img ? 
                    <Modal 
                    open={true} 
                    onClose={() => this.setState({img: null})}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <Card>
                        <Button variant="contained" color="primary" style={{margin: "5%", marginTop: "2%", marginBottom: "2%"}} onClick={() => this.setState({img: null})}> Back </Button>
                        <CommentsDisplay postId={this.props.postId} img={this.state.img} />
                        </Card>
                    
                    </Modal>
                    
                        :
                        null
                    }

                    {this.state.editPost ? 
                    <Modal 
                    open={true} 
                    onClose={() => this.setState({editPost: null})}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <Card>
                        <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({editPost: null})}> Back </Button>
                        </Card>
                    
                    </Modal>
                    
                        :
                        null
                    }
                        
                  
            </>
        )
    }
}