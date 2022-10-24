import { useRef, useState, useMemo, useEffect } from 'react';
import { Cross, MagnifyingGlass } from 'components';
import Input from './input';

export default function SearchInput({ placeholder, autofocus = false, callback, actionCallback }) {
  const inputRef = useRef(null);
  const [term, setTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isFocus, setIsFocus] = useState(false);

  const isValidTerm = useMemo(() => term.length > 0, [term]);

  useEffect(() => {
    if (isValidTerm) {
      callback(term);
    }
  }, [callback, isValidTerm, term]);

  return (
    <>
      <Input
        ref={inputRef}
        value={term}
        autofocus={autofocus}
        placeholder={placeholder || 'Search'}
        onChange={({ target: { value } }) => setTerm(value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        IconLeft={() => <MagnifyingGlass className="w-6 h-6 text-black" />}
        IconRight={() =>
          term.length > 0 && (
            <button
              onMouseDown={() => {
                if (actionCallback) actionCallback();

                setTerm('');
              }}
              title="Reset">
              <Cross className="w-6 h-6 text-black" />
            </button>
          )
        }
      />
    </>
  );
}
