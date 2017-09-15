import React, {Component} from 'react';
import Input from './UIElements/Input'
import Button from './UIElements/Button'
import Sign from './UIElements/Sign'

import styled from 'styled-components';
import { lighten } from 'polished'

const CommentsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: -1px;
  background-color: white;
  transform: scaleY(0);
  transform-origin:top;
  transition: transform 5s linear;
  &#expanded{
    transform: scaleY(1);
  }
`;
// background-color: ${props=> props.theme.color};

// border-left: 4px solid ${props=> props.theme.color};
// border-right: 4px solid ${props=> props.theme.color};

const Line = styled.div`
  min-height: 60px;
  height: fit-content;
  background-color: white;
  color: ${props=> props.theme.color};
  text-align: center;
  margin: 2px;
  display: flex;
  justify-content: center;
  border-top: 5px solid ${props=> props.theme.color};
  &:hover{
    background-color: ${props=> lighten(0.1,props.theme.color)};
    color: white;
  }
`;

const CommentAndActions = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
  justify-content: center;
  height: fit-content;
`;

const Comment = styled.div`
  margin-top: 3px;
  padding-left: 5px;
  padding-bottom: 5px;
  height: fit-content;
`;
const TextArea = styled.textarea`
  height: 20vh;
  width: 60vw;
  margin-bottom: 5px;
  resize: none;
  border-radius: 3px;
  text-align: center;
  &:focus{
    outline: none !important;
    border: 1px solid ${props => props.theme.color};
  }

  &:selection{
    background-color: ${props => props.theme.color};
  }
`;

const Img = styled.img`
  height: 50px;
`;

const Profile = styled.div`
  padding: 0px 3px;

  float: left;
  background-color: ${props=> props.theme.color};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  padding: 15px;
`;

class CommentsSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      comment: ''
    }
  }

  handleChange(e){
    this.setState({'comment':e.target.value})
  }

  delete(post){
    this.props.deletePost(post);
  }

  postComment(){
    this.props.postComment(this.props.item, this.state.comment);
    this.setState({comment:''})
  }

  render() {
    // console.log(this.props.authed);
    return <CommentsWrapper id={this.props.id}>
      {this.props.posts.map(post=>{
        let user = this.props.users.find(user=>user.user_id == post.writer);
        return <Line>
                <Profile>
                  <Img src={user.picture} />
                  <br/>
                  {user.nickname}
                </Profile>
                <CommentAndActions>
                  <Comment>{post.text}</Comment>
                  <Sign className={user.user_id==this.props.authed.user_id ? '' : "locked"} onClick={user.user_id==this.props.authed.user_id && this.delete.bind(this, post)}>D</Sign>
                </CommentAndActions>
              </Line> })}
        {this.props.authed.picture &&
          <Line>
            <Profile>
              <Img src={this.props.authed.picture} />
              <br/>
              {this.props.authed.nickname}
            </Profile>
           <Form>
              <TextArea value={this.state.comment} onChange={this.handleChange.bind(this)}/>
              <Button onClick={this.postComment.bind(this, this.props.item, this.state.comment)}> POST </Button>
            </Form>
          </Line>
          }
        </CommentsWrapper>;
  }
}

export default CommentsSection;
