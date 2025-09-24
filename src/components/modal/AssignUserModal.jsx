/* eslint-disable react/prop-types */
import { AxiosHandler } from '@/config/AxiosConfig'
import { useAuthContext, useDataContext, useVulnerabililtyDataContext } from '@/context'
import axios from 'axios'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AssignUserModal = ({ setAssignUserOpenModal, tenantId, selectedDataId }) => {
    const { GetUserDataByTenant, tenantData } = useAuthContext()
    const { UpdatedOneData } = useDataContext()
    const { GetInfrastructureData } = useVulnerabililtyDataContext();

    const [selectedUserId, setSelectedUserId] = useState('') 

    useEffect(() => {
        GetUserDataByTenant(tenantId)
    }, [])

    const handleSubmit = () => {
        if (selectedUserId) {
            UpdatedOneData(selectedUserId, selectedDataId?._id)   
            setAssignUserOpenModal(false)
            GetInfrastructureData()
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
                        <X size={20} />
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
                        {tenantData.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.fname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex w-full justify-center px-8 mb-5'>
                    <button
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
