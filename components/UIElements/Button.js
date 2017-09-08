import React, {Component} from 'react';
import styled from 'styled-components';
import {darken} from 'polished';
import classnames from 'classnames';

const Button = styled.button`
width: 100%;
color: ${props => props.theme.color};
padding: 10px 20px;
font-size: 16px;
text-align: center;
letter-spacing: .1em;
border-radius: 7px;
border: 1px solid ${props => props.theme.color};
background-color: white;
margin-top: 5px;
transition-property: background-color;
transition-duration: 0.5s;
transition-timing-function: ease-out;
box-shadow: 0px 2px 3px 3px rgba(0,0,0,0.3);

&:hover {
  background-color: ${props => props.theme.color};
  color:white;
}

&:active{
  color: white;
  background-color: ${props => props.theme.color};
  box-shadow: inset 1px 1px 3px 2px rgba(0, 0, 0, .3);
}

&.locked{
  background: ${props=> darken(0.2, props.theme.color)};
  color: white;
  transform: scale(0.95);
}
`;
// box-shadow: 0px 17px 10px -10px rgba(0,0,0,.33);
export default (props) =>
  {
    return (<Button {...props}>{props.children}</Button>)
  };
