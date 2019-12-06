import React, { Component } from 'react';
import UpdateUser from './UpdateUser'
import { Container, Col, Fade, Row } from 'reactstrap'
import Loading from './Loading'
import GetAPI from "../APIs/GetAPI"

class ProfileComponent extends Component {
    state = {
        openModal: false,
        isLoading: true,
        userInfo: {
            name: undefined,
            surname: undefined,
            title: undefined,
            bio: undefined,
            area: undefined,
            image: undefined,
        }
    }

    render() {
        let userInfo = this.state.userInfo
        return (
            <>
                {
                    <Fade>
                        <Container className="profile">
                            <Row className="profile-header">
                                <img height="150px" style={{ borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} width="100%" src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt="" className="src" />
                            </Row>
                            {/* start of a secondRow */}
                            <Row className="profile-body">
                                <Col>
                                    {localStorage.getItem('username') === this.props.userID && <i className="fa fa-pencil pencil" onClick={() => this.setState({ openModal: true })}></i>}
                                    {this.state.openModal && <UpdateUser closeModal={() => this.setState({ openModal: false, isLoading: false })} />}
                                    {this.state.isLoading
                                        ?
                                        <Loading />
                                        :
                                        <Fade className="m-3">
                                            <img className="profile-pic" src={userInfo.image} alt="profile pic" />
                                            <Row>
                                                <Col sm="6" l="8">
                                                    <h3>{`${userInfo.name} ${userInfo.surname}`}</h3>
                                                    <h6>{userInfo.title}</h6>
                                                    <p>{userInfo.bio}</p>
                                                    <small>{userInfo.area}</small>
                                                    <small>{userInfo.email}</small>
                                                </Col>
                                                <Col sm="6" l="4">
                                                    <span className="mr-1 text-left"><i className="fa fa-building-o mr-1"></i>Strive School</span>
                                                </Col>
                                            </Row>
                                        </Fade>
                                    }
                                </Col>  {/* end of a secondRow */}
                            </Row>
                        </Container>
                    </Fade>
                }
            </>);
    }

    abortController = new AbortController();

    componentDidMount = async () => {
        await this.fetchInfo()
        this.setState({ isLoading: false })
    }
    componentDidUpdate = async (prevProps) => {
        if (prevProps.userID !== this.props.userID) {
            await this.fetchInfo();
        }
    }

    fetchInfo = async () => {
        let userProfile = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile', this.props.userID, { signal: this.abortController.signal })
        if (!userProfile.image)
            userProfile.image = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
        this.setState({
            userInfo: {
                name: userProfile.name,
                surname: userProfile.surname,
                title: userProfile.title,
                bio: userProfile.bio,
                area: userProfile.area,
                image: userProfile.image
            }
        })
    }
}

export default ProfileComponent;