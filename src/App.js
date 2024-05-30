import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'

export default class App extends Component {
  pageSize = 6
  state = {
    progress : 0
  }
  apiKey = process.env.REACT_APP_NEWS_API_KEY

  setProgress = (progress) => {
    this.setState({progress : progress})
  }

  render() {
    return (
        <div>
    <BrowserRouter>
    <Navbar/>
    <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height = {3}
      />
      <Routes>
        <Route  exact path="/"  element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "general" pageSize = {this.pageSize} country = "in" category = "general" />}/>
        <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "Entertainment" pageSize = {this.pageSize} country = "in" category = "Entertainment" />}/>
        <Route exact path="/general" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "general" pageSize = {this.pageSize} country = "in" category = "General" />}/>
        <Route exact path="/health" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "Health" pageSize = {this.pageSize} country = "in" category = "Health" />}/>
        <Route exact path="/science" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "Science" pageSize = {this.pageSize} country = "in" category = "Science" />}/>
        <Route exact path="/business" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "Business" pageSize = {this.pageSize} country = "in" category = "Business" />}/>
        <Route exact path="/sports" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "Sports" pageSize = {this.pageSize} country = "in" category = "Sports" />}/>
        <Route exact path="/technology" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key = "Technology" pageSize = {this.pageSize} country = "in" category = "Technology" />}/>
      </Routes>
    </BrowserRouter>
    
    </div>
    )
  }
}

