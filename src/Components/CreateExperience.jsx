import React, { Component } from "react";
import PostAPI from "../APIs/PostAPI"
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import PostImageExperience from "../APIs/PostImageExperience";

class CreateExperience extends Component {
  state = {
    isOpen: true,
    role: "",
    company: "",
    description: "",
    area: "",
    startDate: "",
    endDate: "",
    selectedFile: null
  };

  toggleClose = () => {
    this.props.closeModal();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleClose}>
          <ModalHeader toggle={this.toggleClose}>Add Experience</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.postNewDetails}>
              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="text"
                  id="role"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                  type="text"
                  id="company"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="text"
                  id="description"
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                  type="text"
                  name="city"
                  id="area"
                />
              </FormGroup>
              <FormGroup>
                <Label >Start Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="startDate"
                />
              </FormGroup>
              <FormGroup>
                <Label >End Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="endDate"
                />
              </FormGroup>
              <FormGroup >
                
                <Input onChange={(val) => this.setState({selectedFile: val.target.files[0]})}  type="file"  name= "file" />
                
              </FormGroup>
              <Button color="primary">Add Data</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }


  uploadImage = async(e)=>{
    e.preventDefault();
    let fdExp = new FormData();
    fdExp.append("experience", this.state.selectedFile)
    let fileUploaded = await PostImageExperience (localStorage.getItem('username'), localStorage.getItem('password'), this.props.id, fdExp)

    console.log(fileUploaded) 




  }





  postNewDetails = async (e) => {
    e.preventDefault();
    let profileObjectForPost = {

      "role": document.querySelector("#role").value,
      "company": document.querySelector("#company").value,
      "description": document.querySelector("#description").value,
      "area": document.querySelector("#area").value,
      "startDate": document.querySelector("#startDate").value,
      "endDate": document.querySelector("#endDate").value


    };
    let newPostResponse = await PostAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'experience',profileObjectForPost)


    let fdataExp = new FormData();
    fdataExp.append("experience", this.state.selectedFile)
    await PostImageExperience (localStorage.getItem('username'), localStorage.getItem('password'), newPostResponse._id, fdataExp)

    this.props.closeModal()
  }
}
export default CreateExperience;