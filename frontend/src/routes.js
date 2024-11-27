import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Fileup'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Aptitude = React.lazy(() => import('./views/base/aptitude/Aptitude'))
const Breadcrumbs = React.lazy(() => import('./views/base/Python/python'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/Dbms/dbms'))
const Navs = React.lazy(() => import('./views/base/navs/java'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))

const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/Exams/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/Exam/realEx'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))



const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))



const Select = React.lazy(() => import('./views/forms/select/Aiint'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))



const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Submit Page (new route added)
const SubmitPage = React.lazy(() => import('./views/buttons/Exams/submit'))

const ProfilePage = React.lazy(() => import('./components/header/profile'))
const EditPage = React.lazy(() => import('./components/header/edit'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Resume', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Resume Upload', element: Colors },

  { path: '/base', name: 'Course Contents', element: Cards, exact: true },
  { path: '/base/aptitude', name: 'Aptitude', element: Aptitude },
  { path: '/base/breadcrumbs', name: 'Python', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'DBMS', element: ListGroups },
  { path: '/base/navs', name: 'Java', element: Navs },
  { path: '/base/paginations', name: 'C', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Exams', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Mock Exam', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Exams', element: ButtonGroups },
  { path: '/charts', name: 'Report', element: Charts },
  { path: '/forms', name: 'Interview', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Mock Interview', element: FormControl },
  { path: '/forms/select', name: 'AI interview', element: Select },

  

  
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Messages', element: Alerts },
  
  //{ path: '/notifications/modals', name: 'Modals', element: Modals },
 
  { path: '/widgets', name: 'Widgets', element: Widgets },

  // New route for the Submit page
  { path: '/submit', name: 'Submit', element: SubmitPage },
   {path: '/profile', element: ProfilePage},
   { path: '/edit', name: 'edit', element: EditPage }
]

export default routes
