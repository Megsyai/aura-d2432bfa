import { useState, useEffect } from 'react';

export function useCollection<T extends { id?: string | number }>(name: string) {
  const [data, setData] = useState<T[]>(() => {
    const saved = localStorage.getItem(`db_${name}`);
    return saved ? JSON.parse(saved) : [];
  });

  const sync = (newData: T[]) => {
    setData(newData);
    localStorage.setItem(`db_${name}`, JSON.stringify(newData));
  };

  return {
    data,
    insert: (item: T) => sync([...data, { ...item, id: item.id || Date.now() }]),
    update: (id: string | number, item: Partial<T>) => 
      sync(data.map(i => i.id === id ? { ...i, ...item } : i)),
    remove: (id: string | number) => sync(data.filter(i => i.id !== id)),
    clear: () => sync([])
  };
}
