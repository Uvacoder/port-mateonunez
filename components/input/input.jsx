import { forwardRef, useEffect } from 'react';
import styles from './input.module.css';
import cn from 'classnames';
// Icon is passed capitalized because it's a component
const Input = ({ autofocus, IconLeft, IconRight, ...props }, ref) => {
  useEffect(() => {
    if (autofocus) {
      ref.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autofocus]);

  return (
    <>
      <div className={styles.root}>
        {IconLeft && (
          <div className={cn(styles.icon, styles.iconLeft)}>
            <IconLeft />
          </div>
        )}

        <input className={styles.input} {...props} ref={ref} />

        {IconRight && (
          <div className={cn(styles.icon, styles.iconRight)}>
            <IconRight />
          </div>
        )}
      </div>
    </>
  );
};

export default forwardRef(Input);
