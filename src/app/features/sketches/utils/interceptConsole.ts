import { LogLevel } from "../domain/LogLevel";

const setupIntercept = (
  key: LogLevel,
  onIntercept: (level: LogLevel, ...args: unknown[]) => void
) => {
  const method = window.console[key];
  window.console[key] = (...args) => {
    method(...args);
    onIntercept(key, ...args);
  };
  return () => {
    window.console[key] = method;
  };
};

export const interceptConsole = (
  callback: () => void,
  onIntercept: (level: LogLevel, ...args: unknown[]) => void
) => {
  const clears = [
    setupIntercept("log", onIntercept),
    setupIntercept("info", onIntercept),
    setupIntercept("warn", onIntercept),
    setupIntercept("error", onIntercept),
  ];
  try {
    callback();
  } finally {
    for (const clear of clears) {
      clear();
    }
  }
};
