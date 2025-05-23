import SoftwareAndApplication from "@/pages/assert/SoftwareAndApplication"
import { AssertInventory } from "@/pages/AssertInventory"
import { Route, Routes } from "react-router-dom"


const AssetRoutes = () => {
  return (
    <Routes>
        <Route element={<AssertInventory/>}>
        <Route path="/" element={<SoftwareAndApplication/>} />
        </Route>
    </Routes>
  )
}

export default AssetRoutes