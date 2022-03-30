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
const Invoices = lazy(() => import('./routes/Invoices/Invoices'))
const Profile = lazy(() => import('./routes/Profile/Profile'))

const BaseRoutes: FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="onboarding" element={<Onboarding />} />
      </Route>
      <Route path="login/callback" element={<LoginCallback />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot" element={<ForgotPassword />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </Suspense>
)

export default BaseRoutes
