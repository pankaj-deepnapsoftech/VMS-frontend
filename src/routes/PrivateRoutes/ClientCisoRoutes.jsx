import ClientDashboard from "@/pages/ClientDashboard";
import SchedulingAssessmentPage from "@/pages/SchedulingAssessment";


export const ClientCisoRoutes = [
    {
        path: "/",
        element: <ClientDashboard />
    },
    {
        path: "/scheduled-tasks",
        element: <SchedulingAssessmentPage />
    },
]