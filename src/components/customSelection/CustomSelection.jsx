import { useTagsContext } from '@/context';
import { useEffect, useRef, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

// eslint-disable-next-line react/prop-types
const CustomSelection = ({ setFieldvalue, isError, error, handleBlur, alreadySelected }) => {
  const { AllTags } = useTagsContext();
  const [selected, setSelected] = useState([]);
  const [alltages, setAllTages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const addTag = (tag) => {
    if (!selected.some((t) => t._id === tag._id)) {
      const newSelected = [...selected, tag];
      setSelected(newSelected);
      const data = newSelected.map((item) => item._id);
      setFieldvalue('tages', data);
    }
  };

  const removeTag = (tag) => {
    const newSelected = selected.filter((t) => t._id !== tag._id);
    setSelected(newSelected);
    const data = newSelected.map((item) => item._id);
    setFieldvalue('tages', data);
  };

  const filteredTags = alltages.filter((tag) =>
    tag.tag_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (AllTags) {
      setAllTages(AllTags.filter((item) => !selected.some((sel) => sel._id === item._id)));
    }
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
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} onBlur={handleBlur} className="relative w-full text-white">
      <label htmlFor="multiselect" className="block mb-1">
        Tags
      </label>

      <div
        onClick={() => setShowOptions(!showOptions)}
        className="border border-gray-500 rounded px-3 py-2 bg-input cursor-pointer"
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selected.map((tag) => (
              <span
                key={tag._id}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                style={{ backgroundColor: tag.tag_color }}
                className="px-4 py-2 text-sm cursor-pointer rounded-full gap-1 flex items-center justify-between"
              >
                {tag.tag_name} <IoMdCloseCircleOutline className="h-4 w-4 font-bold" />
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-300">--Select Tags--</span>
        )}
      </div>

      {isError && <p className="text-red-400">{error}</p>}

      {showOptions && (
        <div className="absolute z-10 w-full bg-input border border-gray-500 rounded mt-1 max-h-60 overflow-y-auto p-2">
          <input
            type="text"
            placeholder="Search tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-2 px-2 py-1 rounded text-black"
          />

          {filteredTags.length > 0 ? (
            filteredTags.map((item) => (
              <div
                key={item._id}
                onClick={() => addTag(item)}
                className="px-3 py-1 hover:bg-gray-700 cursor-pointer rounded"
              >
                {item.tag_name}
              </div>
            ))
          ) : (
            <div className="px-3 py-1 text-gray-300">No tags found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelection;
