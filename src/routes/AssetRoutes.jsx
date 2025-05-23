import SoftwareAndApplication from "@/pages/assert/SoftwareAndApplication"
import { AssertInventory } from "@/pages/AssertInventory"
import DataTable from "@/pages/DataTable"
import Devices from "@/pages/DevicesTable"
import RiskRatingTable from "@/pages/RiskRatingTable"
import { Route, Routes } from "react-router-dom"


const AssetRoutes = () => {
  return (
    <Routes>
        <Route element={<AssertInventory/>}>
        <Route path="/" element={<Devices/>} />
        <Route path="/software-application" element={<SoftwareAndApplication/>} />
        <Route path="/data-table" element={<DataTable />} />
        <Route path="/risk-rating-table" element={<RiskRatingTable />} />
        </Route>
    </Routes>
  )
}

export default AssetRoutes