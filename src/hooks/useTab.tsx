import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type TabProviderProps = {
  children: ReactNode;
};

type TabContextProps = {
  tabIndex: number;
  moveForward: () => void;
  moveBack: () => void;
  handleTabsChange: (index: number) => void;
};

const TabContext = createContext({} as TabContextProps);

export function TabProvider({ children }: TabProviderProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const moveForward = () => setTabIndex((_tabIndex) => _tabIndex + 1);
  const moveBack = () => setTabIndex((_tabIndex) => _tabIndex - 1);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const providerValue = useMemo(
    () => ({ tabIndex, moveForward, moveBack, handleTabsChange }),
    [tabIndex],
  );

  return (
    <TabContext.Provider value={providerValue}>{children}</TabContext.Provider>
  );
}

export function useTab() {
  return useContext(TabContext);
}
