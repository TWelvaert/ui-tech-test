
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import useMode from "./useMode";

export default function ModeSwitch() {
  const [mode, toggleMode] = useMode();
  const enabled = mode === "edit";

  const handleToggle = () => {
    // Call the toggle function provided by the hook
    toggleMode();
  };

  return (
    <div className="flex items-center gap-x-2">
      <label htmlFor="mode" className="text-lg font-medium text-gray-700">
        {enabled ? "Edit" : "Preview"} Mode
      </label>
      <Switch
        id="mode"
        checked={enabled}
        onChange={handleToggle}
        className={classNames(
          enabled ? "bg-blue-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </div>
  );
}
