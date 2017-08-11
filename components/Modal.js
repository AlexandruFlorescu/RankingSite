import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './../client/client.js'
import styled from 'styled-components'
import {ThemeProvider} from 'styled-components'

import Cancel from '../assets/cancel.svg'
// import StrippedContainer from './UIElements/StrippedContainer'

const Overlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`

//DOOOO ANIMATION :3
const Wrapper = styled.div`
  height: 95vh;
  width: 90vw;
  position: absolute;
  top: 20px;
  left: 106px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 5px 5px 3px rgba(0,0,0,0.3);

  > .upperStrip{
    height: 18.14vh;
    width: 100%;
    background-color: ${props => props.theme.color};
    padding-top: 7.7vh;
  }
`;

const X = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(100%);
  position: relative;
  float: right;
  right: 10px;
  top: -7.7vh;
  `;

const StripHeader = styled.h1`
  text-spacing: 0.22em;
  color: white;
  font-size: 175%;
  font-weight:500;
  text-align: center;
  `;

class Modal extends React.Component {

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.props.isActive) {
      this.modalTarget.className = nextProps.isActive ?
        'modal is-active'
        : 'modal';
    }
  }

  componentWillUnmount() {
    // Clean up
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }
  // <Provider history={history} store={store}>
// </Provider>

  _render() {
    const theme={
      color: this.props.color
    }
    let element = (
        <ThemeProvider theme={theme}>
          <Overlay>
            <Wrapper>
              <div className="upperStrip">
                <StripHeader> Add new Item </StripHeader>
                <X onClick={this.props.show} src={Cancel}/>
              </div>
              {this.props.children}
            </Wrapper>
          </Overlay>
        </ThemeProvider>
    );
    ReactDOM.render(element, this.modalTarget);
  }

  render() {
    return null;
  }
}

export default Modal;
