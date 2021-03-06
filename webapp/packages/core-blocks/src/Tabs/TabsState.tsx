/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { useEffect, useMemo } from 'react';
import { useTabState } from 'reakit/Tab';

import { TabsContext } from './TabsContext';

type Props = React.PropsWithChildren<{
  selectedId?: string;
  orientation?: 'horizontal' | 'vertical';
  currentTabId?: string | null;
  manual?: boolean;
}>

export function TabsState({
  selectedId, orientation, currentTabId, children, manual,
}: Props) {
  const state = useTabState({
    selectedId: selectedId || currentTabId,
    orientation,
    manual,
  });
  if (currentTabId) {
    state.selectedId = currentTabId;
  }
  useEffect(() => {
    if (!currentTabId) {
      return;
    }
    state.select(currentTabId);
  }, [currentTabId]); // hack currentId and selectedId not works
  const value = useMemo(() => state, Object.values(state));

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
}
