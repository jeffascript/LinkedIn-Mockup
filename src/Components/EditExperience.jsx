import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label, 
  Input, ModalFooter
} from "reactstrap";
import PutAPI from "../APIs/PutAPI";
import GetAPI from "../APIs/GetAPI";
import DeleteEachExperienceByID from "../APIs/DeleteEachExperienceByID";
import PostImageExperience from "../APIs/PostImageExperience";

class EditExperience extends Component {
  state = {
    isOpen: true,
    role: "",
    company: "",
    description: "",
    area: "",
    startDate: undefined,
    endDate: undefined,
    selectedFile: null,
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
          <ModalHeader toggle={this.toggleClose}>Modal title</ModalHeader>

          <ModalBody>
            <Form onSubmit={this.postUpdatedDetails}>
              <FormGroup>
                <Label>Role</Label>
                <Input
                  onChange={val => this.setState({ role: val.target.value })}
                  value={this.state.role}
                  type="text"
                  id="role1"
                  placeholder="Role"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                  onChange={val => this.setState({ company: val.target.value })}
                  value={this.state.company}
                  type="text"
                  id="company1"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  onChange={val => this.setState({ description: val.target.value })}
                  value={this.state.description}
                  type="text"
                  id="description1"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                  onChange={val => this.setState({ area: val.target.value })}
                  value={this.state.area}
                  type="text"
                  name="city"
                  id="area1"
                />
              </FormGroup>

              <FormGroup>
                <Label>End date</Label>
                <Input
                  onChange={val =>
                    this.setState({ startDate: val.target.value })
                  }
                  value={this.state.startDate}
                  type="date"
                  id="startDate1"
                  placeholder={this.state.startDate}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Start date</Label>
                <Input
                  onChange={val => this.setState({ endDate: val.target.value })}
                  value={this.state.endDate}
                  type="date"
                  id="endDate1"
                  placeholder="2019-12-12T00:00:00.000Z"
                  required
                />
              </FormGroup>
              <FormGroup >
                
                <Input onChange={(val) => this.setState({selectedFile: val.target.files[0]})}  type="file"  name= "file" />
                
              </FormGroup>
              <Button
                color="danger"
                onClick={async () => {
                  await DeleteEachExperienceByID( 
                    this.props.id,
                    localStorage.getItem('username'), 
                    localStorage.getItem('password')
                  );
                  this.props.closeModal();
                }}
              >
                {" "}
                Delete
              </Button>
              <Button color="success">Update</Button>
            </Form>
          </ModalBody>

          {/* <ModalFooter>
          <Form onSubmit={this.uploadImage}>
            <FormGroup >
                
                <Input onChange={(val) => this.setState({selectedFile: val.target.files[0]})}  type="file"  name= "file" />
                <Button color="success" >Change Experience Image</Button>
              </FormGroup>
              </Form>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }


  // uploadImage = async(e)=>{
  //   e.preventDefault();
  //   let fdExp = new FormData();
  //   fdExp.append("experience", this.state.selectedFile)
  //   let fileUploaded = await PostImageExperience (localStorage.getItem('username'), localStorage.getItem('password'), this.props.id, fdExp)

  //   console.log(fileUploaded) 




  // }






  componentDidMount = async () => {
    let oneUserExperienceProfile = await GetAPI(
      localStorage.getItem('username'), 
      localStorage.getItem('password'),
      'experience',
      '',
      this.props.id
    );

    this.setState({
      role: oneUserExperienceProfile.role,
      company: oneUserExperienceProfile.company,
      description: oneUserExperienceProfile.description,
      area: oneUserExperienceProfile.area,
      startDate: oneUserExperienceProfile.startDate.split('T')[0],
      endDate: oneUserExperienceProfile.endDate.split('T')[0]
    });


    console.log("ID here", this.props.id )
  };

  postUpdatedDetails = async e => {
    e.preventDefault();
    let editedProfileObject = {
      role: this.state.role,
      company: this.state.company,
      description: this.state.description,
      area: this.state.area,
      startDate: this.state.startDate,
      endDate: this.state.startDate
    };

    await PutAPI( 
      localStorage.getItem('username'), 
      localStorage.getItem('password'),
      'experience',
      editedProfileObject,
      this.props.id
    );

    
    if(this.state.selectedFile) {
      let fdExp = new FormData();
    fdExp.append("experience", this.state.selectedFile)
      await PostImageExperience (localStorage.getItem('username'), localStorage.getItem('password'), this.props.experience._id, fdExp)
    }

    this.props.closeModal();
  };
}

export default EditExperience;
