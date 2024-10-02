import React from "react"

import { db } from "../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

import RequestDisplay from "../Request/RequestDisplay"

import { Card, Grid, Typography, Modal, Button, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

import { DataGrid } from '@mui/x-data-grid';

export default class RequestsDatabase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            request: null,
        };
        
    }

    componentDidMount() {
        
        const requestRef = this.props.query       

        this.unsub = onSnapshot(requestRef, (requestSnap) => {

        this.setState({
            requests: []
        })
            
        requestSnap.forEach(async (request) => {

            let requestData = request.data()
            requestData.id = request.id

            if (requestData.created) {
                let requestDate = new Date(request.data().created.toDate())
                requestData.created = requestDate.toLocaleDateString()
            }

            if (requestData.scheduled) {
                let requestSch = new Date(request.data().scheduled + "T16:00")
                requestData.scheduled = requestSch.toLocaleDateString()
            }

            

            this.setState(prevState => ({
                requests: [...prevState.requests, requestData]
            }))
        });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    render() {

        console.log(this.state.requests)

        let Columns 

        if (this.props.type == "requests") {
            Columns = [
  
                { 
                field: 'name', 
                headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Name </Typography>, 
                flex: 1,
                minWidth: 50, 
                renderCell: (params) => (
                      
                    <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ padding: 10, backgroundColor: "#E5650F" }}
                    onClick={() => [this.setState({request: params.row.id})]}
                  >
                    {params.row.name} 
                    </Button>
                ),
                },
               
                { 
                field: 'created', 
                headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Created </Typography>, 
                type: "date",
                flex: 1,
                minWidth: 50, 
                renderCell: (params) => (
                      
                  <Typography style={{color: "#000000"}}> {params.row.created} </Typography>
                ),
                }
              ]
        }

        if (this.props.type == "jobs") {
            Columns = [
  
                { 
                field: 'name', 
                headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Name </Typography>, 
                flex: 1,
                minWidth: 50, 
                renderCell: (params) => (
                      
                    <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ padding: 10, backgroundColor: "#E5650F" }}
                    onClick={() => [this.setState({request: params.row.id})]}
                  >
                    {params.row.name} 
                    </Button>
                ),
                },
               
                { 
                field: 'scheduled', 
                headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Scheduled </Typography>, 
                type: "date",
                flex: 1,
                minWidth: 50, 
                renderCell: (params) => (
                      
                  <Typography style={{color: "#000000"}}> {params.row.scheduled} </Typography>
                ),
                }
              ]
        }

        if (this.props.type == "posts") {
            Columns = [
  
                { 
                field: 'name', 
                headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Name </Typography>, 
                flex: 1,
                minWidth: 50, 
                renderCell: (params) => (
                      
                    <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ padding: 10, backgroundColor: "#E5650F" }}
                    onClick={() => [this.setState({request: params.row.id})]}
                  >
                    {params.row.name} 
                    </Button>
                ),
                },
               
                { 
                field: 'created', 
                headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Completed </Typography>, 
                type: "date",
                flex: 1,
                minWidth: 50, 
                renderCell: (params) => (
                      
                  <Typography style={{color: "#000000"}}> {params.row.scheduled} </Typography>
                ),
                }
              ]
        }
        
        

        return (
            <>
                <DataGrid
                    autoHeight
                    pageSize={5}
                    rows={this.state.requests} 
                    columns={Columns} 
                />

                {this.state.request ? 
                <Modal 
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
                
            </>
            
        )
    }
}