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

  contact(){
    console.log('dasdasd');
  }

  render(){
    return (
          <StrippedContainer header=" I am looking forward to hearing from you! :)">

              <ColumnWrapper>
                <Label> What do they call you: </Label>
                <Input name="name" />

                <Label> Email adress: </Label>
                <Input name="email" />

                <Label> Shoot!: </Label>
                <TextArea name="mai multe"/>

                <Button onClick={this.contact.bind(this)}>Send message</Button>
              </ColumnWrapper>
          </StrippedContainer>
        )}
}

export default ContactForm;
