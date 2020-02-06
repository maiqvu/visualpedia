import React from 'react';
import axios from 'axios';
import '../NewsFeed.css'
const URL = 'https://newsapi.org/v2/top-headlines?country='
const CATAGORY = '&category=science'
const API_KEY = process.env.REACT_APP_NEWS_FEED_API_KEY
// process.env.REACT_APP_NEWS_FEED_API_KEY
class NewsFeed extends React.Component {

  state = {
    allArticles: []
  }
  performSearch = (search='us') => {
    axios.get(`${URL}${search}${CATAGORY}&apiKey=${API_KEY}`)
    .then(res => {
      console.log(res.data.articles);
      this.setState({allArticles: res.data.articles})
    })
    .catch( err => {
      console.warn(err)
    })
  }

  limitString = (longString) => {
      longString = longString.substring(0,50)
    return longString
  }
    componentDidMount(){

       this.performSearch(this.props.localSearch)
    }

    render(){
      return(
        <div className="articles">
          <h5 className="newsHeadline">In Science News</h5>
          {
            this.state.allArticles !== 0
            ?
            <div className="artilceList">
            {this.state.allArticles.map((t, index) => {
              return (
              <div key={index} className="artilceListDiv">
                    <a href={t.url} className="newsFeed"
                    target="_blank"><span>{this.limitString(t.title)}...</span></a>
              </div>
              )
            })}
            </div>
            :
            <h1></h1>
          }
          <p>
            <a id="poweredBy"href="https://newsapi.org/">powered by NewsAPI.org</a>
          </p>
        </div>
      )
    }
}

export default NewsFeed
