//externals
import React, {Component} from 'react'
import styled from 'styled-components'

//internals
import CategoryCard from './CategoryCard'

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
    console.log(this.props.delete);
    return (
      <DashboardWrapper>
          {this.props.categories.map( (category)=>
            <CategoryCard key={this.props.categories.indexOf(category)}
                          category={category}
                          color={this.props.color}
                          addItem={this.props.addItem}
                          delete={this.props.delete}
                          router = {this.props.router}
                          /> )}
      </DashboardWrapper>
    )
  }
}

export default CategoriesList
