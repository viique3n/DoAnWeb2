import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
class Home extends Component {
  render() {
    return (
      <Grid container justify='center' alignContent='center' component='main'>
        <CssBaseline />
        <div className='w3-container'>
          <h1>Home page</h1>
        </div>
      </Grid>
    );
  }
}
export default Home;
