import SettingsIcon from '@mui/icons-material/Settings';
export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'Appointment Management', type: 'label' },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' }
  //   ]
  // },
  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' }
  //   ]
  // },


  { name: 'Appointment Scheduling', path: '/appointmentSchedule', icon: 'edit_calendar' },

  { name: 'Patient Visit', path: '/patientVisit', icon: 'vaccines' },

  { label: 'Patient Management', type: 'label' },
  {
    name: 'Patient Management',
    icon: 'airline_seat_flat',
    // badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Patient Registration', path: '/patientForm', iconText: 'A' },
      { name: 'Patients Record', path: '/registeredPatient', iconText: 'B' },
      // {name:'Patient Visit', path:'/patientVisit',iconText:'B'}
    ]
  },
  { label: 'Doctor Management', type: 'label' },
  {
    name: 'Doctor Management',
    icon: 'earbuds',
    // badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Doctor Registration', path: '/doctorform', iconText: 'A' },
      { name: 'Available Doctors', path: '/registeredDoctors', iconText: 'B' },
      

    ]
  },
  { label: 'Invoice Management', type: 'label' },
  {
    name: 'Invoice  Management',
     
        icon: 'receipt_icon',
    // badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Create Invoice', path: '/createInvoice', iconText: 'A' },
     
      

    ]
  },

  { label: 'Setup', type: 'label' },
  {
    name:'Setup',
    icon: 'settings',
  children:[
 
  {
    name: 'Diseases',
    path: '/addDiseases',
   
  },{
    name: 'Branches',
    path: '/addBranches',
   
  },
  {
    name: 'Services',
    path: '/services',
   
  },


]},


  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/'
  // }
];
