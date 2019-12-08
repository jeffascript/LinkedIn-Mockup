import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PutAPI from "../APIs/PutAPI"
import GetAPI from "../APIs/GetAPI"
import PostImageAPI from '../APIs/PostImageAPI';

class UpdateUser extends Component {
  state = {
    isOpen: true,
    name: "",
    surname: "",
    email: "",
    bio: "",
    area: "",
    password: "",
    selectedFile: null
  }


  toggleClose = () => {
    this.props.closeModal()
    this.setState({
      isOpen: !this.state.isOpen,

    })
  }


  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleClose} >
          <ModalHeader toggle={this.toggleClose}>Update Info</ModalHeader>
          <ModalBody>

            <Form onSubmit={this.postUpdatedDetails}>
              <FormGroup>
                <Label>Email</Label>
                <Input onChange={(val) => this.setState({ email: val.target.value })} value={this.state.email} type="email" id="email" />
              </FormGroup>
              <FormGroup>
                <Label>First Name</Label>
                <Input onChange={(val) => this.setState({ name: val.target.value })} value={this.state.name} type="text" id="name" />
              </FormGroup>
              <FormGroup>
                <Label>Surname</Label>
                <Input onChange={(val) => this.setState({ surname: val.target.value })} value={this.state.surname} type="text" id="surname" />
              </FormGroup>
              <FormGroup>
                <Label>Bio</Label>
                <Input onChange={(val) => this.setState({ bio: val.target.value })} value={this.state.bio} type="text" id="bio" />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input onChange={(val) => this.setState({ area: val.target.value })} value={this.state.area} type="text" name="city" id="area" />
              </FormGroup>

              <Button color="primary">Update Info</Button>
            </Form>
            <hr/>
            <Form onSubmit={this.uploadImage}>
              <FormGroup>
                <Label className="btn btn-secondary">
                  <Input onChange={(val) => this.setState({ selectedFile: val.target.files[0] })} type="file" />
                  Select Image
                </Label>
                {this.state.selectedFile &&
                <Label>
                  {this.state.selectedFile.name}
                </Label>}
              </FormGroup>
              <FormGroup>
                <Button color="primary" >Update Profile Image</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  uploadImage = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("profile", this.state.selectedFile)
    let fileUploaded = await PostImageAPI(localStorage.getItem('username'), localStorage.getItem('password'), fd, 'profile')
  }


  componentDidMount = async () => {
    let userProfile = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile')

    this.setState({
      name: userProfile.name,
      surname: userProfile.surname,
      email: userProfile.email,
      bio: userProfile.bio,
      area: userProfile.area
    })
  }

  postUpdatedDetails = async (e) => {
    e.preventDefault();
    let profileObject = {

      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      bio: this.state.bio,
      area: this.state.area

    };
    await PutAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile', profileObject)
    this.props.closeModal()
  }
}

export default UpdateUser;