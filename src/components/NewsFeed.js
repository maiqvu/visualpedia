import React from 'react';
import axios from 'axios';
import '../App.js'
const URL = 'https://newsapi.org/v2/top-headlines?country=us'

const API_KEY = 'apiKey=fc488d7d92e0499888abe5ddb0f1b9d8'

class NewsFeed extends React.Component {

  state = {
    allArticles: []
  }
  performSearch = () => {
    axios.get(`${URL}&${API_KEY}`)
    .then(res => {
      console.log(res.data.articles);
      this.setState({allArticles: res.data.articles})
    })
    .catch( err => {
      console.warn(err)
    })
  }

  limitString = (longString) => {
    // if(longString.length > 100) {
      longString = longString.substring(0,60)
    // }
    return longString
  }
    componentDidMount(){

       this.performSearch()
    }

    render(){
      return(
        <div className="articles">
          {
            this.state.allArticles !== 0
            ?
            <div className="artilceList">
            {this.state.allArticles.map((t, index) => {
              return (
              <div key={index} className="artilceListDiv">
                    <a href={t.url} className="newsfeed">{this.limitString(t.title)}...</a>
              </div>
              )
            })}
            </div>
            :
            <h1>hi</h1>
          }
        </div>
      )
    }
}

export default NewsFeed
