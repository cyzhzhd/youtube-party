import React, { useState, Dispatch, SetStateAction, ReactElement } from 'react';

interface input {
  type: string;
}

export default function useInput({
  type,
}: input): [string, ReactElement, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>('');
  const input = (
    <input value={value} onChange={e => setValue(e.target.value)} type={type} />
  );

  return [value, input, setValue];
}
