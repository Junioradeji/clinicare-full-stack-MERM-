import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import LazyLoader from "../components/LazyLoader";
import { PublicRoutes, PrivateRoutes, VerifiedRoutes } from "./ProtectedRoutes";
import { useAuth } from "@/contextstore";
import ErrorBoundary from "@/components/ErrorBoundary";

// render pages
const RootLayout = lazy(() => import("@/layout/RootLayout"));
const Home = lazy(() => import("@/pages/home/Home"));
const ContactUs = lazy(() => import("@/pages/contact/ContactUs"));

const AuthLayout = lazy(() => import("@/layout/AuthLayout"));
const SignIn = lazy(() => import("@/pages/account/SignIn"));
const SignUp = lazy(() => import("@/pages/account/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/account/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/account/ResetPassword"));

const OnboardingLayout = lazy(() => import("@/layout/OnboardingLayout"));
const PatientOnboard = lazy(() => import("@/pages/Onboard/PatientOnboard"));
const VerifyAccount = lazy(() => import("@/pages/Onboard/VerifyAccount"));

const DashboardLayout = lazy(() => import("@/layout/DashboradLayout"));
const Dashboard = lazy(() =>
  import("@/pages/dashboard/theDashboard/Dashboard")
);
const Appointments = lazy(() =>
  import("@/pages/dashboard/appointments/Appointments")
);
const Doctors = lazy(() => import("@/pages/dashboard/doctors/Doctors"));
const Rooms = lazy(() => import("@/pages/dashboard/rooms/Rooms"));
const Patients = lazy(() => import("@/pages/dashboard/patients/Patients"));
const InPatients = lazy(() =>
  import("@/pages/dashboard/inPatients/InPatients")
);
const Payments = lazy(() => import("@/pages/dashboard/payments/Payments"));
const Settings = lazy(() => import("@/pages/dashboard/settings/Settings"));
const Account = lazy(() =>
  import("@/pages/dashboard/settings/account/Account")
);
const Password = lazy(() =>
  import("@/pages/dashboard/settings/password/Password")
);
const HealthRecord = lazy(() =>
  import("@/pages/dashboard/settings/healthRecord/HealthRecord")
);
const User = lazy(() => import("@/pages/dashboard/user/User"));
const PatientAppointments = lazy(() =>
  import("@/pages/dashboard/appointments/PatientAppointment")
);
const PatientPayments = lazy(() =>
  import("@/pages/dashboard/payments/PatientPayments")
);

// variables names here are capital letter because they going to be our component

export default function AppRoutes() {
  const { accessToken, user } = useAuth();
  const routes = [
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <RootLayout />
          </PublicRoutes>
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/Contact_Us",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ContactUs />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "account",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "signin",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <SignIn />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ForgotPassword />
            </Suspense>
          ),
        },

        {
          path: "reset-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ResetPassword />
            </Suspense>
          ),
        },
      ],
    },

    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <VerifiedRoutes accessToken={accessToken} user={user}>
            <OnboardingLayout />
          </VerifiedRoutes>
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/patient-onboard",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientOnboard />
            </Suspense>
          ),
        },
        {
          path: "/verify-account",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <VerifyAccount />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: "dashboard",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <DashboardLayout />
          </PrivateRoutes>
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Appointments />
            </Suspense>
          ),
        },
        {
          path: "patient-appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientAppointments />
            </Suspense>
          ),
        },

        {
          path: "rooms",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Rooms />
            </Suspense>
          ),
        },
        {
          path: "payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Payments />
            </Suspense>
          ),
        },
        {
          path: "patient-payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientPayments />
            </Suspense>
          ),
        },
        {
          path: "doctors",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Doctors />
            </Suspense>
          ),
        },
        {
          path: "patients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Patients />
            </Suspense>
          ),
        },
        {
          path: "inPatients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <InPatients />
            </Suspense>
          ),
        },
        {
          path: "settings",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Settings />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
          children: [
            {
              path: "account",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <Account />
                </Suspense>
              ),
            },
            {
              path: "password",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <Password />
                </Suspense>
              ),
            },
            {
              path: "health",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <HealthRecord />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "user",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <User />
            </Suspense>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
