/* eslint-disable react/prop-types */
import { useAuthContext} from "@/context";
import { GetExceptionData, updateExceptionData } from "@/services/exception.service";
import { Checkhariqui } from "@/utils/checkHarirqui";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { FaTimesCircle, FaBell } from "react-icons/fa";

export function NotificationSidebar({
  notifications,
  isOpen,
  onClose,
  notificationsViewed,
  setRejectionReasion,
  setNotificationData,
}) {
 const queryClient = useQueryClient();
  const { token, tenant,authenticate } = useAuthContext();
  const [page,setPage] = useState(1);

  // ---------------- here am using tenstack query ---------------------

  const {data:expectionData} = useQuery({
    queryKey:["Exception",{page,tenant}],
    queryFn:()=>GetExceptionData({page,tenant}),
    enabled: !!token,
    placeholderData:keepPreviousData,
  })

  const {mutate:UpdateExpectionData,isPending:isUpdateExpectionDataLoading} = useMutation({
    mutationFn:({id,data})=>updateExceptionData({id,data}),
    onSuccess:async () => {
      await queryClient.invalidateQueries({queryKey:['Exception']})
    }
  })

  let notificationcount =
    notifications?.filter((notification) => !notification.view).length || 0;

  const sidebarRef = useRef(null);

  const HandleUpdateExpection = (data) => {
    const filterExpectionData = expectionData.find(
      (item) => item._id === data.expection_id
    );
    if (!filterExpectionData) return;

    let UpdatedData = null;
    let key = "";

    if (filterExpectionData?.aprove_1?.approver === data.reciver_id) {
      UpdatedData = filterExpectionData?.aprove_1;
      key = "aprove_1";
    } else if (filterExpectionData?.aprove_2?.approver === data.reciver_id) {
      UpdatedData = filterExpectionData?.aprove_2;
      key = "aprove_2";
    } else if (filterExpectionData?.aprove_3?.approver === data.reciver_id) {
      UpdatedData = filterExpectionData?.aprove_3;
      key = "aprove_3";
    }

    if (key) {
      UpdateExpectionData({id:data.expection_id, data:{
        [key]: {
          ...UpdatedData,
          aproved: true,
          status: "Approved",
          description: null,
        },
      }});
      notificationsViewed(data?._id);
    }
  };

  const HandleRejectExpection = (data) => {
    const filterExpectionData = expectionData.find(
      (item) => item._id === data.expection_id
    );
    if (!filterExpectionData) return;

    let UpdatedData = null;
    let key = "";

    if (filterExpectionData?.aprove_1?.approver === data.reciver_id) {
      UpdatedData = filterExpectionData?.aprove_1;
      key = "aprove_1";
    } else if (filterExpectionData?.aprove_2?.approver === data.reciver_id) {
      UpdatedData = filterExpectionData?.aprove_2;
      key = "aprove_2";
    } else if (filterExpectionData?.aprove_3?.approver === data.reciver_id) {
      UpdatedData = filterExpectionData?.aprove_3;
      key = "aprove_3";
    }

    if (key) {
      setNotificationData({
        id: data.expection_id,
        nid: data._id,
        data: { [key]: { ...UpdatedData, aproved: false, status: "Rejected" } },
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);


  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 h-full w-80 bg-[#1f2937] backdrop-blur-xl border-l border-white/20 shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex justify-between items-center bg-white/10 backdrop-blur-xl">
        <FaBell className="w-6 h-6 text-white" />
        <h2 className="text-lg font-semibold text-white">
          Notifications {notificationcount < 1 ? "" : `(${notificationcount})`}
        </h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-400 transition"
        >
          <FaTimesCircle size={22} />
        </button>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
        {notifications?.length > 0 ? (
          notifications.map((notification, index) => {
            const isViewed = notification?.view;
            return (
              <div
                key={index}
                className="bg-slate-800 backdrop-blur-xl border border-gray-700 p-4 rounded-2xl shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 text-gray-100"
              >
                <div
                  onClick={() => !notification.options &&  notificationsViewed(notification?._id)}
                  className="flex items-center gap-3"
                >
                  <div>
                    <h2 className="font-semibold text-sm">{notification?.title}</h2>
                  </div>

                  {!isViewed ? (
                    <span className="ml-auto text-xs font-medium text-red-400 rounded-full px-2 py-0.5 bg-white/20 backdrop-blur-sm">
                      New
                    </span>
                  ) : (
                    <span className="ml-auto text-xs font-medium text-blue-300 rounded-full px-2 py-0.5 bg-white/20 backdrop-blur-sm">
                      Viewed
                    </span>
                  )}
                </div>


                {notification?.options && Checkhariqui(expectionData.filter((item)=>item._id === notification.expection_id)[0] || null,authenticate) && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                    disabled={isUpdateExpectionDataLoading}
                      onClick={() => HandleUpdateExpection(notification)}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md hover:opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setRejectionReasion(true);
                        HandleRejectExpection(notification);
                      }}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md hover:opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">No new notifications</p>
        )}
      </div>
    </div>
  );
}
