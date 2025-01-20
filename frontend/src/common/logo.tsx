import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded border-2 border-[#000000a6] dark:border-[#ffffffa6] p-2 shadow-[6px_6px_0px_1px_#000000a6] dark:shadow-[6px_6px_0px_1px_#ffffffa6] flex flex-col justify-center h-8 items-center"
      )}
    >
      Solana PG Assistant
    </figure>
  );
};
