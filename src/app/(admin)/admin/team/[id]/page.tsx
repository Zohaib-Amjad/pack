"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, Check, Trash2 } from "lucide-react";
import { INITIAL_TEAM_MEMBERS, TeamMember } from "@/components/admin/AdminTeamView";
import { useToast } from "@/hooks/use-toast";

export default function EditTeamMemberPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;

  const [member, setMember] = useState<TeamMember | null>(null);
  const [name, setName] = useState("Team Member");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member">("member");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = INITIAL_TEAM_MEMBERS.find((m) => m.id === id);
    if (found) {
      setMember(found);
      setName(found.name);
      setEmail(found.email);
      setRole(found.role);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    toast({
      title: "Team Member Updated",
      description: `Updated permissions for ${email}.`,
    });
    setTimeout(() => {
      router.push("/admin/team");
    }, 800);
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Global settings" },
        { label: "Team management", href: "/admin/team" },
        { label: "Edit Member" },
      ]}
    >
      <div className="p-6 sm:p-8 max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e0ddd6]">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/team"
              className="p-2 rounded-lg border border-[#e0ddd6] text-[#7a7672] hover:bg-white hover:text-[#1a1a1a]"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h2 className="text-[20px] font-bold text-[#1a1a1a]">Edit Team Member</h2>
              <p className="text-[12px] text-[#7a7672]">
                Update role permissions or revoke access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to remove this team member?")) {
                  toast({
                    title: "Member Removed",
                    description: "User access has been revoked.",
                  });
                  router.push("/admin/team");
                }
              }}
              className="h-[40px] inline-flex items-center gap-2 px-4 text-[12px] font-bold rounded-[8px] border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 size={16} /> Delete
            </button>
            <button
              onClick={handleSubmit}
              className="h-[40px] inline-flex items-center gap-2 px-6 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] cursor-pointer"
            >
              {isSaved ? <Check size={16} /> : <Save size={16} />}
              {isSaved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm flex flex-col gap-5"
        >
          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
              Role &amp; Permissions
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "member")}
              className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white cursor-pointer"
            >
              <option value="member">Member (Content Editor &amp; Lead Reviewer)</option>
              <option value="admin">Admin (Full System &amp; Settings Access)</option>
            </select>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
