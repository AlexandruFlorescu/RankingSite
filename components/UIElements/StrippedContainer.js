import React, {Component} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const StrippedContainer = styled.div`
  height: 93vh;
  width: 90%;
  margin-left:101px;
  display: inline;
  background-color: white;
  box-shadow: 0px 5px 5px 3px rgba(0,0,0,0.3);
  border-radius: 0px;
  overflow: auto;

> .upperStrip{
  height: 18.14vh;
  width: 100%;
  background-color: ${props => props.theme.color};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease-out;
}
`;

const StripHeader = styled.div`
  text-spacing: 0.22em;
  color: white;
  font-size: 175%;
  font-weight:500;
  text-transform: capitalize;
`;/* perhaps add this as header on the stripped line */
export default (props) =>
  {
    return (
      <StrippedContainer {...props}>
        <div className="upperStrip">
          <StripHeader>{props.header}</StripHeader>
        </div>
        {props.children}
      </StrippedContainer>)
  };
