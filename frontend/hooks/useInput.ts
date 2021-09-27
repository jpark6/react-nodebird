import { useState, useCallback, ChangeEvent } from 'react';

const useInput = ( initValue = ''): [string, ((e: ChangeEvent) => void), ((value: (((prevState: string) => string) | string)) => void)] => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter];
};

export default useInput;
