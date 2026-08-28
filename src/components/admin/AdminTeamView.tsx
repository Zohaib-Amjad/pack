"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  UserPlus,
  Mail,
  Pencil,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  joinedDate: string;
  initial: string;
}

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "58968a1a-7946-400b-80de-411cbaa4744e",
    name: "Team Member",
    email: "admin@hofpack.com",
    role: "admin",
    joinedDate: "3/27/2026",
    initial: "A",
  },
  {
    id: "9968beda-35ea-4f6b-8598-243efc0b1bec",
    name: "Team Member",
    email: "farazjamal.khawaja@gmail.com",
    role: "member",
    joinedDate: "3/26/2026",
    initial: "F",
  },
  {
    id: "c8e41fa7-681d-47cc-b5a2-2fff84be4271",
    name: "Team Member",
    email: "muhammadarslan0026@gmail.com",
    role: "member",
    joinedDate: "3/26/2026",
    initial: "M",
  },
];

export default function AdminTeamView() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "global" | "artwork" | "category" | "product"
  >("global");
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
    );
  }, [members, searchQuery]);

  const handleDelete = (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the team?`)) {
      return;
    }
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast({
      title: "Team Member Removed",
      description: `${email} has been removed from administrator access.`,
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setActiveTab("global")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "global"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Global FAQs
          {activeTab === "global" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("artwork")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "artwork"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Artwork Guidelines
          {activeTab === "artwork" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("category")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "category"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Category
          {activeTab === "category" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("product")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "product"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Product
          {activeTab === "product" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-[20px] max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
            {/* Top Title & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
              <div>
                <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-tight">
                  Team Management
                </h1>
                <p className="text-[13px] text-[#7a7672] font-medium mt-1">
                  Control administrative access and user roles for your organization.
                </p>
              </div>

              <Link
                href="/admin/team/new"
                className="h-[44px] px-8 bg-[#e8732a] hover:bg-[#c45a18] text-white font-bold text-[13px] rounded-[12px] flex items-center gap-2.5 shadow-[0_10px_25px_rgba(232,115,42,0.25)] hover:shadow-[0_15px_30px_rgba(232,115,42,0.3)] transition-all active:scale-95 no-underline cursor-pointer"
              >
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Link>
            </div>

            {/* Container Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-[24px] border border-[#e0ddd6]/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              {/* Search Bar */}
              <div className="relative max-w-md mb-10">
                <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#aaa6a0]/60" />
                <input
                  placeholder="Search by name or email..."
                  className="w-full h-[48px] pl-[44px] pr-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => {
                  const isAdmin = member.role === "admin";
                  return (
                    <div
                      key={member.id}
                      className="bg-white p-6 rounded-[20px] border border-[#e0ddd6]/80 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div className="relative h-12 w-12 rounded-2xl bg-[#f5f3ee] border border-[#e0ddd6]/60 flex items-center justify-center overflow-hidden shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110">
                          <span className="text-[18px] font-bold text-[#2d5c3e]">
                            {member.initial}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isAdmin ? (
                            <div className="h-[24px] px-3 rounded-full flex items-center gap-2 border bg-[#fdf0e8] text-[#c45a18] border-[#fdf0e8]">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#e8732a] shadow-[0_0_6px_rgba(232,115,42,0.4)]" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.05em]">
                                admin
                              </span>
                            </div>
                          ) : (
                            <div className="h-[24px] px-3 rounded-full flex items-center gap-2 border bg-[#eaf2ed] text-[#2d5c3e] border-[#eaf2ed]">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#2d5c3e] shadow-[0_0_6px_rgba(45,92,62,0.4)]" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.05em]">
                                Member
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-[15px] font-bold text-[#1a1a1a] tracking-tight truncate">
                            {member.name}
                          </h3>
                          <p className="text-[12px] text-[#7a7672] font-medium flex items-center gap-2 mt-1 truncate">
                            <Mail className="h-3.5 w-3.5 opacity-60 shrink-0" />
                            {member.email}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#e0ddd6]/60 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                            Joined {member.joinedDate}
                          </span>

                          <div className="flex gap-2">
                            <Link
                              href={`/admin/team/${member.id}`}
                              className="h-[32px] w-[32px] rounded-xl hover:bg-[#f5f3ee] text-[#aaa6a0] hover:text-[#2d5c3e] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm hover:shadow-md cursor-pointer no-underline"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDelete(member.id, member.email)}
                              className="h-[32px] w-[32px] rounded-xl hover:bg-red-50 text-[#aaa6a0] hover:text-red-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm hover:shadow-md cursor-pointer"
                              title="Remove member"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
