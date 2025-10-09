'use client';

import { UserButton } from '@clerk/nextjs';
import { App } from '@/db/schema';

export function AppHeader({ app }: { app: App }) {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="font-semibold">{app.name}</div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
