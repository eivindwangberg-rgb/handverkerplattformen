"use client";

interface PortalButtonProps {
  unreadCount: number;
  onClick: () => void;
}

export default function PortalButton({ unreadCount, onClick }: PortalButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-white/30 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10 relative"
    >
      Min side
      {unreadCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
