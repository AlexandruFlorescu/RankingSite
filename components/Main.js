//externals
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

//internals
import actions from '../redux/actionCreators'
import Callback from './UIElements/Callback'
import UsersList from './UsersList'
import UserProfileContainer from './UserProfileContainer'
import ContactForm from './ContactForm'
import CategoriesList from './CategoriesList'
import CategoryForm from './CategoryForm'
import ItemForm from './ItemForm'
import ItemsRank from './ItemsRank'

class Main extends Component{
  componentWillMount(){
    if(this.props.users.length <= 0 && localStorage.getItem('manageToken'))
      this.props.actions.initializeUsers();
    if(this.props.categories.length <= 0 && localStorage.getItem('manageToken'))
      this.props.actions.initializeCategories();
    // console.log(this.props.items);
    if(this.props.items.length <= 0 && localStorage.getItem('manageToken'))
      this.props.actions.initializeItems();
    if(this.props.posts.length <= 0 && localStorage.getItem('manageToken'))
      this.props.actions.initializePosts();
    if(this.props.auth.isAuthenticated())
      {const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.props.actions.loginUser(profile.sub)
        });
      }}
  }

  render(){
    return (
      <main>
        <Switch>
          <Route exact path="/">
            <UsersList
              users={this.props.users}
              crews={this.props.crews}/>
          </Route>
          <Route exact path="/userProfile" >
            <UserProfileContainer
              afp = {{updateUser: this.props.actions.updateUser}}
              dfp = {{users:this.props.users, authed:this.props.authed }}/>
          </Route>
          <Route exact path="/contact">
            <ContactForm>
            </ContactForm>
          </Route>
          <Route exact path="/categories">
            <CategoriesList
              categories = {this.props.categories}
              items = {this.props.items}
              color = {this.props.ui.color}
              addItem = {this.props.actions.addItem}
              delete = {this.props.actions.deleteCategory}
              deleteItem = {this.props.actions.deleteItem}
              router = {this.props.router}
              users={this.props.users}
              authed = {this.props.authed}
              addCategory = {this.props.actions.addCategory}>
            </CategoriesList>
          </Route>
          <Route exact path="/addCategory">
            <CategoryForm
              authed = {this.props.authed}
              addCategory = {this.props.actions.addCategory}>
            </CategoryForm>
          </Route>
          <Route exact path="/addItem">
            <ItemForm
              categories ={this.props.categories}
              addItem  ={this.props.actions.addItem}>
            </ItemForm>
          </Route>
          <Route exact path="/getItems">
            <ItemsRank
              authed = {this.props.authed}
              category = {this.props.location.state && this.props.categories.find(cat =>cat._id === this.props.location.state.category)}
              users={this.props.users}
              items = {this.props.items}
              voteItem = {this.props.actions.voteItem}
              deVoteItem = {this.props.actions.deVoteItem}
              cleanItem = {this.props.actions.cleanItem}
              deleteItem = {this.props.actions.deleteItem}
              posts ={this.props.posts}
              addPost = {this.props.actions.addPost}
              deletePost = {this.props.actions.deletePost}
              >
            </ItemsRank>
          </Route>
          <Route path="/callback" render={(props)=>{
              this.props.auth.handleAuthentication();
              return <Callback {...props} />
              }}/>
        </Switch>
      </main>
    )
  }
}
export default Main

// <Route exact path="/crewsList">
//   <CrewsList
//     states={{crews: this.props.crews, authed: this.props.authed}}
//     actions={{addUserToCrew: this.props.actions.addUserToCrew, updateUser: this.props.actions.updateUser}}>
//   </CrewsList>
// </Route>
