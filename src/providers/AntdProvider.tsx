import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { ConfigProvider, type ConfigProviderProps, theme } from "antd";

interface AntdContextValues {
  isDarkMode: boolean;
  changeDarkMode(value: boolean): void;
}

const AntdContext = createContext<AntdContextValues | null>(null);

export function AntdProvider({
  children,
  ...props
}: PropsWithChildren<ConfigProviderProps>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleOnChangeMode = useCallback((value: boolean) => {
    setIsDarkMode(value);

    if (value) {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
  }, []);

  const value = useMemo(
    () => ({ isDarkMode, changeDarkMode: handleOnChangeMode }),
    [handleOnChangeMode, isDarkMode],
  );

  const token = theme.getDesignToken();

  return (
    <ConfigProvider
      {...props}
      theme={{
        ...props.theme,
        token: {
          ...props.theme?.token,
          colorPrimary: token.yellow,
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntdContext.Provider value={value}>{children}</AntdContext.Provider>
    </ConfigProvider>
  );
}

export function useAntd() {
  const context = useContext(AntdContext);

  if (!context) {
    throw new Error("useAntd must be used within an AntdProvider");
  }

  return context;
}
