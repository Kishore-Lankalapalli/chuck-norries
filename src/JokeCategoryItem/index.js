import React, { Component } from "react";
import { RxCross2 } from "react-icons/rx";
import { ThreeCircles } from "react-loader-spinner";

import Popup from "reactjs-popup";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class JokeCategoryItem extends Component {
  state = {
    categoryItem: "",
    joke: {},
    jokeTextStatus: apiStatusConstants.initial,
  };

  getRespectiveJokesDetails = async () => {
    const { categoryItem } = this.state;

    this.setState({ jokeTextStatus: apiStatusConstants.inProgress });

    const url = `https://api.chucknorris.io/jokes/random?category=${categoryItem}`;
    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (response.ok) {
      this.setState({ joke: data, jokeTextStatus: apiStatusConstants.success });
    }
  };

  onSelectCategory = (category) => {
    this.setState({ categoryItem: category }, this.getRespectiveJokesDetails);
  };

  onChangeNextJoke = () => {
    this.setState(this.getRespectiveJokesDetails);
  };

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeCircles color="#ffffff" height="100%" width="100%" />
    </div>
  );

  render() {
    const { category, id } = this.props;

    const { categoryItem, joke, jokeTextStatus } = this.state;

    const { value } = joke;
    console.log(id);

    return (
      <Popup
        trigger={
          <li className="category-list-item">
            <button
              type="button"
              className="category-button"
              onClick={() => this.onSelectCategory(category)}
            >
              <h1 className="category-heading">{category}</h1>
              <p className="unlimited-jokes-text">
                Unlimited Jokes On {category}
              </p>
            </button>
          </li>
        }
        position="center center"
        modal
      >
        {(close) => (
          <div className="joke-container">
            <button
              onClick={() => close()}
              type="button"
              className="cancel-button"
            >
              <RxCross2 className="cross-icon" />
            </button>
            <div className="joke-main-container">
              <h1 className="joke-category-heading">{categoryItem}</h1>

              <div className="joke-text-container">
                {jokeTextStatus === apiStatusConstants.inProgress ? (
                  this.renderLoaderView()
                ) : (
                  <p className="joke-text">"{value}"</p>
                )}

                <button
                  className="next-joke-button"
                  type="button"
                  onClick={() => this.onChangeNextJoke()}
                >
                  Next Joke
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default JokeCategoryItem;
