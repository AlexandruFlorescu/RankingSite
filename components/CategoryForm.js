import React, {Component} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import StrippedContainer from './UIElements/StrippedContainer';
import Button from './UIElements/Button';
import Header from './UIElements/Header';
import Input from './UIElements/Input';

const Label = styled.label`
  font-size: 135%;
  color: ${props => props.theme.color};
`;

const LoginWrapper = styled.div`
  height: 80%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  padding: 0px 10px;
  `;

const TextArea = styled.textarea`
  height: 20vh;
  margin-bottom: 10px;
  resize: none;
  border-radius: 3px;
  text-align: center;
  &:focus{
    outline: none !important;
    border: 1px solid ${props => props.theme.color};
  }

  &:selection{
    background: ${props => props.theme.color};
  }
  `;

const CheckBox = styled.input`
  padding: 5px 10px;
  border: 1px solid #999;
  border-radius: 3px;
  display: block;
  margin-bottom: 10px;
  box-sizing: border-box;
  width: 100%;

  &:focus{
    outline: none !important;
    border: 1px solid ${props => props.theme.color};
  }
  `;

class CategoryForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      image:'',
      description:'',
      private: false,
      items_count: 0,
      items: []
    }
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  componentWillMount(){
    this.setState({owner: this.props.authed.user_id});
  }

  submit(){
    this.props.addCategory(this.state);
  }

  render(){
    // console.log(this.props.authed);
    return (
          <StrippedContainer header="Add new category">
              <LoginWrapper>
                <Label>Private?</Label>
                <CheckBox
                  name="private"
                  type="checkbox"
                  checked={this.state.isGoing}
                  onChange={this.handleInputChange} />
                <Label> Name: </Label>
                <Input name="name" onChange={this.handleChange.bind(this)}/>

                <Label> Image: </Label>
                <Input name="image" onChange={this.handleChange.bind(this)}/>

                <Label> Description: </Label>
                <TextArea name="description" onChange={this.handleChange.bind(this)}/>

                <Button onClick={this.submit.bind(this)}>Submit</Button>
              </LoginWrapper>
          </StrippedContainer>
        )}
}

export default CategoryForm;
