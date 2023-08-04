import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Mode = 'edit' | 'preview';

export default function useMode(): [Mode, () => void] {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get('mode') === 'edit' ? 'edit' : 'preview';
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    const newMode = searchParams.get('mode') === 'edit' ? 'edit' : 'preview';
    setMode(newMode);
  }, [location.search]);

  const toggleMode = () => {
    const newMode = mode === 'edit' ? 'preview' : 'edit';
    setMode(newMode);
  };

  return [mode, toggleMode];
}
