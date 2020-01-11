import { useState, useEffect } from 'react';

export default function useDebounce(text, delay) {

  const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(text);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    },[text] )

  return debouncedText;
}