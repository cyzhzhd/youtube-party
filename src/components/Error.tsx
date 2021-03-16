import { ReactElement } from 'react';

function Error(): ReactElement {
  return (
    <div className="error">
      <p>알 수 없는 에러가 발생했습니다.</p>
      <p>잠시 후에 다시 시도해주세요.</p>
    </div>
  );
}

export default Error;
