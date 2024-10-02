import React from "react"

import { auth } from "../../Firebase/FirebaseInit"
import { signOut } from "firebase/auth";

import User from "./User"
import RequestsDatabase from "../Request/RequestsDatabase";
import RequestsMap from "../Request/RequestsMap"
import NewRequest from "../Request/NewRequest"

import { db } from "../../Firebase/FirebaseInit"
import { query, collection, where, orderBy } from "firebase/firestore"


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


import { Typography, Button, IconButton, Modal, Card } from "@mui/material"

export default class Employee extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: "user",
            newRequest: false
        }
            
        this.handleChange = this.handleChange.bind(this)
        
    }

    componentDidMount() {
        
    }


    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value,
        success: "",
        error: ""
        });
      }


     

    render() {
        
        
            return (

               

                <div style={{textAlign: "center"}}>
                   
                    <br />
                    <br />
                    <Button 
                    variant="contained" 
                    onClick={async () => await signOut(auth).then(window.location.href = "/")}
                    style={{ display: "flex", float: "right", backgroundColor: "#E5650F", borderRadius: 15, marginRight: 10, padding: 10 }}
                    >
                   <Typography variant="body1" style={{fontFmaily: "Signika", color: "white"}}> Log Out</Typography>
                    </Button>
                    <Typography variant="h5" align="left" style={{color: "white", paddingLeft: 20}}> Admin </Typography>

                    <Button 
                    variant="contained" 
                    onClick={() => this.setState({newRequest: true})}
                    style={{ display: "block", backgroundColor: "#E5650F", borderRadius: 15, margin: 10, padding: 10 }}
                    >
                    <Typography variant="body1" style={{fontFmaily: "Signika", color: "white"}}> New Request </Typography>
                    </Button>
                        
              

                    <IconButton 
                    style={{width: 100, borderRadius: 15, backgroundColor: this.state.page == "user" ? "#E5650F" : null}} 
                    onClick={() => this.setState({page: "user"})}> 
                    <AccountCircleIcon />
                    </IconButton>

                    <IconButton 
                    style={{width: 100, borderRadius: 15, backgroundColor: this.state.page == "requests" ? "#E5650F" : null}} 
                    onClick={() => this.setState({page: "requests"})}> 
                    <HelpCenterIcon />
                    </IconButton>

                    <IconButton 
                    style={{width: 100, borderRadius: 15, backgroundColor: this.state.page == "jobs" ? "#E5650F" : null}} 
                    onClick={() => this.setState({page: "jobs"})}> 
                    <IndeterminateCheckBoxIcon />
                    </IconButton>

                    <IconButton 
                    style={{width: 100, borderRadius: 15, backgroundColor: this.state.page == "posts" ? "#E5650F" : null}} 
                    onClick={() => this.setState({page: "posts"})}> 
                    <CheckBoxIcon />
                    </IconButton>

                    <br />
                    <br />

                    {this.state.page == "user" ? 
                        <User profile={this.props.profile} profileId={this.props.profileId} />
                        :
                        null
                    }

                    {this.state.page == "requests" ? 
                        <>
                            <RequestsDatabase type={"requests"} query={query(collection(db, "requests"), where("scheduled", "==", ""), orderBy("created", "desc"))} />
                            <RequestsMap query={query(collection(db, "requests"), where("scheduled", "==", ""), orderBy("created", "desc"))} />
                        </>
                        :
                        null
                    }

                    {this.state.page == "jobs" ? 
                        <>
                            <RequestsDatabase type={"jobs"} query={query(collection(db, "requests"), where("scheduled", "!=", ""), where("completed", "==", false), orderBy("scheduled", "asc"))} />
                            <RequestsMap query={query(collection(db, "requests"), where("scheduled", "!=", ""), where("completed", "==", false), orderBy("scheduled", "asc"))} />
                        </>
                        :
                        null
                    }

                    {this.state.page == "posts" ? 
                        <>
                            <RequestsDatabase type={"posts"} query={query(collection(db, "requests"), where("scheduled", "!=", ""), where("completed", "==", true), orderBy("scheduled", "desc"))} />
                            <RequestsMap query={query(collection(db, "requests"), where("scheduled", "!=", ""), where("completed", "==", true), orderBy("scheduled", "desc"))} />
                        </>
                        :
                        null
                    }

                    {this.state.newRequest ? 
                    <Modal 
                    open={true} 
                    onClose={() => this.setState({newRequest: null})}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <Card>
                        <Button variant="contained" color="primary" style={{margin: "5%", padding: 10, backgroundColor: "#E5650F"}} onClick={() => this.setState({newRequest: null})}> Back </Button>
                        <NewRequest closeModal={() => this.setState({newRequest: null})} />
                        </Card>
                    
                    </Modal>
                    
                        :
                        null
                    }
                 
                       
                    <br />
                    <br />
                    

                
                </div>
                
            )
        }
        
    }