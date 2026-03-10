import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

interface UserCardProps {
    name: string;
    email?: string;
    role?: string;
    avatar?: string;
    level?: number;
    xp?: number; // 0–100
    className?: string;
}

export function UserCard({ name, email, role, avatar, level, xp = 0, className }: UserCardProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className={cn("rounded-sm border border-cyan-500/20 p-4 relative overflow-hidden", "bg-linear-to-b from-cyan-950/20 to-[#040d18]", className)}>
            {/* Technical grid background sub-effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #22d3ee 1px, transparent 1px)", backgroundSize: "10px 10px" }} />

            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                    {avatar ? (
                        <img src={avatar} alt={name} className="h-14 w-14 rounded-sm object-cover border border-cyan-400/30" />
                    ) : (
                        <span
                            className="flex h-14 w-14 items-center justify-center rounded-sm text-lg font-black text-cyan-300 border border-cyan-400/30"
                            style={{ background: "#061320", textShadow: "0 0 8px #22d3ee40" }}
                        >
                            {initials}
                        </span>
                    )}
                    {/* Small corner decorative elements */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-400/60" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-right border-cyan-400/60" />
                </div>

                {/* Info and Stats Grid */}
                <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-black tracking-[0.2em] text-cyan-100 uppercase leading-none">{name}</p>
                        <Settings size={12} className="text-cyan-600/50" />
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                        <div className="flex text-[9px] tracking-widest">
                            <span className="text-blue-500/50 w-12 shrink-0">CLASS:</span>
                            <span className="text-cyan-400 font-bold truncate">{role} RANK</span>
                        </div>
                        <div className="flex text-[9px] tracking-widest">
                            <span className="text-blue-500/50 w-12 shrink-0">NAME:</span>
                            <span className="text-blue-100 truncate">JINWOO</span>
                        </div>
                        {email && (
                            <div className="flex text-[9px] tracking-widest">
                                <span className="text-blue-500/50 w-12 shrink-0">DEVEL:</span>
                                <span className="text-blue-100 truncate uppercase">{email.split("@")[0]}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Level + XP Progress */}
            {level !== undefined && (
                <div className="mt-4 space-y-2 border-t border-cyan-900/40 pt-3">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-blue-500/50 tracking-tighter uppercase">Power Level</span>
                            <span className="text-xs font-black text-cyan-300 leading-none">LEVEL: {level}</span>
                        </div>
                        <span className="text-[10px] font-bold text-cyan-400/80 italic">XP: {xp}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden bg-cyan-950/40 border border-cyan-900/30">
                        <div
                            className="h-full transition-all duration-1000 ease-out"
                            style={{
                                width: `${xp}%`,
                                background: "linear-gradient(90deg, #0891b2, #22d3ee)",
                                boxShadow: "0 0 10px #22d3ee60",
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
