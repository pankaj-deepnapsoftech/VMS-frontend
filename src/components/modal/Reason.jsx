/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export function ReasonModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 text-white rounded-2xl shadow-2xl w-[90%] sm:w-[450px] p-6 border border-white/10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            {/* Header */}
            <h2 className="text-xl font-semibold mb-4 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Provide a Reason
            </h2>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const reason = e.target.reason.value.trim();
                if (!reason) return;
                onSubmit(reason);
                onClose();
              }}
              className="space-y-4"
            >
              {/* Reason Textarea */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Reason / Description
                </label>
                <textarea
                  name="reason"
                  placeholder="Write your reason..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-700 hover:opacity-90 transition-all shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
