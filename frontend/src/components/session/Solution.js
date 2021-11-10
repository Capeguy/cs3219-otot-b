import React from 'react'

import { CCol } from '@coreui/react'
import PropTypes from 'prop-types'

const Solution = ({ question }) => {
  return (
    <CCol>
      <h3>{`${question.title} (Solution)`}</h3>
      <br />
      <p className="text-medium-emphasis" style={{ whiteSpace: 'pre-wrap' }}>
        {question.solution}
      </p>
    </CCol>
  )
}

Solution.propTypes = {
  question: PropTypes.object,
}

export default Solution
