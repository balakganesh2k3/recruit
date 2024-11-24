import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Student',
  },
  {
    component: CNavItem,
    name: 'Resume upload',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  /*{
    component: CNavItem,
    name: 'Test Statistics',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },*/
  {
    component: CNavTitle,
    name: 'Learning',
  },
  {
    component: CNavGroup,
    name: 'Course Contents',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Aptitude',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Python',
        to: '/base/breadcrumbs',
      },
      
      {
        component: CNavItem,
        name: 'DBMS',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Java',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'C',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'C++',
        to: '/base/placeholders',
      },
      
      
    ],
  },
  {
    component: CNavGroup,
    name: 'Exam',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Mock Exam',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Exam',
        to: '/buttons/button-groups',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Interview',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Mock Interview',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'AI interview',
        to: '/forms/select',
      },
      
     
    ],
  },
  {
    component: CNavItem,
    name: 'Report',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Messages',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Requests',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/notifications/modals',
      },
     
    ],
  },
  
 
 
]

export default _nav
