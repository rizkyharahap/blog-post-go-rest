export interface Cancelable {
  clear(): void;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 500,
) {
  let timeout: ReturnType<typeof setTimeout>;

  function debounced(...args: Parameters<T>) {
    const later = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced as T & Cancelable;
}
