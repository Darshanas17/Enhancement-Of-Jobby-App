import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="company-title-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobCard
