import { TVMCardsContextProvider } from "@/context";
import { lazy, Suspense } from "react";

// Lazy imports
const Loader = lazy(() => import("@/components/Loader/Loader"));
const Exceptions = lazy(() => import("@/pages/Exceptions"));
const Remediation = lazy(() => import("@/pages/Remedition"));
const AllCustomer = lazy(() => import("@/pages/AllCustomer"));
const VulnerabilityData = lazy(() => import("@/pages/VulnerablityData"));
const ApplicationVulnerability = lazy(() =>
  import("@/pages/ApplicationVulnerability")
);
const InfraStructureVulnerability = lazy(() =>
  import("@/pages/InfrastructureVulnerability")
);
const AllEmployee = lazy(() => import("@/pages/AllEmployee"));
const Reports = lazy(() => import("@/pages/Reports"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const AssertInventory = lazy(() => import("@/pages/AssertInventory"));
const ChangePassword = lazy(() => import("@/pages/ChangePassword"));
const AdminBookDemo = lazy(() => import("@/pages/AdminBookDemo"));
const ApplicationSoftwareInventory = lazy(() =>
  import("@/pages/ApplicationSoftwareInventory")
);
const EmailConfigPanel = lazy(() => import("@/pages/Configure"));
const Roles = lazy(() => import("@/pages/Roles"));
const JiraDataTable = lazy(() => import("@/pages/JiraDataTable"));
const Partners = lazy(() => import("@/pages/Partners"));
const ThirdPartyIntegrations = lazy(() =>
  import("@/pages/ThirdPartyIntegrations")
);
const UserProfile = lazy(() => import("@/pages/UserDetails"));
const PendingAssessment = lazy(() => import("@/pages/PendingAssessment"));
const ApplicationData = lazy(() => import("@/pages/ApplicationData"));
const InfrastructureData = lazy(() => import("@/pages/InfrastructureData"));
const BusinessApplications = lazy(() => import("@/pages/BusinessApplications"));
const VulnerabilityForm = lazy(() => import("@/pages/AddVulnerabilityData"));
const ExceptionTable = lazy(() => import("@/pages/ExceptionTable"));
const TagsPage = lazy(() => import("@/pages/TagConfig"));
const DemoDashboard = lazy(() => import("@/pages/demo/Dashboard"));
const RiskOperation = lazy(() => import("@/pages/RiskQuantification"));
const ExecutiveDashboard = lazy(() => import("@/pages/ExecutiveDashboard"));
const InProgressAssessment = lazy(() => import("@/pages/InProgress"));
const CompleteAssessment = lazy(() => import("@/pages/CompleteAssessment"));
const Severity = lazy(() => import("@/pages/SLA-Configuration"));
const ASMDashboard = lazy(() => import("@/pages/ASMDashboard"));
const AssessmentCenter = lazy(() => import("@/pages/AssessmentCenter"));
const PendingVulnerability = lazy(() => import("@/pages/PendingVulnerability"));
const DownloadReports = lazy(() => import("@/pages/DownloadReport"));
const Home = lazy(() => import("@/pages/Home"));
const SchedulingAssessmentPage = lazy(() =>
  import("@/pages/SchedulingAssessment")
);

// ========================== all skeletons load here ==========================
const ExecutiveDashboardLayoutSkeleton = lazy(() =>
  import("@/Skeletons/ExecutiveDashbord/ExecutiveDashboardLayoutSkeleton")
);

const TvmDashboardLayoutSkeleton = lazy(() =>
  import("@/Skeletons/TvmDashboard/TvmDashboardLayoutSkeleton")
);

export const PrivateRoutes = [
  {
    path: "/tvm-dashboard",
    element: (
      <TVMCardsContextProvider>
        <Suspense fallback={<TvmDashboardLayoutSkeleton />}>
          <Home />
        </Suspense>
      </TVMCardsContextProvider>
    ),
  },
  {
    path: "/assesment-schedule",
    element: (
      <Suspense>
        <SchedulingAssessmentPage />
      </Suspense>
    ),
  },
  {
    path: "/pending-assesment",
    element: (
      <Suspense>
        <PendingAssessment />
      </Suspense>
    ),
  },
  {
    path: "/vulnerability-data",
    element: (
      <Suspense fallback={<Loader />}>
        <VulnerabilityData />
      </Suspense>
    ),
  },
  {
    path: "/application-data",
    element: (
      <Suspense fallback={<Loader />}>
        <ApplicationData />
      </Suspense>
    ),
  },
  {
    path: "/infrastructure-data",
    element: (
      <Suspense fallback={<Loader />}>
        <InfrastructureData />
      </Suspense>
    ),
  },
  {
    path: "/third-party-data",
    element: (
      <Suspense>
        <JiraDataTable />
      </Suspense>
    ),
  },
  {
    path: "/third-party-integrations",
    element: (
      <Suspense>
        <ThirdPartyIntegrations />
      </Suspense>
    ),
  },
  {
    path: "/all-tenant",
    element: (
      <Suspense>
        <AllCustomer />
      </Suspense>
    ),
  },
  {
    path: "/config-email",
    element: (
      <Suspense>
        <EmailConfigPanel />
      </Suspense>
    ),
  },
  {
    path: "/roles",
    element: (
      <Suspense>
        <Roles />
      </Suspense>
    ),
  },
  {
    path: "/partners",
    element: (
      <Suspense>
        <Partners />
      </Suspense>
    ),
  },
  {
    path: "/all-users",
    element: (
      <Suspense>
        <AllEmployee />
      </Suspense>
    ),
  },
  {
    path: "/application-dashboard",
    element: (
      <Suspense>
        <ApplicationVulnerability />
      </Suspense>
    ),
  },
  {
    path: "/infrastructure-dashboard",
    element: (
      <Suspense>
        <InfraStructureVulnerability />
      </Suspense>
    ),
  },
  {
    path: "/exceptions-dashboard",
    element: (
      <Suspense>
        <Exceptions />
      </Suspense>
    ),
  },
  {
    path: "/remedition",
    element: (
      <Suspense>
        <Remediation />
      </Suspense>
    ),
  },
  {
    path: "/reports",
    element: (
      <Suspense>
        <Reports />
      </Suspense>
    ),
  },
  {
    path: "/chat/:chatId",
    element: (
      <Suspense>
        <ChatPage />
      </Suspense>
    ),
  },
  {
    path: "/infraStructure-asset",
    element: (
      <Suspense>
        <AssertInventory />
      </Suspense>
    ),
  },
  {
    path: "/change-password",
    element: (
      <Suspense>
        <ChangePassword />
      </Suspense>
    ),
  },
  {
    path: "/user-details",
    element: (
      <Suspense>
        <UserProfile />
      </Suspense>
    ),
  },
  {
    path: "/book-demo",
    element: (
      <Suspense>
        <AdminBookDemo />
      </Suspense>
    ),
  },
  {
    path: "/application",
    element: (
      <Suspense>
        <ApplicationSoftwareInventory />
      </Suspense>
    ),
  },
  {
    path: "/business-applications",
    element: (
      <Suspense>
        <BusinessApplications />
      </Suspense>
    ),
  },
  {
    path: "/add-vulnerability-data",
    element: (
      <Suspense>
        <VulnerabilityForm />
      </Suspense>
    ),
  },
  {
    path: "/pending-exception",
    element: (
      <Suspense>
        <ExceptionTable />
      </Suspense>
    ),
  },
  {
    path: "/tags",
    element: (
      <Suspense>
        <TagsPage />
      </Suspense>
    ),
  },
  {
    path: "/demo",
    element: (
      <Suspense>
        <DemoDashboard />
      </Suspense>
    ),
  },
  {
    path: "/risk-details",
    element: (
      <Suspense>
        <RiskOperation />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <Suspense>
            <ExecutiveDashboardLayoutSkeleton />
          </Suspense>
        }
      >
        <ExecutiveDashboard />
      </Suspense>
    ),
  },
  {
    path: "/edit-vulnerability-data",
    element: (
      <Suspense>
        <VulnerabilityForm />
      </Suspense>
    ),
  },
  {
    path: "/in-progress-assessment",
    element: (
      <Suspense>
        <InProgressAssessment />
      </Suspense>
    ),
  },
  {
    path: "/completed-assessment",
    element: (
      <Suspense>
        <CompleteAssessment />
      </Suspense>
    ),
  },
  {
    path: "/sla-configuration",
    element: (
      <Suspense>
        <Severity />
      </Suspense>
    ),
  },
  {
    path: "/center-dashboard",
    element: (
      <Suspense>
        <ASMDashboard />
      </Suspense>
    ),
  },
  {
    path: "/assessment-center",
    element: (
      <Suspense>
        <AssessmentCenter />
      </Suspense>
    ),
  },
  {
    path: "/pending-vulnerability",
    element: (
      <Suspense>
        <PendingVulnerability />
      </Suspense>
    ),
  },
  {
    path: "/download-report",
    element: (
      <Suspense>
        <DownloadReports />
      </Suspense>
    ),
  },
];
