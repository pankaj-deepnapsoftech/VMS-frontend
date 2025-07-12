/* eslint-disable react/prop-types */
import { useDataContext } from '@/context';
import { useEffect, useState } from 'react';
import { AxiosHandler } from '@/config/AxiosConfig';
import toast from 'react-hot-toast';

const AccessPartner = ({ id, closeModal, preSet }) => {


  const { partners } = useDataContext();
  const [partnersData, setPartnersData] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState("");


  // Submit to backend
  const HandleSubmit = async () => {
    if (selectedPartners.length === 0) {
      alert("Please select at least one partner.");
      return;
    }

    try {
      const res = await AxiosHandler.put(`/tenant/update/${id}`, { Partner: selectedPartners });
      toast.success("Allowed access to partner");
      closeModal()

    } catch (error) {
      console.log(error)
      toast.error("Not Submited");
    }
  };

  // Populate dropdown data
  useEffect(() => {
    if (partners.length > 0) {
      const modifyData = partners.map((item) => ({
        value: item._id,
        name: item.company_name,
      }));
      setPartnersData(modifyData);
    }
  }, [partners]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-background text-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Assign to Partner</h2>
        <div className="mb-4">
          {/* <Multiselect
            options={partnersData}
            selectedValues={preSet ? preSet : selectedPartners}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            className="z-10"
          /> */}
          <select defaultValue={preSet} onChange={(e)=>setSelectedPartners(e.target.value)} className=' rounded-md bg-input w-full py-2 px-2 '>
            <option disabled selected >Select partner </option>
            {partnersData.map((item) =>
              <option key={item.value} value={item.value} >{item.name}</option>
            )}
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border text-white rounded-md" onClick={closeModal} >
            Close
          </button>
          <button
            className="px-4 py-2 bg-button text-white rounded-md"
            onClick={HandleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessPartner;
