"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils"; // optional helper for class merging

interface ModernIconSelectorProps {
  value?: string;
  onChange: (icon: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  showClearButton?: boolean;
  className?: string;
}

export const ModernIconSelector = ({
  value,
  onChange,
  placeholder = "Select icon...",
  disabled = false,
  showClearButton = true,
  className = "",
}: ModernIconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemIncrement = 50;

  const { Search: _, X: __, ...icons } = LucideIcons;
  const iconNames = Object.keys(icons);

  const filteredIcons = useMemo(
    () =>
      iconNames.filter((name) =>
        name?.toLowerCase()?.includes(search?.toLowerCase())
      ),
    [search]
  );

  const visibleIcons = useMemo(
    () => filteredIcons?.slice(0, visibleCount),
    [filteredIcons, visibleCount]
  );

  const SelectedIcon: any = value ? icons[value as keyof typeof icons] : null;

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        setVisibleCount((prev) =>
          Math.min(prev + itemIncrement, filteredIcons.length)
        );
      }
    },
    [filteredIcons.length]
  );

  useEffect(() => {
    setVisibleCount(itemIncrement);
  }, [search]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Button
            variant="outline"
            type="button"
            disabled={disabled}
            className={cn(
              "flex items-center justify-between w-full h-10 px-3",
              className
            )}
          >
            <div className="flex items-center gap-2 truncate">
              {SelectedIcon && <SelectedIcon size={18} />}
              <span
                className={
                  value ? "truncate text-sm" : "text-muted-foreground text-sm"
                }
              >
                {value ? value : placeholder}
              </span>
            </div>
            <Search size={16} className="text-gray-400" />
          </Button>

          {showClearButton && value && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <X size={12} />
            </span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[360px] p-2">
        <div className="mb-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="text-sm"
          />
        </div>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="max-h-[300px] overflow-y-auto scrollbar-thin pr-1"
        >
          {visibleIcons.length === 0 ? (
            <div className="text-sm text-center text-muted-foreground py-8">
              No icons found
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              {visibleIcons.map((iconName) => {
                const Icon: any = icons[iconName as keyof typeof icons];
                const isSelected = value === iconName;
                return (
                  <button
                    key={iconName}
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                    }}
                    title={iconName}
                    className={cn(
                      "group flex flex-col items-center justify-center p-2 rounded-md border transition-all hover:bg-blue-50",
                      isSelected
                        ? "bg-blue-100 border-blue-500 text-blue-600"
                        : "border-transparent hover:border-blue-300"
                    )}
                  >
                    <Icon
                      size={20}
                      className="mb-1 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-[10px] text-center truncate w-full">
                      {iconName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
