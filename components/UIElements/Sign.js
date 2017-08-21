import React, {Component} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { lighten } from 'polished'

const Sign = styled.button`
  width: 20px;
  height: 20px;
  text-align: center;
  background-color: ${props=>props.theme.color};
  border: none;
  margin: 1px 5px;
  color: white;
  transition: all ease-in-out 0.1s;
  font-size: 20;
  box-shadow: 0px 1px 1px 1px rgba(0,0,0,.3);

  &:hover{
    outline: none !important;
    transform: scale(1.15);
    box-shadow: 0px 1.5px 2.5px 1.5px rgba(0,0,0,.6) !important;
  }

  &.marked {
    background-color: red;
  }
  `;

export default (props) =>
  {
    return (<Sign {...props}/>)
  };
