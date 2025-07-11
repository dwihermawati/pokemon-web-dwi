'use client';

import { useEffect, useRef, useState } from 'react';

const placeholders = ['Search Pokemon', 'Pikachu', 'Charizard', 'Bulbasaur'];

const TypingPlaceholderInput = ({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [placeholder, setPlaceholder] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const indexRef = useRef(0);
  const charIndexRef = useRef(0);
  const phaseRef = useRef<'typing' | 'deleting'>('typing');
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const blinkInterval = useRef<NodeJS.Timeout | null>(null);

  const TYPING_DELAY = 80;
  const DELETING_DELAY = 50;
  const PAUSE_AFTER_TYPING = 1200;
  const PAUSE_AFTER_DELETING = 600;

  const typeEffect = () => {
    const currentText = placeholders[indexRef.current];
    const charIndex = charIndexRef.current;

    if (phaseRef.current === 'typing') {
      if (charIndex <= currentText.length) {
        setPlaceholder(currentText.slice(0, charIndex));
        charIndexRef.current += 1;
        typingTimeout.current = setTimeout(typeEffect, TYPING_DELAY);
      } else {
        phaseRef.current = 'deleting';
        typingTimeout.current = setTimeout(typeEffect, PAUSE_AFTER_TYPING);
      }
    } else {
      if (charIndex >= 0) {
        setPlaceholder(currentText.slice(0, charIndex));
        charIndexRef.current -= 1;
        typingTimeout.current = setTimeout(typeEffect, DELETING_DELAY);
      } else {
        phaseRef.current = 'typing';
        indexRef.current = (indexRef.current + 1) % placeholders.length;
        charIndexRef.current = 0;
        typingTimeout.current = setTimeout(typeEffect, PAUSE_AFTER_DELETING);
      }
    }
  };

  useEffect(() => {
    if (!isFocused && !props.value) {
      typingTimeout.current = setTimeout(typeEffect, 500);
    }

    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [isFocused, props.value]);

  useEffect(() => {
    blinkInterval.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      if (blinkInterval.current) clearInterval(blinkInterval.current);
    };
  }, []);

  return (
    <div className='relative w-full'>
      {!isFocused && !props.value && (
        <span className='text-sm-regular md:text-md-regular pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-neutral-500 select-none'>
          {placeholder}
          <span
            className='ml-0.5 inline-block w-[1px] bg-neutral-500 align-middle'
            style={{
              height: '1em',
              visibility: showCursor ? 'visible' : 'hidden',
            }}
          />
        </span>
      )}

      <input
        {...props}
        className={
          className +
          'text-sm-regular md:text-md-regular relative z-10 h-7 w-full bg-transparent text-neutral-900 outline-none md:h-7.5'
        }
        onFocus={() => {
          setIsFocused(true);
          setPlaceholder('');
          if (typingTimeout.current) clearTimeout(typingTimeout.current);
        }}
        onBlur={() => {
          setIsFocused(false);
          if (!props.value) {
            phaseRef.current = 'typing';
            charIndexRef.current = 0;
            typingTimeout.current = setTimeout(typeEffect, 500);
          }
        }}
      />
    </div>
  );
};

export default TypingPlaceholderInput;
