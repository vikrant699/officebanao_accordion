/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { useState, useEffect } from "react";

const data = [
  {
    key: "Product",
    name: "Product",
    items: [
      {
        key: "Apple",
        name: "Apple",
        items: [
          {
            key: "Orange",
            name: "Orange",
          },
          {
            key: "Banana",
            name: "Banana",
          },
        ],
      },
      {
        key: "Samsung",
        name: "Samsung",
        items: [
          {
            key: "Orange",
            name: "Orange",
          },
          {
            key: "Banana",
            name: "Banana",
          },
        ],
      },
    ],
  },
];

const AccordionItemWithCheckbox = ({ item }) => {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(item.isChecked);
  }, [item.isChecked]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    updateNestedItems(item, newCheckedState);
  };

  const updateNestedItems = (currentItem, newValue) => {
    if (currentItem.items) {
      currentItem.items.forEach((nestedItem) => {
        nestedItem.isChecked = newValue;
        updateNestedItems(nestedItem, newValue);
      });
    }
  };

  return (
    <AccordionItem key={item.key}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <AccordionHeader>
          <h3 className={`accordion-title`}>{item.name}</h3>
        </AccordionHeader>
      </label>
      {item.items && (
        <AccordionBody>
          {item.items.map((nestedItem) => (
            <AccordionItemWithCheckbox key={nestedItem.key} item={nestedItem} />
          ))}
        </AccordionBody>
      )}
    </AccordionItem>
  );
};

const App = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Accordion>
        {data.map((item) => (
          <AccordionItemWithCheckbox key={item.key} item={item} />
        ))}
      </Accordion>
    </div>
  );
};

export default App;
