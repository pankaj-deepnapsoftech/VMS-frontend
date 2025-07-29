import { createPortal } from "react-dom";

// eslint-disable-next-line react/prop-types
 export const PopupMenu = ({ position, children, onClose }) => {
  if (!position) return null;

  const style = {
    position: "absolute",
    // eslint-disable-next-line react/prop-types
    top: position.top,
    // eslint-disable-next-line react/prop-types
    left: position.left,
    background: "#1E293B",
    border: "1px solid #374151",
    borderRadius: "8px",
    width: "180px",
    zIndex: 999999,
  };

  return createPortal(
    <div style={style} className="shadow-lg">
      <ul
        className="text-gray-300"
        onMouseLeave={onClose}
      >
        {children}
      </ul>
    </div>,
    document.body
  );
};