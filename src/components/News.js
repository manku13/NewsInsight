import React, { Component } from 'react'
import NewsItems from './NewsItem'
import SpinnerLogo from './spinnerLogo';
import PropTypes from 'prop-types'


export default class News extends Component {
    articles = []

    static defaultProps = {
      country : "in",
      pageSize : 6,
      category : "general"
    }

    static propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string
    }
    constructor() {
        super(); 
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            totalResults : 0
        }
    }

    async fetchData(page) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=775d417bc9cb4e089e1191d2ea08b564&page=${page}&pageSize=${this.props.pageSize}`
        this.setState({loading : true})
        let parseData = await fetch(url)
        let data = await parseData.json()
        this.setState({articles : data.articles, loading  :  false, totalResults: data.totalResults})
        console.log(data)
        console.log(this.props.pageSize)
    }
    componentDidMount(){
      this.fetchData(1)
    }
    handlePreviousClick = () => {
      if(this.state.page > 1) {
        this.setState((prevState) => ({page : prevState.page - 1}), () => {
          this.fetchData(this.state.page)
          window.scrollTo(0,0)
        }
      )}
    }

    handleNextClick = () => {
      this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
          this.fetchData(this.state.page);
          window.scrollTo(0,0)
      });
  }
    render() {
    console.log("render")
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsInsight - Read Latest News</h2>
        <h2 className='text-center'>{this.state.loading && <SpinnerLogo /> }</h2>
        <div  className = "row">
            {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.publishedAt}>
            <NewsItems title = {element.title?element.title:""} description = {element.description?element.description:""}
            imageUrl = {element.urlToImage?element.urlToImage:"https://static3.depositphotos.com/1005460/268/i/950/depositphotos_2683219-stock-photo-top-news.jpg"} 
            newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
            {/* <NewsItems title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,80):""}
            imageUrl = {element.urlToImage?element.urlToImage:"https://static3.depositphotos.com/1005460/268/i/950/depositphotos_2683219-stock-photo-top-news.jpg"} newsUrl = {element.url}/> */}
            </div>
            })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button type="button" className="btn btn-dark" onClick={this.handlePreviousClick} disabled = {this.state.page <= 1}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
