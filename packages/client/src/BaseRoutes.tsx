import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import Loading from './components/Loading'
import Onboarding from './routes/Onboarding/Onboarding'

const Login = lazy(() => import('./routes/Login/Login'))
const ForgotPassword = lazy(() => import('./routes/ForgotPassword/ForgotPassword'))
const LoginCallback = lazy(() => import('./routes/Login/LoginCallback'))
const Register = lazy(() => import('./routes/Register/Register'))

const Shell = lazy(() => import('./routes/Shell/Shell'))
const Dashboard = lazy(() => import('./routes/Dashboard/Dashboard'))
const Clients = lazy(() => import('./routes/Clients/Clients'))
const ClientDetail = lazy(() => import('./routes/Clients/ClientDetail'))
const Invoices = lazy(() => import('./routes/Invoices/Invoices'))
const InvoiceDetail = lazy(() => import('./routes/Invoices/InvoiceDetail'))
const Profile = lazy(() => import('./routes/Profile/Profile'))

const BaseRoutes: FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<Shell />}>
          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path=":id" element={<ClientDetail />} />
          </Route>
          <Route path="invoices">
            <Route path=":id" element={<InvoiceDetail />} />
            <Route index element={<Invoices />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route index element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="onboarding" element={<Onboarding />} />
      </Route>
      <Route path="login">
        <Route path="callback" element={<LoginCallback />} />
        <Route index element={<Login />} />
      </Route>
      <Route path="forgot" element={<ForgotPassword />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </Suspense>
)

export default BaseRoutes
