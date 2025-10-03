import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    selectedEmploymentType: [],
    selectedSalaryRanges: '',
    selectedLocations: [],
    searchInput: '',
    jobDetailsList: [],
    jobsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getEmploymentTypeId = id => {
    const {selectedEmploymentType} = this.state
    const updatedList = selectedEmploymentType.includes(id)
      ? selectedEmploymentType.filter(each => each !== id)
      : [...selectedEmploymentType, id]

    this.setState({selectedEmploymentType: updatedList}, this.getJobDetails)
  }

  getSalaryRangeId = id => {
    this.setState({selectedSalaryRanges: id}, this.getJobDetails)
  }

  getLocationId = id => {
    const {selectedLocations} = this.state
    const updatedList = selectedLocations.includes(id)
      ? selectedLocations.filter(each => each !== id)
      : [...selectedLocations, id]

    this.setState({selectedLocations: updatedList}, this.getJobDetails)
  }

  getJobDetails = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {
      selectedEmploymentType,
      selectedSalaryRanges,
      selectedLocations,
      searchInput,
    } = this.state

    const joinedEmploymentType = selectedEmploymentType.join(',')
    const joinedLocations = selectedLocations.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedEmploymentType}&minimum_package=${selectedSalaryRanges}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        rating: job.rating,
        location: job.location,
        jobDescription: job.job_description,
        packagePerAnnum: job.package_per_annum,
        employmentType: job.employment_type,
        companyLogoUrl: job.company_logo_url,
      }))

      this.setState({
        jobDetailsList: updatedJobs,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobDetails()
  }

  renderJobsBasedOnAPiStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoaderView()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderJobsApiFailureView()
      default:
        return null
    }
  }

  renderJobsLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobDetailsList, selectedLocations} = this.state

    const filteredJobs = selectedLocations.length
      ? jobDetailsList.filter(job =>
          selectedLocations.some(
            location => location.toLowerCase() === job.location.toLowerCase(),
          ),
        )
      : jobDetailsList

    return filteredJobs.length > 0 ? (
      <ul className="jobs-list-cont">
        {filteredJobs.map(job => (
          <JobCard key={job.id} eachJob={job} />
        ))}
      </ul>
    ) : (
      this.renderNoJobsView()
    )
  }

  renderJobsApiFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {salaryRangesList, employmentTypesList, locationsList} = this.props
    const {
      selectedSalaryRanges,
      selectedEmploymentType,
      selectedLocations,
      searchInput,
    } = this.state

    return (
      <>
        <Header />
        <div className="job-cont">
          <div className="job-sidebar">
            <ProfileCard />
            <hr className="hr-line" />
            <FilterGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              locationsList={locationsList}
              getSalaryRangeId={this.getSalaryRangeId}
              getEmploymentTypeId={this.getEmploymentTypeId}
              getLocationId={this.getLocationId}
              selectedSalaryRanges={selectedSalaryRanges}
              selectedEmploymentType={selectedEmploymentType}
              selectedLocations={selectedLocations}
            />
          </div>
          <div className="job-content-cont">
            <div className="search-cont">
              <input
                type="search"
                role="searchbox"
                value={searchInput}
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsBasedOnAPiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
