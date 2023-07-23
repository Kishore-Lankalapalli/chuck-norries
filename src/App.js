import {Component} from 'react'

import JokeCategoryItem from '../src/JokeCategoryItem'
import './App.css'

class App extends Component {
  state = {
    categoriesList: [],
  }

  componentDidMount() {
    this.getChunkDetails()
  }

  getChunkDetails = async () => {
    const chunkUrl = 'https://api.chucknorris.io/jokes/categories'

    const options = {
      method: 'GET',
    }

    const response = await fetch(chunkUrl, options)

    const data = await response.json()
    this.setState({categoriesList: data})
  }

  render() {
    const {categoriesList} = this.state

    console.log(categoriesList)

    const newCategoriesList = []

    categoriesList.forEach((item, index) => {
      const newItem = {
        item,
        id: index + 1,
      }
      newCategoriesList.push(newItem)
    })

    console.log(newCategoriesList)

    return (
      <div className="bg-container">
        <h1 className="chunk-noories-title">Chuck Norries</h1>
        <ul className="categories-list-container">
          {categoriesList.map(category => (
            <JokeCategoryItem category={category} key={category.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
