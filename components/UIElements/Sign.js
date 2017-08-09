import React, {Component} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { lighten } from 'polished'

const Sign = styled.button`
  size: 20px;
  text-align: center;
  background-color: ${props=>props.theme.color};
  border: 1px solid white;


  &:hover{
    outline: none !important;
    color: white;
    border: 1px solid ${props => props.theme.color};
  }

  &.marked {
    background-color: red;
  }
  `;

export default (props) =>
  {
    return (<Sign {...props}/>)
  };
