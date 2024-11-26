import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Cpro = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Programming in C</strong>
          </CCardHeader>
          <CCardBody>
        
            <strong>What is C?</strong>


<p><strong>C</strong> is a general-purpose, procedural, high-level programming language commonly used in software development, system programming, and game development. It is known for its simplicity, efficiency, and foundational role in computer science.</p>

<p>C was developed by <strong>Dennis M. Ritchie</strong> at Bell Telephone Laboratories in <strong>1972</strong>. Originally, it was created for programming the UNIX operating system, and it has since become one of the most widely used programming languages globally.</p>

<p>C's simplicity and efficiency make it an ideal language for beginners, providing a solid foundation in programming concepts. Its powerful and flexible nature allows for low-level access to memory, which is useful for system-level programming and performance-critical applications.</p>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Cpro
