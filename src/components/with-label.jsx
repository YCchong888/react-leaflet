import React from 'react';
import ReactDOM from 'react-dom';
import { LabelsPortalContext } from './labels-overlay';
import { NameLabel } from './lable-test';

export const withLabel = (
  Component
) =>({
  labelText,
  labelSourceX,
  labelSourceY,
  hideLabel = false,
  ...componentProps
})=> {
  const labelsPortal = React.useContext(LabelsPortalContext);
  return (
    <g>
      <Component {...(componentProps)}/>
      {!hideLabel && 
       labelsPortal && ReactDOM.createPortal(
          <NameLabel  text={labelText} sourceX={labelSourceX} sourceY={labelSourceY}/>,
          labelsPortal
        )
      }
    </g>
  );
};
