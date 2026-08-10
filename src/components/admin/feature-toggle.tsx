"use client";

import { useState, useTransition } from "react";
import { setFeatureAction } from "@/app/admin/actions";
import type { FeatureKey } from "@/config/features";
import { cn } from "@/lib/utils";

export function FeatureToggle({
  featureKey,
  enabled,
  label,
  description,
}: {
  featureKey: FeatureKey;
  enabled: boolean;
  label: string;
  description?: string;
}) {
  const [on, setOn] = useState(enabled);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !on;
    setOn(next); // optimistic
    startTransition(async () => {
      try {
        await setFeatureAction(featureKey, next);
      } catch {
        setOn(!next); // revert on failure
      }
    });
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4">
      <div>
        <p className="font-medium text-navy-900">{label}</p>
        {description && <p className="mt-0.5 text-sm text-stone-500">{description}</p>}
        <p className="mt-1 text-xs font-medium">
          Status:{" "}
          <span className={on ? "text-emerald-700" : "text-stone-500"}>
            {on ? "Enabled — visible to everyone" : "Disabled — hidden from the public site"}
          </span>
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={`${label} — ${on ? "enabled" : "disabled"}`}
        disabled={pending}
        onClick={toggle}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors disabled:opacity-60",
          on ? "bg-emerald-600" : "bg-stone-300",
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
            on ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
