
import { useState, useEffect } from 'react';
import { BlockObject, HistoryState } from '../types';

export const useBlockHistory = (blocks: BlockObject[]) => {
  const [history, setHistory] = useState<HistoryState[]>([{ blocks: [] }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Save state to history when blocks change
  useEffect(() => {
    // Skip initial render
    if (blocks.length === 0 && history[0].blocks.length === 0) return;
    
    // Don't add to history if we're currently navigating history
    if (historyIndex < history.length - 1) {
      // Truncate future history and add current state
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, { blocks: [...blocks] }]);
      setHistoryIndex(historyIndex + 1);
    } else if (JSON.stringify(blocks) !== JSON.stringify(history[historyIndex]?.blocks)) {
      // Add to history if blocks have changed
      setHistory([...history, { blocks: [...blocks] }]);
      setHistoryIndex(historyIndex + 1);
    }
  }, [blocks]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      return history[newIndex].blocks;
    }
    return null;
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      return history[newIndex].blocks;
    }
    return null;
  };

  return {
    historyIndex,
    historyLength: history.length,
    handleUndo,
    handleRedo
  };
};
