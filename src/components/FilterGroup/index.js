import './index.css'

const FilterGroup = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    locationsList,
    getSalaryRangeId,
    getEmploymentTypeId,
    getLocationId,
    selectedSalaryRanges,
    selectedEmploymentType,
    selectedLocations,
  } = props

  const renderTypes = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">
        {employmentTypesList.map(eachType => (
          <li className="list-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              checked={selectedEmploymentType.includes(
                eachType.employmentTypeId,
              )}
              onChange={() => getEmploymentTypeId(eachType.employmentTypeId)}
            />
            <label
              htmlFor={eachType.employmentTypeId}
              className="checkbox-label"
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderLocations = () => (
    <>
      <h1 className="category-heading">Locations</h1>
      <ul className="categories-list">
        {locationsList.map(location => (
          <li className="list-item" key={location.id}>
            <input
              type="checkbox"
              id={location.id}
              checked={selectedLocations.includes(location.id)}
              onChange={() => getLocationId(location.id)}
            />
            <label htmlFor={location.id} className="checkbox-label">
              {location.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderRanges = () => (
    <>
      <h1 className="category-heading">Salary Range</h1>
      <ul className="categories-list">
        {salaryRangesList.map(range => (
          <li className="list-item" key={range.salaryRangeId}>
            <input
              type="radio"
              name="salary"
              id={range.salaryRangeId}
              checked={selectedSalaryRanges === range.salaryRangeId}
              onChange={() => getSalaryRangeId(range.salaryRangeId)}
            />
            <label htmlFor={range.salaryRangeId} className="checkbox-label">
              {range.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="filter-cont">
      {renderTypes()} {/* Type of Employment */}
      <hr className="hr-line" />
      {renderLocations()} {/* Locations */}
      <hr className="hr-line" />
      {renderRanges()} {/* Salary Range */}
    </div>
  )
}

export default FilterGroup
