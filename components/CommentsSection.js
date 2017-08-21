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
    background-color: ${props=> props.theme.color};
    color: white;
  }
`;

const CommentAndActions = styled.div`
  height: 100%;
  display: flex;
  padding-top: 15px;
  justify-content: center;
`;

const Comment = styled.div`
  margin-top: 3px;
  padding-left: 5px;
  padding-bottom: 5px;
`;
const TextArea = styled.textarea`
  height: 20vh;
  width: 50vw;
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
  padding: 5px;
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

  render() {
    return <CommentsWrapper>
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
                  <Sign onClick={this.delete.bind(this, post)}>D</Sign>
                </CommentAndActions>
              </Line> })}
              <Line>
                <Profile>
                  <Img src={this.props.authed.picture} />
                  <br/>
                  {this.props.authed.nickname}
                </Profile>
                <Form>
                  <TextArea value={this.state.comment} onChange={this.handleChange.bind(this)}/>
                  <Button onClick={this.props.postComment.bind(this, this.props.item, this.state.comment)}> POST </Button>
                </Form>
              </Line>
          </CommentsWrapper>;
  }
}

export default CommentsSection;
