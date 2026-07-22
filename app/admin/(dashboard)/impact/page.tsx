import { asc } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import { db, schema } from "@/lib/db";
import {
  createImpactStat,
  updateImpactStat,
  deleteImpactStat,
} from "@/lib/actions/admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ImpactStatsPage() {
  const stats = db
    ? await db
        .select()
        .from(schema.impactStats)
        .orderBy(asc(schema.impactStats.displayOrder))
    : [];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-primary">Impact Stats</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Shown in the About page&rsquo;s &ldquo;Our Impact&rdquo; section once
        you have real numbers to publish. Leave empty until then — the
        section falls back to qualitative copy.
      </p>

      <div className="p-5 mt-6 bg-white border rounded-lg shadow-sm border-border">
        <h2 className="mb-3 text-sm font-semibold text-primary">
          Add a New Stat
        </h2>
        <form action={createImpactStat} className="grid gap-3 sm:grid-cols-2">
          <Input name="value" placeholder="Value (e.g. 500+)" required />
          <Input name="label" placeholder="Label (e.g. Families Supported)" required />
          <Input
            name="displayOrder"
            type="number"
            placeholder="Display order (0 first)"
            defaultValue={stats.length}
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked className="accent-accent" />
            Active (visible on the public site)
          </label>
          <Button type="submit" className="justify-self-start sm:col-span-2">
            Add Stat
          </Button>
        </form>
      </div>

      <div className="grid gap-4 mt-6">
        {stats.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No stats added yet.
          </p>
        )}
        {stats.map((stat) => {
          const boundUpdate = updateImpactStat.bind(null, stat.id);
          const boundDelete = deleteImpactStat.bind(null, stat.id);
          return (
            <div
              key={stat.id}
              className="p-5 bg-white border rounded-lg shadow-sm border-border"
            >
              <form action={boundUpdate} className="grid gap-3 sm:grid-cols-2">
                <Input name="value" defaultValue={stat.value} required />
                <Input name="label" defaultValue={stat.label} required />
                <Input
                  name="displayOrder"
                  type="number"
                  defaultValue={stat.displayOrder}
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={stat.isActive}
                    className="accent-accent"
                  />
                  Active (visible on the public site)
                </label>
                <div className="flex gap-2 sm:col-span-2">
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                </div>
              </form>
              <form action={boundDelete} className="mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs cursor-pointer text-destructive hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden />
                  Delete this stat
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
