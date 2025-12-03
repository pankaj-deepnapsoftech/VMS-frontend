/* eslint-disable react/prop-types */
import { updateVulnerablityData } from '@/services/Vulnerable.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RxCross2 } from '@/constants/Icons'
import { useState } from 'react'
import {GetTenantDataServices} from "@/services/Auth.service"
import { useAuthStore } from '@/store/AuthStore'

const AssignUserModal = ({ setAssignUserOpenModal, selectedDataId }) => {
    const queryClient = useQueryClient();
    const { tenant, token } = useAuthStore()

    const { mutate: UpdateData, isPending: isUpdateDataLoading } = useMutation({
        mutationFn: ({ id, data }) => updateVulnerablityData({ id, data }),
        onSuccess: async () => {
            Promise.all([
                await queryClient.invalidateQueries({ queryKey: ["All-vulnerablities-data"] }),
                await queryClient.invalidateQueries({ queryKey: ["All-application-vurnablity"] }),
                await queryClient.invalidateQueries({ queryKey: ["All-Infrastructure-vulnerabilities"] }),
            ])
        }
    });

     const {data:GetTenantData} = useQuery({
      queryKey: ["tenant-users", tenant],
      queryFn: () => GetTenantDataServices(tenant),
      enabled: !!tenant && !!token,
    });

    const [selectedUserId, setSelectedUserId] = useState('')


    function handleSubmit() {
        if (selectedUserId) {
            UpdateData({id:selectedDataId?._id,data:{ assign: selectedUserId }, })
            setAssignUserOpenModal(false)
        } else {
            alert('Please select a user.')
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-[#1a1f2e] rounded-xl w-full max-w-xl shadow-xl overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                    <h2 id="modal-title" className="text-xl font-semibold text-white">
                        Assign User
                    </h2>
                    <button
                        onClick={() => setAssignUserOpenModal(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        <RxCross2 size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <label htmlFor="user-select" className="block mb-2 text-sm font-medium text-gray-300">
                        Select a user:
                    </label>
                    <select
                        id="user-select"
                        value={selectedUserId || selectedDataId?.assign
                        }
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select a user --</option>
                        {GetTenantData?.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.fname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex w-full justify-center px-8 mb-5'>
                    <button
                        disabled={isUpdateDataLoading}
                        onClick={handleSubmit}
                        className="bg-sky-700 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded shadow"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AssignUserModal
