import { ReactElement } from 'react';

function Loading(): ReactElement {
  return (
    <div className="loader">
      <i className="fa fa-fan fa-spin" />
    </div>
  );
}

export default Loading;
