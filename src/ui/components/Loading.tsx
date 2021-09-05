import * as React from 'react';
import {BiLoader} from 'react-icons/bi';

const Loading: () => JSX.Element = () => {
  return <div
    className="align-items-center justify-content-center d-flex"
    style={{height: '100vh'}}>
    <BiLoader size={35} className="rotating" />
  </div>;
};

export default Loading;
