import EmployeeDashboard from "@/pages/EmployeDashboard";
import { EmployeeAllTasks } from "@/pages/EmployeeAllTasks";

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EmployeeDashboard />
    },
    {
        path: "/all-employee-tasks",
        element: <EmployeeAllTasks />
    },
]