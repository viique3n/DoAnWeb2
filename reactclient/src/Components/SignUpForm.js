import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class SignupForm extends Component {
  useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  render() {
    return (
      <Grid container justify="center" alignContent="center" component="main">
        <CssBaseline />
        <Grid item xs={6} md={4}>
          <div className={this.useStyles.paper}>
            <Typography component="h1" variant="h5">
              Signup
            </Typography>
            <form>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Địa chỉ Email"
                  name="email"
                  autoFocus
                  value={this.props.values.email}
                  onChange={this.props.handleChange}
                />
                <FormHelperText>{this.props.errors.email}</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Số điện thoại"
                  name="sodienthoai"
                  value={this.props.values.sodienthoai}
                  onChange={this.props.handleChange}
                />
                <FormHelperText>{this.props.errors.sodienthoai}</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Mật khẩu"
                  name="matkhau"
                  value={this.props.values.matkhau}
                  onChange={this.props.handleChange}
                />
                <FormHelperText>{this.props.errors.matkhau}</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Tên khách hàng"
                  name="tenkhachhang"
                  value={this.props.values.tenkhachhang}
                  onChange={this.props.handleChange}
                />
                <FormHelperText>
                  {this.props.errors.tenkhachhang}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={this.useStyles.submit}
              >
                Sign up
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default SignupForm;
