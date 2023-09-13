import { useState } from "react";
import "./Dropdown.css";
import {
  FaCaretDown,
  FaCaretUp,
  FaRegSquare,
  FaRegCheckSquare,
  FaTimes,
} from "react-icons/fa";

type DropdownOption = {
  id: string;
  label?: string;
};

type DropdownProps = {
  placeholder?: string;
  options: Array<DropdownOption>;
  isMulti?: Boolean;
};

function Dropdown({ placeholder, options, isMulti = false }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selections, setSelections] = useState<Array<DropdownOption>>([]);

  const handleDropdownClick = () => {
    setOpen(!open);
  };

  const addSelection = (option: DropdownOption) => {
    if (isMulti) {
      setSelections((prev) => [...prev, option]);
    } else {
      setSelections([option]);
      handleDropdownClick(); // close the dropdown when selection is made
    }
  };

  const removeSelection = (option: DropdownOption) => {
    if (isMulti) {
      setSelections((prev) => [...prev.filter((cur) => cur.id !== option.id)]);
    } else {
      setSelections([]);
    }
  };

  const addAll = () => setSelections(options);

  const removeAll = () => setSelections([]);

  const handleDropdownOptionClick = (option: DropdownOption) => {
    const isSelected = selections.includes(option);
    if (isSelected) {
      removeSelection(option);
    } else {
      addSelection(option);
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown-button" onClick={handleDropdownClick}>
        {/* if there are any user selections, display user's selections at the top */}
        <div className="dropdown-selection-list">
          {selections.length > 0 ? (
            selections.map((option) => (
              <button
                className="dropdown-selection-list-item"
                key={option.id}
                onClick={(e) => {
                  removeSelection(option);
                  e.stopPropagation();
                }}
              >
                {option.label ?? option.id}
                <div className="dropdown-selection-list-item-close icon">
                  <FaTimes />
                </div>
              </button>
            ))
          ) : (
            <div className="dropdown-selection-placeholder">
              {placeholder ?? "Select"}
            </div>
          )}
        </div>

        {/*  caret icon */}
        <div className="dropdown-button-caret icon">
          {open ? <FaCaretDown /> : <FaCaretUp />}
        </div>
      </div>

      {/* if dropdown is open, display options */}
      {open && (
        <div className="dropdown-list">
          {/* select or deselect all */}
          {isMulti &&
            (selections.length === 0 ? (
              <button className="dropdown-list-item" onClick={addAll}>
                <div className="dropdown-list-item-icon icon">
                  <FaRegSquare />
                </div>
                <em> Select All</em>
              </button>
            ) : (
              <button className="dropdown-list-item" onClick={removeAll}>
                <div className="dropdown-list-item-icon icon">
                  <FaRegCheckSquare />
                </div>
                <em> Deselect All</em>
              </button>
            ))}
          {/* display options  */}
          {options.map((option) => (
            <button
              className="dropdown-list-item"
              onClick={() => handleDropdownOptionClick(option)}
            >
              {isMulti && (
                <div className="dropdown-list-item-icon icon">
                  {selections.includes(option) ? (
                    <FaRegCheckSquare />
                  ) : (
                    <FaRegSquare />
                  )}
                </div>
              )}
              {option.label ?? option.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
