import React, {Component} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import { lighten } from 'polished'
import StrippedContainer from './UIElements/StrippedContainer';
import Sign from './UIElements/Sign'

import CommentsSection from './CommentsSection'

// height: 74.6vh;
// const Th = styled.th`
//   background: ${props=>props.theme.color};
//   color: white;
//   vertical-align: middle;
//   border: 1px solid black;
//   height: 20px;
//   `;

//0 5px 5px -1px rgba(0,0,0, .8),
// background: ${props=>lighten(0.3,props.theme.color)};
// background: ${props=>lighten(0.3,props.theme.color)};
// &:nth-child(4n) button{
//   box-shadow: 0px 1px 1px 1px rgba(255,255,255,.3);
// }
// rgba(255,255,255,.3);
// box-shadow: inset 0 -1px 5px -1px rgba(255,255,255,.9), 0 -5px 5px -5px white;
// box-shadow:  0px -10px 5px -3px rgba(0, 0, 0, .9), 0px 10px 5px 3px rgba(0, 0, 0, .9) ;
// &:nth-child(2n+1){
//   background: ${props=>lighten(0.4,props.theme.color)};
// }
// &:hover button::hover {
//   color: red;
//   box-shadow: 0px 1px 1px 5px rgba(255,255,255,.3);
// }

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 5px;
`;

const Tr = styled.tr`
  min-height : 70px;
  height: 70px;
  max-height: 70px;
  border-top: 10px solid ${props=>props.theme.color};
  transition: all ease-in-out 0.1s;
  padding-bottom: 2px;

  &:hover img .item{
    transform: scale(1.1);
  }
  &:hover {
   color: white;
   background-color: ${props=>props.theme.color};
   box-shadow: 0 -1px 2px 0.1px #333;
  }
  &:hover td{
   color: white;
   border-right: 1px solid white;
   border-left: 1px solid white;
  }
  &.divider {
    background-color: white;
    height: 6px;
    border-top: 1px solid ${props=> props.theme.color};
  }
  &.comments {
    display: hidden;
    height: 0px;
  }
  &.comments.expanded {
    height: 50px;

  }
`;
const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-weight: 700;
  font-size: 18;
  padding: 1px;
  border-right: 1px solid ${props=>props.theme.color};
  border-left: 1px solid ${props=>props.theme.color};
  color: ${props=>props.theme.color};

  &.cap{
    text-transform: capitalize;
  }
`;
const SImg = styled.img`
  background-color: transparent;
  width: 65px;
  height: 65px;
  padding: 5px;
  `;
const FW = styled.div`
  width: 100%;
  `;
class ItemsRank extends Component{
  i=0;
  devote(item){
    let myVote = item.votes.find(vote => {console.log(vote);return vote.user == this.props.authed.user_id});
    this.props.deVoteItem(item, myVote);
  }

  increment(item) {
    if(item.voted_by.indexOf(this.props.authed.user_id) == -1)
      this.props.voteItem(item, this.props.authed.user_id, 1);
    // this.props.cleanItem(item, this.props.authed.user_id, 1);
  }
  decrement(item) {
      if(item.voted_by.indexOf(this.props.authed.user_id) == -1)
        this.props.voteItem(item, this.props.authed.user_id, -1);
  }

  deleteItem(item){
    this.props.deleteItem(item);
  }

  showComments(item){
  }

  postComment(item, text){
    console.log(this.props);
    this.props.addPost({'item':item._id, 'writer':this.props.authed.user_id, 'text': text})
  }

  render(){
    console.log(this.props.posts);
    this.i=0;
    var myitems = this.props.category ? this.props.items.filter(a=> a.category == this.props.category._id) : this.props.items;
    myitems.sort((a,b)=>{return b.score - a.score;} );
    var header = this.props.category ? this.props.category.name : 'Items Ranking'
    return <StrippedContainer header={header}>
      <Table>
          {myitems.map( (item) =>
            { this.i++;
              return ([
                      <Tr>
                        <Td>#{this.i}</Td>
                        <Td>
                          {item.voted_by.indexOf(this.props.authed.user_id) > -1 ? [<FW>{item.score}</FW>, <Sign onClick={this.devote.bind(this, item)}>b</Sign>]
                        :  [
                                                                                      <Sign onClick={this.increment.bind(this, item)}>+</Sign>,
                                                                                      <FW>{item.score}</FW>,
                                                                                      <Sign onClick={this.decrement.bind(this, item)}>-</Sign>,
                                                                                    ]}
                          </Td>
                        <Td><SImg className='item' src={item.image}/></Td>
                        <Td className="cap">{item.name}</Td>
                        <Td className="cap">{item.author}</Td>
                        <Td>{item.description}</Td>
                        <Td><Sign onClick={this.deleteItem.bind(this, item)}>D</Sign></Td>
                        <Td><Sign onClick={this.showComments.bind(this, item)}>C</Sign></Td>
                      </Tr>,
                      <Tr className="comments">
                        <Td colSpan='8'>
                          <CommentsSection  posts={this.props.posts.filter(post=> post.item === item._id)}
                                            item={item} postComment={this.postComment.bind(this)}
                                            users={this.props.users} authed={this.props.authed}
                                            deletePost={this.props.deletePost}>
                          </CommentsSection>
                        </Td>

                      </Tr>
                   ])}
        )}
      </Table>

    </StrippedContainer>
  }
}

export default ItemsRank;
// <Tr className="divider"></Tr>,
