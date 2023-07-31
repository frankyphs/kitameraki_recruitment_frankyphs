import { useState } from "react";
import { Stack, TextField, DatePicker, SpinButton } from "@fluentui/react";

const TaskForm = () => {
  const [formComponents, setFormComponents] = useState([]);

  const handleDrop = (e, id) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType && !formComponents.includes(id)) {
      setFormComponents([...formComponents, { id, type: componentType }]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveComponent = (id) => {
    setFormComponents(
      formComponents.filter((component) => component.id !== id)
    );
  };

  const renderFormComponents = () => {
    return formComponents.map((component) => {
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
          <button onClick={() => handleRemoveComponent(component.id)}>
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
      <Stack
        className="form-builder"
        onDrop={(e) => handleDrop(e, "column-right")}
        onDragOver={handleDragOver}
        tokens={{ childrenGap: 8 }}
      >
        <h2>Form Builder:</h2>
        {renderFormComponents()}
      </Stack>
    </Stack>
  );
};

export default TaskForm;
