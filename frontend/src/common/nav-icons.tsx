"use client";

import { cn } from "@/lib/utils";

export const NavItems = () => {
  const pathname = "/chat";

  return (
    <div className="flex gap-x-3 ml-4">
      <a
        className="font-semibold text-sm underline-offset-4 hover:underline"
        href={"/chat"}
      >
        <span
          className={cn(
            "text-gray-500 hidden sm:flex",
            pathname === "/chat"
              ? "underline text-black underline-offset-4"
              : ""
          )}
        >
          Chat
        </span>
      </a>
    </div>
  );
};
