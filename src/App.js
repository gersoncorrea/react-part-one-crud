import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import {Link} from 'react-router-dom'
import AutorBox from './Autor'
class App extends Component {
  
  render() {    
    return (
      <div id="layout">
          
          <a href="#menu" id="menuLink" className="menu-link">
              
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><Link href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><Link href="/autor" className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><Link href="/livro" className="pure-menu-link">Livro</a></li>
                  </ul>
              </div>
          </div>
          <div id="main">
              {this.props.children}            
          </div>
      </div>     
    );
  }
}

export default App;
