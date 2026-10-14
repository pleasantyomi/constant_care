import Image from "next/image";
import { asc } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import { db, schema } from "@/lib/db";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/actions/admin";
import { initials, teamPhotoSrc } from "@/lib/team";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const photoInputClasses =
  "text-sm text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary";

export default async function TeamPage() {
  const members = db
    ? await db
        .select()
        .from(schema.teamMembers)
        .orderBy(asc(schema.teamMembers.displayOrder))
    : [];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-primary">Team Members</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Shown on the public Our Team page. Inactive members stay here but are
        hidden from the public. Photos must be JPG, PNG, or WebP and under
        3MB. Portrait (4:5) crops look best.
      </p>

      <div className="p-5 mt-6 bg-white border rounded-lg shadow-sm border-border">
        <h2 className="mb-3 text-sm font-semibold text-primary">
          Add a Team Member
        </h2>
        <form action={createTeamMember} className="grid gap-3 sm:grid-cols-2">
          <Input name="name" placeholder="Full name" required />
          <Input name="role" placeholder="Role (e.g. Program Director)" required />
          <Textarea
            name="bio"
            placeholder="Short bio"
            rows={4}
            required
            className="sm:col-span-2"
          />
          <label className="grid gap-1 text-sm sm:col-span-2">
            Photo
            <input
              type="file"
              name="photo"
              accept="image/jpeg,image/png,image/webp"
              className={photoInputClasses}
            />
          </label>
          <Input
            name="displayOrder"
            type="number"
            placeholder="Display order (0 first)"
            defaultValue={members.length}
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked className="accent-accent" />
            Active (visible on the public site)
          </label>
          <Button type="submit" className="justify-self-start sm:col-span-2">
            Add Member
          </Button>
        </form>
      </div>

      <div className="grid gap-4 mt-6">
        {members.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No team members yet. The Our Team page will show a &ldquo;coming
            soon&rdquo; message.
          </p>
        )}
        {members.map((member) => {
          const boundUpdate = updateTeamMember.bind(null, member.id);
          const boundDelete = deleteTeamMember.bind(null, member.id);
          const photo = teamPhotoSrc(member);
          return (
            <div
              key={member.id}
              className="p-5 bg-white border rounded-lg shadow-sm border-border"
            >
              <form action={boundUpdate} className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-4 sm:col-span-2">
                  <span className="relative flex items-center justify-center w-16 h-20 overflow-hidden rounded-md shrink-0 bg-secondary">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={`Portrait of ${member.name}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-primary/60">
                        {initials(member.name)}
                      </span>
                    )}
                  </span>
                  <div className="grid gap-2">
                    <label className="grid gap-1 text-sm">
                      {photo ? "Replace photo" : "Add photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/jpeg,image/png,image/webp"
                        className={photoInputClasses}
                      />
                    </label>
                    {photo && (
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input type="checkbox" name="removePhoto" className="accent-accent" />
                        Remove current photo
                      </label>
                    )}
                  </div>
                </div>
                <Input name="name" defaultValue={member.name} required />
                <Input name="role" defaultValue={member.role} required />
                <Textarea
                  name="bio"
                  defaultValue={member.bio}
                  rows={4}
                  required
                  className="sm:col-span-2"
                />
                <Input
                  name="displayOrder"
                  type="number"
                  defaultValue={member.displayOrder}
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={member.isActive}
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
                  Delete this team member
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
