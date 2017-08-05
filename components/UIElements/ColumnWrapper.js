import React, {Component} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const ColumnWrapper = styled.div`
  height: 80%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 0px 10px;
  `;

export default (props) =>
  {
    return (<ColumnWrapper {...props}>{props.children}</ColumnWrapper>)
  };
