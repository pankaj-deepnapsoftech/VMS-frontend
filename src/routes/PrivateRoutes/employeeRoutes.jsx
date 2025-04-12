import ChatPage from "@/pages/ChatPage";
import EmployeeDashboard from "@/pages/EmployeDashboard";
import { EmployeeAllTasks } from "@/pages/EmployeeAllTasks";
import Reports from "@/pages/Reports";

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EmployeeDashboard />
    },
    {
        path: "/employee-tasks",
        element: <EmployeeAllTasks />
    },
    {
        path: "/reports",
        element: <Reports />
    },
    {
        path: "/chat/:chatId",
        element: <ChatPage />
    },
]