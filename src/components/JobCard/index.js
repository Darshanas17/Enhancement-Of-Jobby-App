import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <div className="job-card-cont">
        <div className="company-title-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div className="title-rating-cont">
            <h1 className="company-title">{title}</h1>
            <div className="icon-and-details-cont">
              <AiFillStar className="star-icon" />
              <p className="rating-number">{rating}</p>
            </div>
          </div>
        </div>

        <div className="company-location-salary-cont">
          <div className="loaction-type-cont">
            <div className="icon-and-details-cont">
              <IoLocationSharp className="location-type-icon" />
              <p className="location-type">{location}</p>
            </div>

            <div className="icon-and-details-cont">
              <BsFillBriefcaseFill className="location-type-icon" />
              <p className="location-type">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line-2" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
