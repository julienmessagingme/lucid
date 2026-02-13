import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKey } from '../utils/storage';

export function useStorage<T>(key: StorageKey, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItem<T>(key).then((stored) => {
      if (stored !== null) setValue(stored);
      setLoading(false);
    });
  }, [key]);

  const update = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      const resolved = typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue;
      setValue(resolved);
      await setItem(key, resolved);
    },
    [key, value],
  );

  return [value, update, loading] as const;
}
