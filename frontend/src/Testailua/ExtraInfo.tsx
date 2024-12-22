import React, { useState } from 'react';

// First we need to add a type to let us extend the incoming component.
type ExtraInfoType = {
  extraInfo: string;
};

// Mark the function as a generic using P (or whatever variable you want)
export const withExtraInfo = <P extends ExtraInfoType>(
  
  WrappedComponent: React.ComponentType<P & ExtraInfoType>
) => {
  const ComponentWithExtraInfo: React.FC<P> = (props) => {
    const [extraInfo, setExtraInfo] = useState('');

    // Update the state with the desired value
    React.useEffect(() => {
      setExtraInfo('important data.');
    }, []);

    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} extraInfo={extraInfo} />;
  };

  return ComponentWithExtraInfo;
};