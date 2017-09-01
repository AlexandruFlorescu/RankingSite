//externals
import React, {Component} from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
// import {router} from 'react-router'

//internals
import Modal from './Modal'
import StrippedCard from './StrippedCard'
import Button from './UIElements/Button'
import CategoryForm from './CategoryForm'
import history from './history'

//SVGs
import Role from '../assets/role.svg';
import Honor from '../assets/honor.svg';
import Crew from '../assets/crew.svg';
import Age from '../assets/age.svg';
import Tool from '../assets/tool.svg';
import Reputation from '../assets/carma.svg';
import Add from '../assets/add.svg';

//stuff that I should have declared someplace else
const Img = styled.img`
  fill: ${props=>props.theme.color};
  background-size: cover;
  width:150px;
  height:150px;
  `;

  // background: url(${props=>props.src}) 50% 50% no-repeat;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  height: 253px;

  & #Shape {
    fill: ${props=>props.theme.color};
    transition: all ease-in-out 0.3s;
    &:hover{
      transform: scale(1.1) translate(-13px, -13px);
    }
  }
  & #Locked {
    fill: black;
    transition: all ease-in-out 0.3s;
    &:hover{
      transform: scale(1.1) translate(-13px, -13px);
    }
  }

  }
  `;
class AddCard extends Component{
  constructor() {
    super();
    this.state={
      show: false
    }
  }
  show(){
    this.setState({show:!this.state.show});
  }
  render(){
    console.log(this.props.authed);
    if(this.props.authed.user_id) return (
      <StrippedCard header='Add new category'>
        <CardWrapper>
          <div id="svgWrapper">
            <svg width="150px" height="150px" viewBox="-50 -50 400 400" version="1.1" onClick={this.props.authed.user_id && this.show.bind(this)} >
              <defs>
                  <filter x="-2.4%" y="-1.7%" width="104.7%" height="105.1%" filterUnits="objectBoundingBox" id="filter-1">
                      <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                      <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                      <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                      <feMerge>
                          <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                          <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                  </filter>
                  <path d="M108.399,178.756 C111.015,178.756 113.524,179.794 115.375,181.644 C117.225,183.494 118.264,186.003 118.264,188.621 L118.25,277.274 L178.712,277.262 L178.726,188.603 C178.726,183.158 183.14,178.743 188.586,178.743 L277.213,178.727 L277.222,118.233 L188.604,118.247 C185.989,118.247 183.48,117.207 181.629,115.357 C179.778,113.508 178.74,110.998 178.74,108.382 L178.754,19.727 L118.29,19.735 L118.274,108.399 C118.274,113.845 113.86,118.258 108.413,118.26 L19.788,118.272 L19.778,178.77 L108.399,178.756 Z" id="path-2"></path>
                  <filter x="-5.6%" y="-4.9%" width="111.3%" height="111.3%" filterUnits="objectBoundingBox" id="filter-3">
                      <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                      <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                      <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                      <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                  </filter>
              </defs>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="plus" filter="url(#filter-1)" transform="translate(4.000000, 2.000000)" fillRule="nonzero">
                      <path d="M108.388,297 C105.772,297.002 103.262,295.962 101.411,294.112 C99.562,292.261 98.522,289.753 98.522,287.135 L98.536,198.482 L9.915,198.494 C7.299,198.494 4.79,197.456 2.939,195.606 C1.088,193.756 0.05,191.248 0.05,188.629 L0.064,108.407 C0.065,102.962 4.479,98.547 9.925,98.547 L98.551,98.533 L98.567,9.871 C98.568,4.426 102.982,0.013 108.427,0.011 L188.616,0 C191.233,0 193.742,1.038 195.593,2.888 C197.443,4.739 198.481,7.247 198.481,9.865 L198.468,98.52 L287.085,98.508 C289.701,98.508 292.21,99.546 294.061,101.395 C295.912,103.247 296.95,105.754 296.95,108.371 L296.938,188.591 C296.937,194.036 292.523,198.451 287.078,198.451 L198.449,198.467 L198.435,287.125 C198.434,292.57 194.02,296.985 188.575,296.985 L108.388,297 Z" id={this.props.authed.user_id ? "Shape" : "Locked"}></path>
                  </g>
              </g>
            </svg>
          </div>
          {this.state.show &&
          <Modal
            show={this.show.bind(this)}
            color={this.props.color}
            header='Add new category'>
              <CategoryForm
              authed= {this.props.authed}
              addCategory = {this.props.addCategory}></CategoryForm>
          </Modal>}
        </CardWrapper>
      </StrippedCard>)
    else return null;
  }
}
export default AddCard
// <ItemForm category={this.props.category}
//   addItem={this.props.addItem}
//   show={this.show.bind(this)}>
//
// </ItemForm>
// <Button onClick={this.open.bind(this)}>MODAAAL</Button>
// <path className="plus" d="M108.388,297c-2.616,0.002-5.126-1.038-6.977-2.888c-1.849-1.851-2.889-4.359-2.889-6.977l0.014-88.653l-88.621,0.012
//   c-2.616,0-5.125-1.038-6.976-2.888c-1.851-1.85-2.889-4.358-2.889-6.977l0.014-80.222c0.001-5.445,4.415-9.86,9.861-9.86
//   l88.626-0.014l0.016-88.662c0.001-5.445,4.415-9.858,9.86-9.86L188.616,0c2.617,0,5.126,1.038,6.977,2.888
//   c1.85,1.851,2.888,4.359,2.888,6.977l-0.013,88.655l88.617-0.012c2.616,0,5.125,1.038,6.976,2.887
//   c1.851,1.852,2.889,4.359,2.889,6.976l-0.012,80.22c-0.001,5.445-4.415,9.86-9.86,9.86l-88.629,0.016l-0.014,88.658
//   c-0.001,5.445-4.415,9.86-9.86,9.86L108.388,297z M108.399,178.756c2.616,0,5.125,1.038,6.976,2.888
//   c1.85,1.85,2.889,4.359,2.889,6.977l-0.014,88.653l60.462-0.012l0.014-88.659c0-5.445,4.414-9.86,9.86-9.86l88.627-0.016
//   l0.009-60.494l-88.618,0.014c-2.615,0-5.124-1.04-6.975-2.89c-1.851-1.849-2.889-4.359-2.889-6.975l0.014-88.655l-60.464,0.008
//   l-0.016,88.664c0,5.446-4.414,9.859-9.861,9.861l-88.625,0.012l-0.01,60.498L108.399,178.756z" fill="black"/>
