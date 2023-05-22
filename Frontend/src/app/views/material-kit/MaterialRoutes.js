import { lazy } from 'react';
import Loadable from 'app/components/Loadable';
import DoctorForm from 'app/Pages/Doctor/DoctorForm';
import RegisteredDoctors from 'app/Pages/Doctor/RegisteredDoctors';
import RegisteredPatients from 'app/Pages/Patient/RegisteredPatients';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const materialRoutes = [
  { path: '/material/table', element: <AppTable /> },
  { path: '/material/form', element: <AppForm /> },
  { path: '/material/buttons', element: <DoctorForm /> },
  { path: '/material/icons', element: <RegisteredDoctors /> },
  { path: '/material/progress', element: <RegisteredPatients /> },
  { path: '/material/menu', element: <AppMenu /> },
  { path: '/material/checkbox', element: <AppCheckbox /> },
  { path: '/material/switch', element: <AppSwitch /> },
  { path: '/material/radio', element: <AppRadio /> },
  { path: '/material/slider', element: <AppSlider /> },
  { path: '/material/autocomplete', element: <AppAutoComplete /> },
  { path: '/material/expansion-panel', element: <AppExpansionPanel /> },
  { path: '/material/dialog', element: <AppDialog /> },
  { path: '/material/snackbar', element: <AppSnackbar /> }
];

export default materialRoutes;
