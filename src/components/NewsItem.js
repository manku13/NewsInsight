import React, { Component } from 'react'

export default class NavItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div className='my-3'>
                <div className="card">
                            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{zIndex: "1", left: "90%"}}>
                               {source}
                            </span>
                    <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "250px", objectFit: "cover" }} />
                    <div className="card-body">
                        
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} and Published at -
                            {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
