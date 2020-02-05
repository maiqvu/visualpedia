import React from 'react';
import axios from 'axios';
import '../NewsFeed.css'
const natgeo = require('national-geographic-api').NationalGeographicAPI;
class NewsFeed extends React.Component {

  state = {
    allArticles: [],
  }


  performSearch = () => {
    natgeo.getLatestNews()
    .then(result => {console.log(result)})
    .catch(err => console.warn(err))
  }

  limitString = (longString) => {
      longString = longString.substring(0,50)
    return longString
  }
    componentDidMount(){

       this.performSearch()
    }

    render(){

      return(

        <h1>test</h1>
        // <div className="articles">
        //   <h5 className="newsHeadline">Local News</h5>
        //   {
        //     this.state.allArticles !== 0
        //     ?
        //     <div className="artilceList">
        //     {this.state.allArticles.map((t, index) => {
        //       return (
        //       <div key={index} className="artilceListDiv">
        //             <a href={t.url} className="newsFeed"
        //             target="_blank"><span>{this.limitString(t.title)}...</span></a>
        //       </div>
        //       )
        //     })}
        //     </div>
        //     :
        //     <h1></h1>
        //   }
        // </div>
      )
    }
}

export default NewsFeed
