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

class Main extends Component{
  componentWillMount(){
    if(this.props.users.length <= 0 && localStorage.getItem('manageToken'))
      this.props.actions.initializeUsers();
    if(this.props.categories.length <= 0 && localStorage.getItem('manageToken'))
      this.props.actions.initializeCategories();
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
              delete = {this.props.actions.deleteCategory}>
            </CategoriesList>
          </Route>
          <Route exact path="/addCategory">
            <CategoryForm
              authed = {this.props.authed}
              addCategory = {this.props.actions.addCategory}>
            </CategoryForm>
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
