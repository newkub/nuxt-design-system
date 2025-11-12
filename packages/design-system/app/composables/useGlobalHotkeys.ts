import type { Hotkey } from '~/app/types/hotkeys';

export function useGlobalHotkeys(hotkeys: Hotkey[]) {
  const { cleanup } = useHotkeys(hotkeys)
  return { cleanup }
}

