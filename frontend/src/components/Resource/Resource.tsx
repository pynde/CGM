import { ResourceType } from '@shared/types/types';
import React, { FC } from 'react';

type ResourceProps = ResourceType & {

}

const Resource : FC<ResourceProps> = ({ amount = 0, resource, ...props}: ResourceProps) => {
  return (
    <>
    { props.style?.imgUrls ? <div style={{backgroundImage: 'url('+props.style.imgUrls[0]+')'}} className={"flex w-full h-full justify-center items-center bg-stone-900/25"}>{amount}</div> : <></>}
    </>
    
  );
};

export default Resource;