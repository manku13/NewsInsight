import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import React, { Component } from 'react'

export default class App extends Component {
  pageSize = 15
  render() {
    return (
        <div>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route  exact path="/"  element={<News key = "general" pageSize = {this.pageSize} country = "in" category = "general" />}/>
        <Route exact path="/entertainment" element={<News key = "Entertainment" pageSize = {this.pageSize} country = "in" category = "Entertainment" />}/>
        <Route exact path="/general" element={<News key = "general" pageSize = {this.pageSize} country = "in" category = "General" />}/>
        <Route exact path="/health" element={<News key = "Health" pageSize = {this.pageSize} country = "in" category = "Health" />}/>
        <Route exact path="/science" element={<News key = "Science" pageSize = {this.pageSize} country = "in" category = "Science" />}/>
        <Route exact path="/business" element={<News key = "Business" pageSize = {this.pageSize} country = "in" category = "Business" />}/>
        <Route exact path="/sports" element={<News key = "Sports" pageSize = {this.pageSize} country = "in" category = "Sports" />}/>
        <Route exact path="/technology" element={<News key = "Technology" pageSize = {this.pageSize} country = "in" category = "Technology" />}/>
      </Routes>
    </BrowserRouter>
    
    </div>
    )
  }
}

