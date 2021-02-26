import React, { useState } from "react";
import { useSelector } from "react-redux";
import JobInput from "../JobInput/JobInput";
import PanelInput from "../PanelInput/PanelInput";
import WallInput from "../WallInput/WallInput";
import WallPanelInput from "../WallPanelInput/WallPanelInput";
import DisplayOneJob from "../DisplayOneJob/DisplayOneJob";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function InputPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  return (
    <div>
      <JobInput />
      <DisplayOneJob />
      <WallInput />
      {/* <PanelInput /> */}
      <WallPanelInput />
    </div>
  );
}

export default InputPage;
