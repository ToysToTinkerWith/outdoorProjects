import React from "react"

import { db } from "../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

import PostDisplay from "./PostDisplay";

import { Card, Typography, Modal, Button } from "@mui/material"

import { DataGrid } from '@mui/x-data-grid';


export default class PostsDatabase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            post: null,
        };
        
    }

    componentDidMount() {
        
        const postRef = collection(db, "requests")

        const postQuery = query(postRef, where("completed", "==", true), orderBy("scheduled", "desc"))


        this.unsub = onSnapshot(postQuery, (postSnap) => {

        this.setState({
            posts: []
        })
            
        postSnap.forEach(async (post) => {

            let postData = post.data()
            postData.id = post.id

            let postDate = new Date(post.data().scheduled.replace(/-/g, '\/'))
            postData.scheduled = postDate.toLocaleDateString()

            this.setState(prevState => ({
                posts: [...prevState.posts, postData]
            }))
        });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    render() {

        const Columns = [
  
            { 
            field: 'title', 
            headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Title </Typography>, 
            flex: 1,
            minWidth: 50, 
            renderCell: (params) => (
                  
                <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ padding: 10, backgroundColor: "#" }}
                onClick={() => [this.setState({post: params.row.id})]}
              >
                {params.row.title} 
                </Button>
            ),
            },
            
            { 
            field: 'scheduled', 
            headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Completed </Typography>, 
            type: "date",
            flex: 1,
            minWidth: 50, 
            renderCell: (params) => (
                  
              <Typography style={{color: "#000000"}}> {params.row.scheduled} </Typography>
            ),
            }
          ]

        return (
            <>
                <DataGrid
                    autoHeight
                    pageSize={5}
                    rows={this.state.posts} 
                    columns={Columns} 
                />

                {this.state.post ? 
                <Modal 
                open={true} 
                onClose={() => this.setState({post: null})}
                style={{
                    overflowY: "auto",
                    overflowX: "hidden"
                }}>
                    <Card>
                    <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({post: null})}> Back </Button>
                    <PostDisplay closeModal={() => this.setState({post: null})} postId={this.state.post} />
                    </Card>
                
                </Modal>
                
                    :
                    null
                }
                
            </>
            
        )
    }
}