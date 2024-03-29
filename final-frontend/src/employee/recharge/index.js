import React from "react";
import Sidebar from '../sidebar';
import ListRecharge from './listRecharge';

export default class Home extends React.Component {
    render() {
        return (
          <div style={{fontFamily: '"Segoe UI" !important'}}>          
            <div className="app">
              <div className="app-body">
                <Sidebar/>
                {/* Content */}
                <main className="main">
                  <div>
                    <title>Recharge Customer</title>
                      <meta charSet="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                      {/*===============================================================================================*/}	
                      <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
                      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />        
                      {/*===============================================================================================*/}
                      <div className="limiter">
                        <div className="container-pages-accountinfo">                          
                          <div className="wrap-body-unique">
                            <ListRecharge/>
                          </div>                          
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
