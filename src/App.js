import { Component } from "react";

import JokeCategoryItem from "./JokeCategoryItem";
import "./App.css";

class App extends Component {
  state = {
    categoriesList: [],
  };

  componentDidMount() {
    this.getChunkDetails();
  }

  getChunkDetails = async () => {
    const chunkUrl = "https://api.chucknorris.io/jokes/categories";

    const options = {
      method: "GET",
    };

    const response = await fetch(chunkUrl, options);

    const data = await response.json();
    this.setState({ categoriesList: data });
  };

  render() {
    const { categoriesList } = this.state;

    return (
      <div className="bg-container">
        <h1 className="chunk-noories-title">Chuck Norries</h1>
        <ul className="categories-list-container">
          {categoriesList.map((category, index) => (
            <JokeCategoryItem
              category={category}
              id={index + 1}
              key={index + 1}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
