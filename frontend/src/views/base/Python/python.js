import React from 'react'
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Python = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
        <CCardHeader>
  <strong>Programming in Python</strong>
</CCardHeader>

 <p><strong>What is Python?</strong></p>
 <p>Python is a popular programming language created by Guido van Rossum and first released in 1991. It is commonly used for:</p>
 <ul>
  <li>Web development (server-side)</li>
  <li>Software development</li>
  <li>Mathematics</li>
  <li>System scripting</li>
 </ul>

 <p><strong>What can Python do?</strong></p>
 <p>Python has a wide range of applications:</p>
 <ul>
  <li>Creating web applications on a server</li>
  <li>Automating workflows in software</li>
  <li>Connecting to database systems, reading, and modifying files</li>
  <li>Handling big data and performing complex mathematics</li>
  <li>Rapid prototyping and developing production-ready software</li>
 </ul>

 <p><strong>Why Python?</strong></p>
 <p>Python offers several advantages:</p>
 <ul>
  <li>Works on multiple platforms (Windows, Mac, Linux, Raspberry Pi, etc.)</li>
  <li>Has a simple, English-like syntax</li>
  <li>Allows for concise code with fewer lines compared to some other languages</li>
  <li>Runs on an interpreter system, allowing quick prototyping</li>
  <li>Supports procedural, object-oriented, and functional programming approaches</li>
 </ul>

 <p><strong>Good to Know:</strong></p>
 <p>The most recent major version of Python is Python 3, which will be used in this tutorial. Python 2 is still in use but only receives security updates. In this tutorial, we will write Python code in a text editor, although an Integrated Development Environment (IDE) like Thonny, PyCharm, NetBeans, or Eclipse can be beneficial, especially for managing larger projects.</p>

 <p><strong>Python Syntax Compared to Other Programming Languages:</strong></p>
 <p>Python is designed for readability and has similarities to the English language with some influence from mathematics:</p>
 <ul>
  <li>Uses new lines instead of semicolons or parentheses to complete commands</li>
  <li>Relies on indentation (whitespace) to define scope for loops, functions, and classes, while other languages often use curly brackets</li>
 </ul>


        </CCard>
      </CCol>
    </CRow>
  )

}

export default Python
