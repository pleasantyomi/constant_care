import { asc } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import { db, schema } from "@/lib/db";
import {
  createOpening,
  updateOpening,
  deleteOpening,
} from "@/lib/actions/admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function OpeningsPage() {
  const openings = db
    ? await db
        .select()
        .from(schema.jobOpenings)
        .orderBy(asc(schema.jobOpenings.displayOrder))
    : [];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-primary">Job Openings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Shown on the public Careers page under &ldquo;Current
        Openings.&rdquo; Inactive roles stay here but are hidden from the
        public.
      </p>

      <div className="p-5 mt-6 bg-white border rounded-lg shadow-sm border-border">
        <h2 className="mb-3 text-sm font-semibold text-primary">
          Add a New Opening
        </h2>
        <form action={createOpening} className="grid gap-3 sm:grid-cols-2">
          <Input name="title" placeholder="Title (e.g. Youth Support Worker)" required />
          <Input name="category" placeholder="Category (e.g. Youth Services)" required />
          <Input name="location" placeholder="Location" defaultValue="New Brunswick" />
          <Input
            name="displayOrder"
            type="number"
            placeholder="Display order (0 first)"
            defaultValue={openings.length}
          />
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="isActive" defaultChecked className="accent-accent" />
            Active (visible on the public site)
          </label>
          <Button type="submit" className="justify-self-start sm:col-span-2">
            Add Opening
          </Button>
        </form>
      </div>

      <div className="grid gap-4 mt-6">
        {openings.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No openings yet — the Careers page will show the &ldquo;check
            back soon&rdquo; message.
          </p>
        )}
        {openings.map((opening) => {
          const boundUpdate = updateOpening.bind(null, opening.id);
          const boundDelete = deleteOpening.bind(null, opening.id);
          return (
            <div
              key={opening.id}
              className="p-5 bg-white border rounded-lg shadow-sm border-border"
            >
              <form action={boundUpdate} className="grid gap-3 sm:grid-cols-2">
                <Input name="title" defaultValue={opening.title} required />
                <Input name="category" defaultValue={opening.category} required />
                <Input name="location" defaultValue={opening.location} />
                <Input
                  name="displayOrder"
                  type="number"
                  defaultValue={opening.displayOrder}
                />
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={opening.isActive}
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
                  Delete this opening
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
