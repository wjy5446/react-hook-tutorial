import React, { useState } from "react";

// useInput : input에 들어갈 값을 설정한다. validator을 통해서 입력될 값을 확인할 수 있다.
export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

//useTab
export const useTab = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);

  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

//useTitle
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);

  return setTitle;
};
