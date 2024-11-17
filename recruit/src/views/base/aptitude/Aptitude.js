import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Aptitude= () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Aptitude</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Click the drop down to expand course contents
            </p>
            <DocsExample href="components/accordion">
              <CAccordion activeItemKey={2}>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>Quantitative Aptitude</CAccordionHeader>
                  <CAccordionBody>
                    <strong>This is the first Lesson&#39;s Quantative Aptitude.</strong> Quantitative Aptitude Questions cover a wide range of topics, including averages, percentages, compound interests, and many more. It requires quantitative skills as well as logical and analytical skills that are needed for a wide range of exams, including those for bank jobs, civil service positions, management programs, and more. Solving Quantitative Aptitude Questions involves using logical reasoning and mathematical concepts to solve complex problems, and requires a deep understanding of the relevant topics. 

It&#39;s also worth noting 
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>Verbal Aptitude</CAccordionHeader>
                  <CAccordionBody>
                    <strong>This is the second Lesson&#39;s Verbal Aptitude.</strong>Verbal Ability is a major component of various competitive exams, it tests a capability of an individual to communicate effectively and accurately using words in a clear sound manner. Verbal Ability is an important measure for interviews and competitive examinations in India. For aspirants who want to excel in Verbal Ability, having a strong vocabulary and the ability to form sentences are essential skills. Verbal ability tests are designed to assess a candidate’s writing skills and abilities in questions like spotting errors, sentence corrections, sentence formation, synonyms, antonyms, and more.
        
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={3}>
                  <CAccordionHeader>Logical Reasoning</CAccordionHeader>
                  <CAccordionBody>
                    <strong>This is the Third Lesson&#39;s Reasoning.</strong> 
                    Aptitude questions can be challenging, but with the right preparation and practice, you can tackle them with ease. Our comprehensive guide to aptitude questions and answers covers all the essential topics of Aptitude, including Quantitative Aptitude, Logical Reasoning, and Verbal Ability. Whether you’re a student preparing for an examination or looking for a job to improve your problem-solving skills. With our step-by-step guide and sample questions, you will gain the confidence to tackle aptitude questions in interviews and competitive exams with ease..
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={3}>
                  <CAccordionHeader>Diagrammatic Reasoning</CAccordionHeader>
                  <CAccordionBody>
                    <strong>This is the Fourth Lesson&#39;s Diagrammatic.</strong> 
                    The construct of diagrammatic reasoning is about the understanding of concepts and information that is visualized with the use of diagrams and figures. Diagrammatic reasoning tests often have little or no textual support, nor does it contain numerical information.
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={3}>
                  <CAccordionHeader>Abstract Reasoning</CAccordionHeader>
                  <CAccordionBody>
                    <strong>This is the Fifth Lesson&#39;s Abstract.</strong> 
                    The abstract reasoning test assesses your mental ability to understand changes in shapes, generate unique real-time ideas and create new sketches derived from old illustrations. It also tests an individual's ability to derive logical connections between the available sets of data.This type of test is generally used to determine the creativity of a person and their ability to quickly solve novel problems.
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </DocsExample>
          </CCardBody>
        </CCard>

        
     
       
      </CCol>
    </CRow>
  )
}

export default Accordion
