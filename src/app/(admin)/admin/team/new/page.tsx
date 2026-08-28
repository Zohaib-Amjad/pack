"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, UserPlus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member">("member");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    toast({
      title: "Invitation Sent",
      description: `Sent administrative access invite to ${email}.`,
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
        { label: "Invite Member" },
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
              <h2 className="text-[20px] font-bold text-[#1a1a1a]">Invite Team Member</h2>
              <p className="text-[12px] text-[#7a7672]">
                Send an invitation to join your administrative dashboard.
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="h-[40px] inline-flex items-center gap-2 px-6 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] cursor-pointer"
          >
            {isSent ? <Check size={16} /> : <UserPlus size={16} />}
            {isSent ? "Sent!" : "Send Invite"}
          </button>
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
              placeholder="e.g. Sarah Jenkins"
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
              placeholder="e.g. sarah@hofpack.com"
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
