import { useState } from "react";
import { Stack, TextField, DatePicker, SpinButton } from "@fluentui/react";

const TaskForm = () => {
  const [leftColumnComponents, setLeftColumnComponents] = useState([]);
  const [rightColumnComponents, setRightColumnComponents] = useState([]);

  const handleDrop = (e, column) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType) {
      const newComponent = { id: Math.random(), type: componentType };
      if (column === "column-left") {
        setLeftColumnComponents([...leftColumnComponents, newComponent]);
      } else if (column === "column-right") {
        setRightColumnComponents([...rightColumnComponents, newComponent]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveComponent = (id, column) => {
    if (column === "column-left") {
      setLeftColumnComponents(
        leftColumnComponents.filter((component) => component.id !== id)
      );
    } else if (column === "column-right") {
      setRightColumnComponents(
        rightColumnComponents.filter((component) => component.id !== id)
      );
    }
  };

  const renderFormComponents = (components, column) => {
    return components.map((component) => {
      let componentElement;
      switch (component.type) {
        case "TextField":
          componentElement = <TextField placeholder="Enter text" />;
          break;
        case "DatePicker":
          componentElement = <DatePicker />;
          break;
        case "SpinButton":
          componentElement = <SpinButton min={0} max={100} />;
          break;
        default:
          return null;
      }

      return (
        <div key={component.id} className="form-component">
          {componentElement}
          <button onClick={() => handleRemoveComponent(component.id, column)}>
            Remove
          </button>
        </div>
      );
    });
  };

  return (
    <Stack horizontal>
      <Stack
        className="component-list"
        onDrop={(e) => handleDrop(e, "column-left")}
        onDragOver={handleDragOver}
        tokens={{ childrenGap: 8 }}
      >
        <h2>Drag components here:</h2>
        <div
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("componentType", "TextField")
          }
        >
          TextField
        </div>
        <div
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("componentType", "DatePicker")
          }
        >
          DatePicker
        </div>
        <div
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("componentType", "SpinButton")
          }
        >
          SpinButton
        </div>
      </Stack>
      <div className="form-area">
        <Stack
          className="form-builder"
          onDrop={(e) => handleDrop(e, "column-left")}
          onDragOver={handleDragOver}
          tokens={{ childrenGap: 8 }}
        >
          <h2>Form Builder (Column Left):</h2>
          {renderFormComponents(leftColumnComponents, "column-left")}
        </Stack>
        <Stack
          className="form-builder"
          onDrop={(e) => handleDrop(e, "column-right")}
          onDragOver={handleDragOver}
          tokens={{ childrenGap: 8 }}
        >
          <h2>Form Builder (Column Right):</h2>
          {renderFormComponents(rightColumnComponents, "column-right")}
        </Stack>
      </div>
    </Stack>
  );
};

export default TaskForm;
