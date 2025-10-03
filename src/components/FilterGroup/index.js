import './index.css'

const FilterGroup = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    getSalaryRangeId,
    getEmploymentTypeId,
    selectedSalaryRanges,
    selectedEmploymentType,
  } = props

  const renderRanges = () => (
    <>
      <h1 className="category-heading">Salary Range</h1>
      <ul className="categories-list">
        {salaryRangesList.map(eachRange => (
          <li className="list-item" key={eachRange.salaryRangeId}>
            <input
              type="radio"
              name="salary"
              id={eachRange.salaryRangeId}
              checked={selectedSalaryRanges === eachRange.salaryRangeId}
              onChange={() => getSalaryRangeId(eachRange.salaryRangeId)}
            />
            <label htmlFor={eachRange.salaryRangeId} className="checkbox-label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

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

  return (
    <div className="filter-cont">
      {renderTypes()}
      <hr className="hr-line" />
      {renderRanges()}
    </div>
  )
}

export default FilterGroup
