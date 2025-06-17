import { useAuthContext } from "@/context";
import { dateFormater } from "@/utils/dateFormate";
import { useState } from "react";

export default function UserDetailsForm() {
  const { authenticate, UpdateProfile } = useAuthContext();

  console.log(authenticate?.profile)
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState("");


  // Form state
  const [form, setForm] = useState({
    fname: authenticate?.fname,
    lname: authenticate?.lname,
    email: authenticate?.email,
    profile: authenticate?.profile
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const formData = new FormData;
    formData.append("fname", form.fname);
    formData.append("lname", form.lname);
    formData.append("email", form.email);
    formData.append("profile", form.profile);
    UpdateProfile(formData, authenticate._id);
    setIsEditing(false)
  };


  const imagePreview = (file) => {
    setForm({ ...form, profile: file })
    const preview = URL.createObjectURL(file);
    setPreview(preview)
  }



  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-white">User Details</h1>
          {!isEditing && <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-800 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            Edit
          </button>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <label id="profile" className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden object-cover  border-2 border-slate-600" >
                    {form.profile ? (
                      <img src={preview || authenticate?.profile || '/default-profile.png'} />
                    ) : <span className="text-2xl text-white"  >+</span>}
                    <input type="file" hidden id="profile" name="profile"
                      onChange={(e) => imagePreview(e.target.files[0])}
                      disabled={!isEditing} />
                  </label>

                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-slate-800"></div>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-sm mb-1">{form.profile ? form.profile.name : "Profile Image"}</p>
                  <p className="text-slate-400 text-xs mb-1">jpeg, jpg, png</p>
                  <p className="text-slate-500 text-xs">Size less than 2MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fname"
                    value={form.fname}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lname"
                    value={form.lname}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Tenant */}
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">Tenant</label>
                  <input
                    type="text"
                    value={authenticate.tenant}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    disabled
                  />
                </div>

                {/* Idle Timeout */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-white text-sm font-medium">Role</label>
                  <input
                    type="text"
                    value={authenticate?.role || "admin"}
                    disabled
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-700">
                <button onClick={() => setIsEditing(!isEditing)} className="px-6 py-2 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg transition-colors duration-200">
                  Cancel
                </button>
                <button type="button" onClick={handleSave} className="px-6 py-2 bg-blue-800 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200">
                  Save Changes
                </button>
              </div>}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-medium text-white mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-slate-400 text-sm">Account Status</p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${authenticate.email_verification ? "bg-green-400" : "bg-red-400"} rounded-full`}></div>
                <span className="text-white text-sm">{authenticate.email_verification ? "Verified" : "Not verified"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-slate-400 text-sm">Member Since</p>
              <p className="text-white text-sm">{dateFormater(authenticate.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
