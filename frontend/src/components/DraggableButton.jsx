import PropTypes from "prop-types";
import { Icon } from "@fluentui/react";

const DraggableButton = ({ type }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        padding: "8px",
        margin: "8px",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        textAlign: "center",
        cursor: "grab",
      }}
    >
      <Icon
        iconName={
          type === "textfield"
            ? "TextField"
            : type === "datepicker"
            ? "Calendar"
            : "Sort"
        }
      />
      <div>
        {type === "textfield"
          ? "TextField"
          : type === "datepicker"
          ? "DatePicker"
          : "SpinButton"}
      </div>
    </div>
  );
};

// Tambahkan PropTypes
DraggableButton.propTypes = {
  type: PropTypes.oneOf(["textfield", "datepicker", "spinbutton"]).isRequired,
};

export default DraggableButton;
