/* eslint-disable no-shadow */
import React, { ReactElement, ReactNode, useContext, useMemo, useState } from 'react';

import { MantineThemeOverride } from '@mantine/core';

type ThemeContext = {
  theme: MantineThemeOverride,
  updateThemePreferences: (theme: MantineThemeOverride) => void;
}

const Context = React.createContext({} as ThemeContext);

export function ThemeContext({ children }: { children: ReactElement | ReactElement[] | ReactNode }) {
  const [theme, setTheme] = useState<MantineThemeOverride>({
    black: '#242424',
    defaultRadius: "md",
    primaryColor: 'dark',
    components: {
      Container: {
        styles: {
          root: {
            minHeight: '100vh',
            paddingBottom: 200
          }
        }
      }
    }
  });

  const updateThemePreferences = (theme_preferences: MantineThemeOverride) => {
    setTheme(theme_preferences);
  }

  const MemoizedValues = useMemo(() => ({
    theme, updateThemePreferences
  }), [theme])

  return (
    <Context.Provider value={MemoizedValues}>
      {children}
    </Context.Provider>
  );
}

export function useTheme() {
  return useContext(Context);
}
