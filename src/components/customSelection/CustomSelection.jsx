//import { useTagsContext } from '@/context';
import { getTags } from "@/services/ManageTags.service";
import { useAuthStore } from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const CustomSelection = ({setFieldvalue,isError,error,handleBlur,alreadySelected}) => {
  
  const { tenant } = useAuthStore();

  //=====================TANSTACK QUERY================

  const fetchAllTags = async () => {
  let page = 1;
  let all = [];
  let hasMore = true;

  while (hasMore) {
    const res = await getTags({ page, tenant });

    if (res.length === 0) {
      hasMore = false;
    } else {
      all = [...all, ...res];
      page++;
    }
  }

  return all;
};

const { data: AllTags } = useQuery({
  queryKey: ["tags", tenant],
  queryFn: fetchAllTags,
  enabled: !!tenant,
});


  const [selected, setSelected] = useState([]);
  const [alltages, setAllTages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const addTag = (tag) => {
    if (!selected.some((t) => t._id === tag._id)) {
      const newSelected = [...selected, tag];
      setSelected(newSelected);
      const data = newSelected.map((item) => item._id);
      setFieldvalue("service_role", data);
    }
  };

  const removeTag = (tag) => {
    const newSelected = selected.filter((t) => t._id !== tag._id);
    setSelected(newSelected);
    const data = newSelected.map((item) => item._id);
    setFieldvalue("service_role", data);
  };

  const filteredTags = alltages?.filter((tag) =>
    tag.tag_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!AllTags) return;
    const filtered = AllTags.filter((item) => item.related === "Service Role");
    const withoutSelected = filtered.filter(
      (item) => !selected.some((sel) => sel._id === item._id)
    );
    setAllTages(withoutSelected);
  }, [AllTags, selected]);

  useEffect(() => {
    if (alreadySelected) {
      setSelected(alreadySelected);
    }
  }, [alreadySelected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      onBlur={handleBlur}
      className="relative w-full text-white"
    >
      <label
        htmlFor="multiselect"
        className="block mb-1 font-medium text-gray-200"
      >
        Service Role
      </label>

      {/* Selected Box */}
      <div
        onClick={() => setShowOptions(!showOptions)}
        className="border border-gray-600 rounded-lg px-3 py-2 bg-input cursor-pointer flex items-center justify-between hover:border-gray-400 transition"
      >
        <div className="flex flex-wrap gap-2">
          {selected.length > 0 ? (
            selected.map((tag) => (
              <span
                key={tag._id}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                style={{ backgroundColor: tag.tag_color }}
                className="px-3 py-1 text-sm rounded-full flex items-center gap-1 shadow-md hover:opacity-80 transition"
              >
                {tag.tag_name}
                <IoMdCloseCircleOutline className="h-4 w-4" />
              </span>
            ))
          ) : (
            <span className="text-gray-400">-- Select Tags --</span>
          )}
        </div>

        <span className="text-gray-300 text-sm">{showOptions ? "▲" : "▼"}</span>
      </div>

      {isError && <p className="text-red-400 mt-1">{error}</p>}

      {/* Dropdown */}
      {showOptions && (
        <div className="z-20 w-full bg-input border border-gray-600 rounded-xl mt-2 shadow-xl max-h-64 overflow-y-auto animate-fadeIn">
          {/* Search */}
          <div className="p-2 sticky top-0 bg-input border-b border-gray-700">
            <input
              type="text"
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-200 text-black text-sm outline-none"
            />
          </div>

          {/* List Items */}
          <div className="py-2">
            {filteredTags?.length > 0 ? (
              filteredTags.map((item) => (
                <div
                  key={item._id}
                  onClick={() => addTag(item)}
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-700 transition flex items-center justify-between"
                >
                  <span>{item.tag_name}</span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.tag_color }}
                  ></span>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">
                No roles found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelection;
