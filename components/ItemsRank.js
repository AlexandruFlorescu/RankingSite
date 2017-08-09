import React, {Component} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import { lighten } from 'polished'
import StrippedContainer from './UIElements/StrippedContainer';
import Sign from './UIElements/Sign'

const Table = styled.table`
  width: 100%;
  // height: 74.6vh;
  border-collapse: collapse;
`;
const Th = styled.th`
  background: ${props=>props.theme.color};
  color: white;
  vertical-align: middle;
  border: 1px solid black;
  height: 20px;
  `;
const Tr = styled.tr`
  min-height : 70px;
  height: 70px;
  max-height: 70px;
  &:nth-child(even){
    background: ${props=>lighten(0.4,props.theme.color)};
  }
  &:nth-child(odd){
    background: ${props=>lighten(0.3,props.theme.color)};
  }
  &:hover {
    background-color: ${props=>props.theme.color};
    color: white;
  }
`;
const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  &.cap{
    text-transform: capitalize;
  }
`;

const SImg = styled.img`
  background-color: red;
  width: 70px;
  height: 70px;
  `;

const FW = styled.div`
  width: 100%;
  `;

class ItemsRank extends Component{

  i=0;
  // componentWillMount(){
  //   console.log("CWM");
  //   this.i = 0;
  // }

  devote(item){
    let myVote = item.votes.find(vote => {console.log(vote);return vote.user == this.props.authed.user_id});
    this.props.deVoteItem(item, myVote);
  }

  increment(item) {
    if(item.voted_by.indexOf(this.props.authed.user_id) == -1)
      this.props.voteItem(item, this.props.authed.user_id, 1);
    // else {
    //   console.log('else')
    //
    // }
    // this.props.cleanItem(item, this.props.authed.user_id, 1);
  }
  decrement(item) {
    // console.log(item);

      if(item.voted_by.indexOf(this.props.authed.user_id) == -1)
        this.props.voteItem(item, this.props.authed.user_id, -1);
      // else {
      //   let myVote = item.votes.find(vote => {return vote.user == this.props.authed.user_id});
      //   if(myVote.score < 0)
      //     this.props.deVoteItem(item, myVote);
      // }
      // this.props.decrementItem(item);
      // this.props.voteItem(item, this.props.authed.user_id, -1);
  }

  componentDidMount() {
  // console.log(this.props.items);

  }

  render(){
    console.log(this.props.category);
    this.i=0;
    // if(this.props.category)
    var myitems = this.props.category ? this.props.items.filter(a=> a.category == this.props.category._id) : this.props.items;
    // else var myitems= this.props.items;
    myitems.sort((a,b)=>{return b.score - a.score;} );
    // console.log(this.context);
    var header = this.props.category ? this.props.category.name : 'Items Ranking'
    return <StrippedContainer header={header}>
      <Table>

          {
            myitems.map( (item) =>
            { this.i++;
              return (<Tr>
                        <Td>#{this.i}</Td>
                        <Td><FW>{item.score}</FW>
                          {item.voted_by.indexOf(this.props.authed.user_id) > -1 ? <Sign onClick={this.devote.bind(this, item)}>b</Sign>
                                                                                 :  <div>
                                                                                      <Sign onClick={this.increment.bind(this, item)}>+</Sign>
                                                                                      <Sign onClick={this.decrement.bind(this, item)}>-</Sign>
                                                                                    </div>}
                          </Td>
                        <Td><SImg src={item.image}/></Td>
                        <Td className="cap">{item.name}</Td>
                        <Td>{item.description}</Td>
                      </Tr>)}
        )}
      </Table>

    </StrippedContainer>
  }
}

export default ItemsRank;

/*      <Tr>    <Th>#</Th>
          <Th>Score</Th>
          <Th>Picture</Th>
          <Th>Name</Th>
          <Th>Description</Th>
        </Tr>
          */
