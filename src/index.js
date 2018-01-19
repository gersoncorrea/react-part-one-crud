import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import Home from './Home'
import './index.css';
import { BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom';


ReactDOM.render(
//define rotas do projeot
// (<Router history={browserHistory}>
//   <Route path="/" component={App}>
//     <IndexRoute path="/" component={Home}/>
//     <Route path="/autor" />
//     <Route path="/livro"/>
//   </Route>
// </Router>)


<Router>
            <App>
                    <Switch>            
                        <Route exact path="/" component={Home}/>
                        <Route path="/autor" component={Autor}/>
                        <Route path="/livro" component={Livro}/>                
                    </Switch>            
            </App>
        </Router>,

  document.getElementById('root')
);
