import React, {Component} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import StrippedContainer from './UIElements/StrippedContainer';
import Button from './UIElements/Button';
import Header from './UIElements/Header';
import Input from './UIElements/Input';
import ColumnWrapper from './UIElements/ColumnWrapper';

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
      score: 0,
      name:'',
      author: '',
      image:'',
      description:'',
      votes_count:0,
      votes: [],
      voted_by:[],

    }
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  componentWillMount(){
    this.setState({category: this.props.category._id});
    if(this.props.item){
      this.setState({name: this.props.item.name})
      this.setState({author: this.props.item.author})
      this.setState({image: this.props.item.image})
      this.setState({description: this.props.item.description})
      // this.setState({_id: this.props.item._id})
    }
  }

  submit(){
    this.props.addItem ? this.props.addItem(this.state)
    : this.props.updateItem({name:this.state.name, author:this.state.author, description:this.state.description, _id:this.props.item._id,image:this.state.image});
    this.props.show();
    console.log(this.state);
  }

  render(){
    console.log(this.props);
    // console.log(this.state);
    return (
            <ColumnWrapper>
              <Label> Name: </Label>
              <Input name="name" onChange={this.handleChange.bind(this)} value={this.state.name}/>

              <Label> Author: </Label>
              <Input name="author" onChange={this.handleChange.bind(this)} value={this.state.author}/>

              <Label> Image: </Label>
              <Input name="image" onChange={this.handleChange.bind(this)} value={this.state.image}/>

              <Label> Description: </Label>
              <TextArea name="description" onChange={this.handleChange.bind(this)} value={this.state.description}/>

              <Button onClick={this.submit.bind(this)}>Submit</Button>
            </ColumnWrapper>

        )}
}

export default CategoryForm;
