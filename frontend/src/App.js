import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const AptitudeExamPage = React.lazy(() => import('./views/buttons/Exams/apexam'))
const CodeExamPage = React.lazy(() => import('./views/buttons/Exams/CodeEditor'))
const CodeStart = React.lazy(() => import('./views/buttons/Exams/codestart'))

// Test Start Page
const TestStart = React.lazy(() => import('./views/buttons/Exams/teststart')) // New component

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* Existing routes */}
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route path="/apexam" name="apexam" element={<AptitudeExamPage />} />
          <Route path="/code" name="Coding page" element={<CodeExamPage />} />

          {/* New Route */}
          <Route exact path="/start-test" name="Test Start Page" element={<TestStart />} />
          <Route exact path="/start-code" name="COde Start Page" element={<CodeStart />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
