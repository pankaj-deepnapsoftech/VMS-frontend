import AppErrorBoundary from "@/utils/Errorhandler";
import { lazy, Suspense } from "react";

// ========================= all skeletons here loaded=============
import TvmDashboardLayoutSkeleton from "@/Skeletons/TvmDashboard/TvmDashboardLayoutSkeleton";
import { RiskDetailsSkeletonLayout } from "@/Skeletons/RiskDetails/RiskDetailsSkeleton";
import ExecutiveDashboardLayoutSkeleton from "@/Skeletons/ExecutiveDashbord/ExecutiveDashboardLayoutSkeleton";
import { AssertInventorySkeletonLayout } from "@/Skeletons/AssetInventory/AssetInventorySkeleton";
import AssessmentSkeleton from "@/Skeletons/Assessment/AssessmentSkeleton";

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
const AssessmentCenter = lazy(() => import("@/pages/AttackSurfaceManagement"));
const PendingVulnerability = lazy(() => import("@/pages/PendingVulnerability"));
const DownloadReports = lazy(() => import("@/pages/DownloadReport"));
const Home = lazy(() => import("@/pages/Home"));
const SchedulingAssessmentPage = lazy(() =>
  import("@/pages/SchedulingAssessment")
);

export const PrivateRoutes = [
  {
    path: "/tvm-dashboard",
    element: (
      <Suspense fallback={<TvmDashboardLayoutSkeleton />}>
        <AppErrorBoundary>
          <Home />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/assesment-schedule",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <SchedulingAssessmentPage />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/pending-assesment",
    element: (
      <Suspense fallback={<AssessmentSkeleton />}>
        <AppErrorBoundary>
          <PendingAssessment />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/vulnerability-data",
    element: (
      <Suspense fallback={<Loader />}>
        <AppErrorBoundary>
          <VulnerabilityData />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/application-data",
    element: (
      <Suspense fallback={<Loader />}>
        <AppErrorBoundary>
          <ApplicationData />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/infrastructure-data",
    element: (
      <Suspense fallback={<Loader />}>
        <AppErrorBoundary>
          <InfrastructureData />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/third-party-data",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <JiraDataTable />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/third-party-integrations",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <ThirdPartyIntegrations />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/all-tenant",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <AllCustomer />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/config-email",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <EmailConfigPanel />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/roles",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <Roles />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/partners",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <Partners />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/all-users",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <AllEmployee />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/application-dashboard",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <ApplicationVulnerability />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/infrastructure-dashboard",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <InfraStructureVulnerability />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/exceptions-dashboard",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <Exceptions />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/remedition",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <Remediation />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/reports",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <Reports />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/chat/:chatId",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <ChatPage />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/infraStructure-asset",
    element: (
      <Suspense fallback={<AssertInventorySkeletonLayout />}>
        <AppErrorBoundary>
          <AssertInventory />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/change-password",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <ChangePassword />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/user-details",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <UserProfile />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/book-demo",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <AdminBookDemo />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/application",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <ApplicationSoftwareInventory />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/business-applications",
    element: (
      <Suspense fallback={<AssertInventorySkeletonLayout />}>
        <AppErrorBoundary>
          <BusinessApplications />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/add-vulnerability-data",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <VulnerabilityForm />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/pending-exception",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <ExceptionTable />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/tags",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <TagsPage />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/demo",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <DemoDashboard />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/risk-details",
    element: (
      <Suspense fallback={<RiskDetailsSkeletonLayout />}>
        <AppErrorBoundary>
          <RiskOperation />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<ExecutiveDashboardLayoutSkeleton />}>
        <AppErrorBoundary>
          <ExecutiveDashboard />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/edit-vulnerability-data",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <VulnerabilityForm />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/in-progress-assessment",
    element: (
      <Suspense fallback={<AssessmentSkeleton />}>
        <AppErrorBoundary>
          <InProgressAssessment />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/completed-assessment",
    element: (
      <Suspense fallback={<AssessmentSkeleton />}>
        <AppErrorBoundary>
          <CompleteAssessment />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/sla-configuration",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <Severity />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/center-dashboard",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <ASMDashboard />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/attack-surface",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <AssessmentCenter />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/pending-vulnerability",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <PendingVulnerability />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/download-report",
    element: (
      <Suspense>
        <AppErrorBoundary>
          <DownloadReports />
        </AppErrorBoundary>
      </Suspense>
    ),
  },
];
