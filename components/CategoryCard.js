//externals
import React, {Component} from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
// import {router} from 'react-router'

//internals
import Modal from './Modal'
import StrippedCard from './StrippedCard'
import Button from './UIElements/Button'
import ItemForm from './ItemForm'
import history from './history'


//SVGs
import Role from '../assets/role.svg';
import Honor from '../assets/honor.svg';
import Crew from '../assets/crew.svg';
import Age from '../assets/age.svg';
import Tool from '../assets/tool.svg';
import Reputation from '../assets/carma.svg';

//stuff that I should have declared someplace else
const Img = styled.div`
  background: url(${props=>props.src}) 50% 50% no-repeat;
  background-size: cover;
  width:  97.2px;
  height: 97.2px;
  clip-path: circle(50% at center);
  shape-outside: circle(50%);
  box-shadow: inset 0px 0px 5px 2px ${props=> props.theme.color}, inset -7px -2px 20px 10px rgba(255,255,255,.4);
  border-radius:50%;
  float: left;

  transition: all 0.6s ease-in-out;
  transform-style: preserve-3d;
  `;
const Header = styled.h3`
  color: ${props=>props.theme.color};
  font-weight: 700;
  text-align:center;
  width:100%;
  line-height: 30px;
  `;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  `;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props=>props.theme.color};
  `;
const Label = styled.label`
  color: black;
  width: 125px;
  float: left;

  &:before{
    content: 'zzz';
    color: transparent;
    background: url(${props=>props.background}) no-repeat 50% 50%;
    background-size: 20px;
    width:30px;
    height:30px;
  }
  `;

const UpperWrap = styled.div`
    height: 100px;
`;
const RightWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
`;

const Highlight = styled.span`
  border: 1px solid ${props=>props.theme.color};
  background-color: ${props=> lighten(0.4, props.theme.color)};
  `;

class CategoryCard extends Component{

  res=0;
  constructor() {
    super();
    this.state={
      show: false
    }
  }

  delete() {
    this.props.delete(this.props.category);
  }

  show(){
    this.setState({show:!this.state.show});
  }

  view() {
    // this.props.router.push({
    //     pathname: '/getItems',
    //     query: { category: this.props.category._id }
    //   })
    // window.location = '/getItems/' + this.props.category._id;
    // console.log(this.context.router);
    history.push({
        pathname: '/getItems',
        state: { category: this.props.category._id }
      })
  }

  render(){
    // console.log(this.props.delete);
    this.res = 0;
    this.props.items.forEach(item=>{if(item.category == this.props.category._id) this.res++;})
      return (
        <StrippedCard header={this.props.category.name}>
            <UpperWrap>
              <Img src={this.props.category.image}></Img>
              <RightWrap>
                <Header> <Label background={Honor}> Creator:</Label> <Highlight>{this.props.users.find(user=>user.user_id == this.props.category.owner).nickname}</Highlight> </Header>
                <Header> <Label background={Reputation}> #Items:</Label> <Highlight>{ this.res }</Highlight></Header>
              </RightWrap>
            </UpperWrap>
            <Divider></Divider>
            <CardWrapper>
              <Button onClick={this.view.bind(this)}>View rankings</Button>
              <Button onClick={this.show.bind(this)}>Add Item</Button>
              <Button onClick={this.delete.bind(this)}>Delete</Button>
              {this.state.show &&
              <Modal
                show={this.show.bind(this)}
                color={this.props.color}>
                  <ItemForm category={this.props.category}
                            addItem={this.props.addItem}
                            show={this.show.bind(this)}>

                  </ItemForm>
              </Modal>}
            </CardWrapper>
          </StrippedCard>
        )
  }
}
export default CategoryCard
// <Button onClick={this.open.bind(this)}>MODAAAL</Button>
