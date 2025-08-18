import { ResourceType } from '@shared/types/types';
import React, { FC } from 'react';

type ResourceProps = ResourceType & {

}

const Resource : FC<ResourceProps> = ({ amount = 0, resource, ...props}: ResourceProps) => {
  return (
    <div style={{ backgroundImage: props.style?.imgUrls ? `url(${props.style.imgUrls[0]})` : 'none', backgroundColor: props.style?.fill, width: props.style?.width, height: props.style?.height}}>{amount}</div>
  );
};

export default Resource;