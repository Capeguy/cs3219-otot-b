import React from 'react'

import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CCol } from '@coreui/react'
import PropTypes from 'prop-types'

const Question = ({ question }) => {
  return (
    <CCol>
      <h3>{question.title}</h3>
      <br />
      <p className="text-medium-emphasis" style={{ whiteSpace: 'preWrap' }}>
        {question.body}
      </p>
      <CAccordion alwaysOpen className="mt-3">
        {question.hints.map((hint, index) => (
          <div key={index}>
            <CAccordionItem itemKey={index}>
              <CAccordionHeader>Show Hint #{index + 1}</CAccordionHeader>
              <CAccordionBody>{hint}</CAccordionBody>
            </CAccordionItem>
          </div>
        ))}
      </CAccordion>
    </CCol>
  )
}

Question.propTypes = {
  question: PropTypes.object,
}

export default Question
