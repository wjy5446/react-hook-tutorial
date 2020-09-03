import React, { useState, useEffect, useRef } from "react";

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
export const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);

  return setTitle;
};

//useClick
export const useClick = (onClick) => {
  const element = useRef();

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);

      return () => element.current.removeEventListener("click", onClick);
    }
  }, []);

  return element;
};

// useConfirm
export const useConfirm = (message, onConfirm, onCancel) => {
  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm;
    } else {
      onCancel;
    }
  };

  return confirmAction;
};

// usePreventLeave
export const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);

  return { enablePrevent, disablePrevent };
};

// useBeforeLeave
const useBeforeLeave = (onBefore) => {
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);

  if (typeof onBefore !== "function") {
    return;
  }

  const handle = () => {
    onBefore();
  };
};

// useFaceIn
const useFaceIn = (duration, delay = 0) => {
  const element = useRef();

  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);

  return { ref: element, style: { opacity: 0 } };
};

// useNetwork
const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);

  const handleChange = () => {
    onChange(navigator.onLine);
    setStatus(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);

    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  });

  return status;
};

//useScroll
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  const onScroll = (event) => {
    setState({ y: window.scrollY, x: window.scrollX });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return state;
};

// useFullscreen
const useFullscreen = (callback) => {
  const element = useRef();

  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
      callback(true);
    }
  };

  const exitFull = () => {
    document.exitFullscreen();
    callback(false);
  };
  return { element, triggerFull, exitFull };
};

// useNotification
const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }

  const fireNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    }
  };

  return fireNotification;
};

// useAxios
const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const [trigger, setTrigger] = useState("");

  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    console.log(state);
    setTrigger(Date.now());
  };

  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  return { ...state, refetch };
};
