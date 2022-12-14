import s from './artist-card.module.css';

import Image from 'next/image';
import Link from 'next/link';

import { Fade, Title } from 'components';
import config from 'lib/config';

export default function ArtistCard({ item, delay = 0 }) {
  return (
    <>
      <div className={s.root}>
        <Link
          href={item.url}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.name} [${item.genres}]`}
          aria-label={`${item.name} [${item.genres}]`}>
          <div className="absolute inset-0 gradient blend-darken" />
          <Image
            className={s.image}
            src={item.thumbnail}
            alt={item.name}
            height={320}
            width={260}
            layout="responsive"
            quality={60}
          />
          <Fade className={s['name-container']} delay={delay + config.munber / 100}>
            <Title element="h3" variant="naked" className={s.name}>
              {item.name}
            </Title>
          </Fade>
        </Link>
      </div>
    </>
  );
}
