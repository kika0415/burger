// import React, { useEffect } from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

// import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Logout from './containers/Auth/Logout/Logout';
// import * as actions from './store/actions/index';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';


// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout');
// })

// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders');
// })

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// })

// const app = props => {
//   useEffect(() => {
//     props.onTryAutoSignup();
//   }, []);

//   let routes = (
//     <Switch>
//       <Route path='/auth' component={asyncAuth} />
//       <Route path="/" exact component={BurgerBuilder} />
//       <Redirect to="/" />
//     </Switch>
//   );

//   if (props.isAuthenticated) {
//     routes = (
//       <Switch> 
//           <Route path="/checkout" component={asyncCheckout} /> 
//           <Route path="/orders" component={asyncOrders} /> 
//           <Route path='/logout' component={Logout} />
//           <Route path='/auth' component={asyncAuth} />
//           <Route path="/" exact component={BurgerBuilder} />
//           <Redirect to="/" />
//         </Switch>
//     )
//   }

//   return (
//     <div>
//       <Layout>       
//         {routes}
//       </Layout>
//     </div>
//   );

// }

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   }
// }
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  
  render() { 
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Suspense>{routes}</Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
