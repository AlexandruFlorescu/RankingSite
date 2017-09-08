import React, {Component} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import { lighten } from 'polished'
import StrippedContainer from './UIElements/StrippedContainer';
import Sign from './UIElements/Sign'
import Modal from './Modal'
import ItemForm from './ItemForm'

import CommentsSection from './CommentsSection'

const Table = styled.table`
  width: calc(100% - 1px);
  border-collapse: collapse;
  border-spacing: 0 5px;
  overflow: y;
 `;
const Tr = styled.tr`
  min-height : 70px;
  height: 70px;
  max-height: 70px;
  border-top: 10px solid ${props=>props.theme.color};
  transition: all ease-in-out 0.1s;
  padding-bottom: 2px;

  &:hover img.item{
    transform: scale(1.1);
  }
  &:hover {
   color: white;
   background-color: ${props=>lighten(0.1,props.theme.color)};
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
    display: none;
  }
  &.comments#expanded {
    display: table-row;
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
  &.score{
    font-size: 162%;
  }
  &.title{
    font-size: 120%;
  }
 `;
const Desc = styled.div`
  padding: 7px;
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
  constructor(props){
    super(props);
    this.state = {
      toggles: [],
      show: false,
      item: null
    }
  }

  //Metode de votare
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

  //Actiuni pe item
  deleteItem(item){
    this.props.deleteItem(item);
    this.props.posts.forEach(post => {if(post.item==item._id) this.props.deletePost(post)} );
  }
  editItem(item){
    this.setState({show:!this.state.show});
    this.setState({item:item});
  }

  //Comentarii
  hide(){
    this.setState({show: false});
  }
  showComments(item){
    // console.log(this.state);
    if(this.state.toggles.indexOf(item) > -1)
      this.setState({ toggles: this.state.toggles.filter(i => i !== item) })
    else this.setState({toggles: [...this.state.toggles, item] });
  }
  postComment(item, text){
    // console.log(this.props);
    this.props.addPost({'item':item._id, 'writer':this.props.authed.user_id, 'text': text})
  }

  render(){
    this.i=0;
    var myitems = !this.props.category ? this.props.items :
      this.props.items.filter(a=> a.category == this.props.category._id);
    myitems.sort((a,b)=>{return b.score - a.score;} );
    var header = this.props.category ? this.props.category.name : 'Items Ranking'
    console.log(myitems);
    return <StrippedContainer header={header}>
      <Table>
          {myitems.map( (item) =>
            { this.i++;
              return ([
                      <Tr>
                        <Td className="score">#{this.i}</Td>
                        <Td>
                          {item.voted_by.indexOf(this.props.authed.user_id) > -1
                        ? [<FW>{item.score}</FW>, <Sign onClick={this.devote.bind(this, item)}>b</Sign>]
                        :  [<Sign className={!this.props.authed.user_id && "locked"} onClick={this.props.authed.user_id && this.increment.bind(this, item)}>+</Sign>,
                            <FW>{item.score}</FW>,
                            <Sign className={!this.props.authed.user_id && "locked"} onClick={this.props.authed.user_id && this.decrement.bind(this, item)}>-</Sign>,
                              ]}
                          </Td>
                        <Td><SImg className='item' src={item.image}/></Td>
                        <Td className="cap title">{item.name}</Td>
                        <Td className="cap">{item.author}</Td>
                        <Td><Desc>{item.description}</Desc></Td>
                        <Td><Sign className={this.props.category ? this.props.authed.user_id != this.props.category.owner && "locked" : 'locked' }
                                  onClick={this.props.category ? this.props.authed.user_id==this.props.category.owner && this.deleteItem.bind(this, item) : ''}>D</Sign>
                            <Sign className={this.props.category ? this.props.authed.user_id != this.props.category.owner && "locked" : 'locked' }
                                  onClick={this.props.category ? this.props.authed.user_id==this.props.category.owner && this.editItem.bind(this, item) : ''}>E</Sign>
                            <Sign onClick={this.showComments.bind(this, this.i)}>C</Sign></Td>
                      </Tr>,
                      <Tr className='comments ' id={this.state.toggles.indexOf(this.i) > -1 && "expanded" }>
                        <Td colSpan='8'>
                          <CommentsSection  id={this.state.toggles.indexOf(this.i) > -1 && "expanded" }
                                            posts={this.props.posts.filter(post=> post.item === item._id)}
                                            item={item} postComment={this.postComment.bind(this)}
                                            users={this.props.users} authed={this.props.authed}
                                            deletePost={this.props.deletePost}>
                          </CommentsSection>
                        </Td>

                      </Tr>
                   ])}
        )}
      </Table>
      {this.state.show && <Modal
        show={this.hide.bind(this)}
        color={this.props.color}
        header={'Add new item in ' + this.props.category.name}>
          <ItemForm category={this.props.category}
                    updateItem={this.props.updateItem}
                    item={this.state.item}
                    show={this.hide.bind(this)}>

          </ItemForm>
      </Modal>}
    </StrippedContainer>
  }
}

export default ItemsRank;
// <Tr className="divider"></Tr>,
