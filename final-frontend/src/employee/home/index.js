import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import * as router from "react-router-dom";
import {Container, FormGroup, Col, Label} from "reactstrap";
import {GiHistogram} from "react-icons/gi";
import {
    AppHeader,
    AppBreadcrumb,
    AppSidebar,
    AppSidebarNav2,
    AppSidebarMinimizer
} from "@coreui/react";
import Sidebar from '../sidebar';

export default class Home extends React.Component {
    render() {
        return (
            <div style={
                {fontFamily: '"Segoe UI" !important'}
            }>
                <div className="app">
                    <div className="app-body">
                        <Sidebar/> {/* Content */}
                        <main className="main">
                            <div>
                                <title>Transaction Info</title>
                                <meta charSet="UTF-8"/>
                                <meta name="viewport" content="width=device-width, initial-scale=1"/> {/*===============================================================================================*/}
                                <link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
                                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"/> {/*===============================================================================================*/}
                                <div className="limiter">
                                    <div className="animated fadeIn">
                                      <br/><br/>
                                        <FormGroup row>
                                            <Col md="6" className="d-flex p-3">
                                                <Label htmlFor=""><GiHistogram style={
                                                        {
                                                            fontSize: '24px',
                                                            marginLeft: '50px'
                                                        }
                                                    }/><strong style={
                                                        {
                                                            marginLeft: '10px',
                                                            fontFamily: 'Segoe UI',
                                                            fontSize: '20px',
                                                            textDecoration: 'underline overline'
                                                        }
                                                    }>TTS-iB@nking<br/><br/><i style = {{marginLeft: '50px'}}>1612572</i><br/><i style = {{marginLeft: '50px'}}>1612674</i><br/><i style = {{marginLeft: '50px'}}>1612776</i><br/></strong>
                                                </Label>
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
