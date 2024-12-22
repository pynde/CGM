import { Owner as OwnerType } from '@shared/types/types';
import React, { FC, ReactNode } from 'react';

interface OwnerProps extends OwnerType<unknown> {
  children?: ReactNode
}

export const Owner : FC<OwnerProps> = (props: OwnerProps) => {


  return (
    <>
      { React.Children.map(props.children, (child, index) => {
        if(React.isValidElement(child)) {
          return React.cloneElement(child, props)
        }
        else return <></>
      } ) }
    </>
  );
};