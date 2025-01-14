import { DependencyList, useEffect } from 'react';

import {
  AnimatedContext,
  ReanimatedContext,
  useKeyboardContext,
} from './context';
import { KeyboardController } from './bindings';
import { AndroidSoftInputModes } from './constants';
import { uuid } from './utils';

import type { KeyboardHandler } from './types';

export const useResizeMode = () => {
  useEffect(() => {
    KeyboardController.setInputMode(
      AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE
    );

    return () => KeyboardController.setDefaultMode();
  }, []);
};

export const useKeyboardAnimation = (): AnimatedContext => {
  useResizeMode();
  const context = useKeyboardContext();

  return context.animated;
};

export const useReanimatedKeyboardAnimation = (): ReanimatedContext => {
  useResizeMode();
  const context = useKeyboardContext();

  return context.reanimated;
};

export function useGenericKeyboardHandler(
  handler: KeyboardHandler,
  deps?: DependencyList
) {
  const context = useKeyboardContext();

  useEffect(() => {
    const key = uuid();

    context.setHandlers({ [key]: handler });

    return () => {
      context.setHandlers({ [key]: undefined });
    };
  }, deps);
}

export function useKeyboardHandler(
  handler: KeyboardHandler,
  deps?: DependencyList
) {
  useResizeMode();
  useGenericKeyboardHandler(handler, deps);
}
