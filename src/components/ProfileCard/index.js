import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProfileCard extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, imageUrl, bio} = profileData
    return (
      <>
        <div className="card">
          <img src={imageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{bio}</p>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <button
      type="button"
      className="logout-btn"
      onClick={this.getProfileDetails}
    >
      Retry
    </button>
  )

  render() {
    return <div className="profile-card">{this.renderProfileDetails()}</div>
  }
}
export default ProfileCard
