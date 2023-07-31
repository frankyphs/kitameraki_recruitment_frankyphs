import { Icon } from "@fluentui/react";

const DragHandle = (props) => {
  return (
    <div
      style={{
        display: "inline-block",
        marginRight: "8px",
        cursor: "grab",
      }}
      {...props}
    >
      <Icon iconName="GripperBarHorizontal" />
    </div>
  );
};

export default DragHandle;
