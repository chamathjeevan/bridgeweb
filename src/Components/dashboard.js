import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Material from './Material';

class Dashboard extends Component {
  render() {
    return (
        <div className="container-fluid p-0 login">
        <div className="row  ">
            <div className="col-lg-12"> 
                <Header></Header>
            </div>
            <div className="col-lg-2 pr-0">
                <Sidebar></Sidebar>
            </div>
          <div className="col-lg-10 content-area">
          <Material></Material> 
            <div className = "col-lg-10 content-area">
         
            </div>
              
          </div>
          </div>
      </div>
    );
  }
}
export default Dashboard;