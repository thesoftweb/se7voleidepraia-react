import { useCallback } from 'react';

function useClipboard() {
  const copyToClipboard = useCallback(async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Texto copiado para a área de transferência');
    } catch (err) {
      alert(`Falha ao copiar o texto ${err}`);
    }
  }, []);
  return copyToClipboard;
}

export default useClipboard;