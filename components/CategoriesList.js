//externals
import React, {Component} from 'react'
import styled from 'styled-components'

//internals
import CategoryCard from './CategoryCard'
import AddCategory from './AddCategory'

//stuff I should have declared someplace else
const DashboardWrapper= styled.div`
  width: 90%;
  height: 92.5vh;
  margin-left:101px;
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
  justify-content: space-around;
  `;

class CategoriesList extends Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.authed);
    return (
      <DashboardWrapper>
          <AddCategory
          authed= {this.props.authed} color={this.props.color} addCategory = {this.props.addCategory}></AddCategory>
          {this.props.categories.map( (category)=>
            <CategoryCard key={this.props.categories.indexOf(category)}
                          category={category}
                          items = {this.props.items}
                          color={this.props.color}
                          addItem={this.props.addItem}
                          delete={this.props.delete}
                          deleteItem = {this.props.deleteItem}
                          router = {this.props.router}
                          users={this.props.users}
                          authed={this.props.authed}
                          /> )}
      </DashboardWrapper>
    )
  }
}

export default CategoriesList
