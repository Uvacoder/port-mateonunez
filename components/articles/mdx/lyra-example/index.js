import s from './lyra-example.module.css';

import { pokemon as pokedex } from 'public/datasets/pokedex.json';
import { create, formatNanoseconds, insert, search } from '@lyrasearch/lyra';
import { useCallback, useLayoutEffect, useState } from 'react';
import { SearchInput } from 'components/input';

export default function MDXLyraExample() {
  const [lyra, setLyra] = useState(null);
  const [results, setResults] = useState([]);
  const [elapsed, setElapsed] = useState(null);

  useLayoutEffect(() => {
    const lyra = create({
      schema: {
        num: 'string',
        name: 'string',
        img: 'string'
      }
    });

    setLyra(lyra);

    for (const { num, name, img } of pokedex) {
      insert(lyra, { num, name, img });
    }
  }, []);

  const searchCallback = useCallback(
    term => {
      if (term) {
        const { hits, elapsed } = search(lyra, { term });
        console.log({ elapsed });
        setResults(hits);
        setElapsed(elapsed);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lyra]
  );

  const onClearTerm = useCallback(() => {
    setResults([]);
  }, []);

  return (
    <div className={s.root}>
      <span>
        I&apos;m a Lyra example component. I&apos;m using a pokedex dataset, it contains{' '}
        {lyra?.docs ? Object.keys(lyra.docs).length : '0'} of elements.
      </span>

      <div className="mt-2">
        <SearchInput callback={searchCallback} actionCallback={onClearTerm} />
      </div>

      {results.length > 0 && (
        <>
          <div className="mt-2">
            <span>Elapsed time: {formatNanoseconds(elapsed)}</span>
          </div>
          <div className="mt-2">
            <pre>{JSON.stringify(results)}</pre>
          </div>
        </>
      )}
    </div>
  );
}
