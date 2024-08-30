import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Message = ({ notification }: any) => {
  return (
    <>
      <div id="notificationHeader">
        <span>{notification?.title}</span>
      </div>
      <div id="notificationBody">{notification?.body}</div>
    </>
  );
};

export default Message;
