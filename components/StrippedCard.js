//externals
import React, {Component} from 'react';
import styled from 'styled-components';

export default (props) =>
  {
    const StrippedCard = styled.div`
      width:275px;
      height:313px;
      background-color: white;
      box-shadow: 0px 5px 5px 3px rgba(0,0,0,0.3);
      perspective: 700;
      margin-bottom: 10px;
      transition: all .2s ease-in-out;
      text-align: center;
      border-radius: 5px;

      &:hover{
        box-shadow: 0px 8px 8px 5px rgba(0,0,0,.3);
        transform: scale(1.1);
        z-index: 3000;

      }
      > .upperStrip{
      height: 60px;
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


    return (
      <StrippedCard>
        <div className="upperStrip">
          <StripHeader>{props.header}</StripHeader>
        </div>
        {props.children}
      </StrippedCard>)
  };
