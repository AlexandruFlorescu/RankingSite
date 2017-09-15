import React, {Component} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import StrippedContainer from './UIElements/StrippedContainer';
import Button from './UIElements/Button';
import Header from './UIElements/Header';
import Input from './UIElements/Input';
import ColumnWrapper from './UIElements/ColumnWrapper'

const Label = styled.label`
  font-size: 135%;
  color: ${props => props.theme.color};
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

class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  contact(){
    fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(this.state)
    }).then(resp => resp.json())
    this.setState({name: '', subject: '', text: ''});
  }

  render(){
    return (
          <StrippedContainer header="I am looking forward to hearing from you! :)">
              <ColumnWrapper>
                <Label> What do they call you: </Label>
                <Input name="name" onChange={this.handleChange.bind(this)} value={this.state.name}/>

                <Label> What is this about: </Label>
                <Input name="subject" onChange={this.handleChange.bind(this)} value={this.state.subject}/>

                <Label> Shoot!: </Label>
                <TextArea name="text" onChange={this.handleChange.bind(this)} value={this.state.text}/>

                <Button onClick={this.contact.bind(this)}>Send message</Button>
              </ColumnWrapper>
          </StrippedContainer>
        )}
}

export default ContactForm;

/**/
// I am looking forward to hearing from you! :)
