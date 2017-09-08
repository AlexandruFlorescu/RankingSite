import React, {Component} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { lighten, darken } from 'polished'

const Sign = styled.button`
  width: 20px;
  height: 20px;
  text-align: center;
  background-color: ${props=>props.theme.color};
  border: none;
  margin: 2px 5px;
  color: white;
  transition: all ease-in-out 0.1s;
  box-shadow: 0px 1px 1px 1px rgba(0,0,0,.3);

  &:hover{
    outline: none !important;
    transform: scale(1.15);
    box-shadow: 0px 1.5px 2.5px 1.5px rgba(0,0,0,.6) !important;
  }

  &.marked {
  }

  &.locked{
    background-color: ${props=> props.theme.color == 'green' || props.theme.color == 'indigo' ? darken(0.15, props.theme.color) : darken(0.3, props.theme.color)};
    color: white;
  }
  & .tooltip{
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    position: absolute;
    z-index: 1;

  }

  &.locked{
  }
  `;

export default (props) =>
  {
    return (<Sign {...props}/>)
  };
