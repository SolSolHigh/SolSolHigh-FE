import React from 'react';
import { AvatarWithLabel } from '../AvatarWithLabel';
import { Button } from '../../atoms/Button';

export const ChangeChild = () => {
  return (
    <div className="flex flex-row items-center mb-2 p-2 px-4 bg-primary-100 rounded-lg p">
      <AvatarWithLabel
        imageUrl="https://media1.tenor.com/m/o2nJ-w0v7lAAAAAC/teemo.gif"
        altText="캐릭터"
        size="md"
        bgColor="blue"
        label="차은우"
        labelSize="md"
        labelWeight="bold"
        labelColor="dark"
      ></AvatarWithLabel>
      <Button size="sm" classNameStyles="ml-4">
        변경
      </Button>
    </div>
  );
};
