/* eslint-disable react/prop-types */
import { AllowedPaths } from '@/constants/static.data';
import { LucideShield } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const RoleTable = ({ setFieldValue, defaultValue }) => {
  const [access, setAccess] = useState([]);

  // ✅ Initialize access from defaultValue only once
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setAccess(defaultValue);
    }
  }, [defaultValue]);

  // ✅ Sync access with Formik field value
  useEffect(() => {
    setFieldValue('allowed_path', access);
  }, [access, setFieldValue]);

  const togglePermission = (module, perm) => {
    setAccess((prevAccess) => {
      const existing = prevAccess.find((item) => item.name === module.name);
      if (existing) {
        const hasPermission = existing.permission.includes(perm);
        const updatedPermissions = hasPermission
          ? existing.permission.filter((p) => p !== perm)
          : [...existing.permission, perm];

        if (updatedPermissions.length === 0) {
          return prevAccess.filter((item) => item.name !== module.name);
        }

        return prevAccess.map((item) =>
          item.name === module.name
            ? { ...item, permission: updatedPermissions }
            : item
        );
      } else {
        return [...prevAccess, { ...module, permission: [perm] }];
      }
    });
  };

  const hasPermission = (moduleName, perm) => {
    const found = access.find((item) => item.name === moduleName);
    return found?.permission.includes(perm);
  };

  return (
    <table className="w-full text-left text-sm text-gray-300">
      <thead className="text-xs uppercase text-gray-400 border-b border-[#293550] h-16">
        <tr>
          <th className="px-4 py-3 flex w-full h-16 gap-1 items-center justify-start">
            <LucideShield className="h-4" /> Module
          </th>
          {['View', 'Create', 'Modify', 'Delete'].map((perm) => (
            <th key={perm} className="px-4 py-3">{perm}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {AllowedPaths.map((module, index) => (
          <tr key={index} className="border-b border-gray-800 hover:bg-[#1a223f]">
            <td className="flex items-center gap-2 px-4 py-3">
              <div className="w-4 h-4 bg-gray-500 rounded" />
              {module.name}
            </td>
            {['view', 'create', 'modify', 'delete'].map((perm) => (
              <td key={perm} className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={hasPermission(module.name, perm)}
                  onChange={() => togglePermission(module, perm)}
                  className="form-checkbox h-4 w-4 text-blue-500 bg-transparent border-gray-500"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleTable;
