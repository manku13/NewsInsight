import React, { Component } from 'react'
import NewsItems from './NewsItem'
import SpinnerLogo from './spinnerLogo';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
  articles = []

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsInsight - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async fetchData(page) {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
    &page=${page}&pageSize=${this.props.pageSize}`
    this.props.setProgress(30)
    this.setState({ loading: true })
    let parseData = await fetch(url)
    let data = await parseData.json()
    this.props.setProgress(70)
    this.setState({ articles: data.articles, 
      loading: false, 
      totalResults: data.totalResults,
      hasMore: this.state.articles.length + data.articles.length < data.totalResults })
    this.props.setProgress(100)
  }
  componentDidMount() {
    this.fetchData(1)
  }

  // handlePreviousClick = () => {
  //   if (this.state.page > 1) {
  //     this.setState((prevState) => ({ page: prevState.page - 1 }), () => {
  //       this.fetchData(this.state.page)
  //       window.scrollTo(0, 0)
  //     }
  //     )
  //   }
  // }

  // handleNextClick = () => {
  //   this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
  //     this.fetchData(this.state.page);
  //     window.scrollTo(0, 0)
  //   });
  // }

  capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}
    &page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      hasMore: this.state.articles.length + parsedData.articles.length < parsedData.totalResults
    })
  }

  render() {
    return (
      <>
        <h2 className='text-center'>NewsInsight - Latest {this.capitalizeFirstLetter(this.props.category)} News</h2>
        <h2 className='text-center'>{this.state.loading && <SpinnerLogo />}</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<SpinnerLogo />}>

          <div className="container">

            <div className="row">
              {!this.state.articles ? <h1 className="text-center">404 Error Not Found</h1> : this.state.articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://static3.depositphotos.com/1005460/268/i/950/depositphotos_2683219-stock-photo-top-news.jpg"}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
            {/* <div className='container d-flex justify-content-between'>
      <button type="button" className="btn btn-dark" onClick={this.handlePreviousClick} disabled = {this.state.page <= 1}>&larr; Previous</button>
      <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button>
      </div> */}
          </div>
        </InfiniteScroll>
      </>
    )
  }
}
