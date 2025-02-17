import ClientDashboard from "@/pages/ClientDashboard";
import SchedulingAssessmentPage from "@/pages/SchedulingAssessment";


export const ClientSmeRoutes = [
    {
        path: "/",
        element: <ClientDashboard />
    },
    {
        path: "/scheduling-assesment",
        element: <SchedulingAssessmentPage />
    },
]