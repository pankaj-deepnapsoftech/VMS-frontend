import { Suspense, useEffect } from "react";
import { useAuthContext, useVulnerabililtyDataContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { Eye, Pencil, Trash2, User } from "lucide-react";

export function ApplicationData() {

  const {
    loading,
    GetApplicationData,
    allApplicationData
  } = useVulnerabililtyDataContext();

  const { token } = useAuthContext();


console.log("vghjfhjl;j,lk ",allApplicationData);


  useEffect(() => {
    if (token) {
      GetApplicationData()
    }
  }, [])





  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg overflow-x-auto text-white">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search Vulnerabilities ..."
              className="w-96 px-4 py-2 rounded-md bg-[#0F172A] text-white border border-[#334155] focus:outline-none"
            />
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1E293B] text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Application Name</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Vulnerability Classification</th>
                <th className="px-4 py-3">Scan Type</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Creator ID</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#0F172A] border-t border-slate-700">
             { allApplicationData.map((item,index)=><tr key={index} className="border-b border-slate-700 hover:bg-[#1E293B] transition">
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3">{item.creator?.company_name || '-'}</td>
                <td className="px-4 py-3">{item.BusinessApplication?.name || '-'}</td>
                <td className="px-4 py-3">{item.Title}</td>
                <td className="px-4 py-3">{item.threat_type}</td>
                <td className="px-4 py-3">{item.scan_type}</td>
                <td className="px-4 py-3">{item.Severity}</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3">{item.creator?._id || '-'}</td>
                <td className="px-4 py-3 flex items-center space-x-3">
                  <Pencil className="w-4 h-4 text-blue-400 cursor-pointer" />
                  <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                  <User className="w-4 h-4 text-green-500 cursor-pointer" />
                  <Eye className="w-4 h-4 text-lime-400 cursor-pointer" />
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      )}
    </Suspense>
  );
}
