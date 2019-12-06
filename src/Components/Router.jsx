import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageHome from './PageHome';
import { Alert, Form, Input, Container, Row, Fade } from 'reactstrap'
import PageProfile from './PageProfile'
import GetAPI from '../APIs/GetAPI';
import PageLoading from './PageLoading'
import NavBar from './SectionNavBar'


class MainComponent extends Component {

  state = {
    logged: undefined,
    wrongPass: false,
    isLoading: true
  }

  render() {
    return (
      <>
        <Router>
          {this.state.logged &&
            <Switch>
              {this.state.isLoading && <PageLoading />}
              {!this.state.isLoading &&
                <>
                  <></>
                  <Fade>
                    <NavBar logout={this.logout} />
                    <Route path="/" exact component={PageHome} />
                    <Route path="/profile/:user" component={PageProfile} />
                  </Fade>
                </>}
            </Switch>
          }
          {this.state.logged !== true &&
            this.state.logged !== undefined &&
            <Fade>
              <div className="login-form mx-auto mt-5">
                <Container>
                  <Row>
                    <img className="mx-auto" style={{ display: 'block' }} width="30%" src="https://seeklogo.net/wp-content/uploads/2017/01/linkedin-logo-512x512.png" alt="logo" />
                  </Row>
                  <h1 className="text-center">WELCOME TO LINKEDIN!</h1>
                  {this.state.wrongPass && <Alert color="danger">The username/password is incorrect!</Alert>}
                  <Form onSubmit={this.getCredentials}>
                    <Input className="login-input" id="username" type="text" placeholder="Username" />
                    <Input className="login-input" id="password" type="password" />
                    <Input className="btn btn-primary" type="submit" value="Log In" />
                  </Form>
                </Container>
              </div>
            </Fade>
          }
        </Router>
      </>
    );
  }

  componentDidMount = async () => {
    if (localStorage.getItem('username')) {
      let response = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'))
      response ? this.setState({ logged: true }) : this.setState({ logged: false })
    }
    else
      this.setState({ logged: false })

    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 2000);
    document.title = "LinkedIn"
    var link = document.querySelector("link[rel='icon']")
    link = 'https://techcrunch.com/wp-content/uploads/2014/02/linkedin_logo.png'
  }


  getCredentials = async (e) => {
    e.preventDefault();
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let response = await GetAPI(username, password)
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    response ? this.setState({ logged: true }) : this.setState({ wrongPass: true })

  }

  logout = () => {
    this.setState({ logged: false })
    localStorage.setItem('username', undefined)
    localStorage.setItem('password', undefined)
  }
}

export default MainComponent;
