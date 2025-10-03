import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <div className="home-cont">
          <Header />
          <div className="app-home-cont">
            <div className="sub-app-cont">
              <h1 className="home-heading">Find The Job That Fits Your Life</h1>
              <p className="home-description">
                Millions of people are searching for jobs, salary information,
                and company reviews. Find the job that matches your abilities
                and potential.
              </p>
              <Link to="/jobs">
                <button className="home-button" type="button">
                  Find Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Home
