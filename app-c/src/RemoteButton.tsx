import { loadRemote } from '@module-federation/enhanced/runtime';
import React, { lazy, Suspense } from 'react';

const ButtonRemote = lazy(() =>
  loadRemote('app_components/Button').then((mod: any) => ({
    default: mod.Button,
  })),
);

export function RemoteButton() {
  return (
    <Suspense fallback={<div>Loading Button...</div>}>
      <ButtonRemote />
    </Suspense>
  );
}
