import { useReducer, useEffect } from "react";

type Mode = "preview" | "edit";

function getInitialModeFromURL(): Mode {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  return mode === "edit" ? "edit" : "preview";
}

function updateURL(mode: Mode) {
  const params = new URLSearchParams(window.location.search);
  params.set("mode", mode);
  const newURL = `${window.location.pathname}?${params}`;
  window.history.replaceState({}, "", newURL);
}

function useMode() {
  const [mode, dispatch] = useReducer(
    (state: Mode, action: Mode) => action,
    getInitialModeFromURL()
  );

  useEffect(() => {
    updateURL(mode);
  }, [mode]);

  const toggleMode = () => {
    dispatch(mode === "edit" ? "preview" : "edit");
  };

  return [mode, toggleMode];
}

export default useMode;