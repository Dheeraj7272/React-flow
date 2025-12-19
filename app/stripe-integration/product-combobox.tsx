"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";

export function ProductComboboxDemo({
  data,
  value,
  setValue,
  placeholder,
  label,
  notFoundLabel,
  loading = true,
}: {
  data: any[];
  notFoundLabel: string;
  placeholder: string;
  label: string;
  value: string[];
  setValue: any;
  loading?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-72 justify-between"
        >
          {value && value.length ? `${value.length} Products Selected` : label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          {loading ? (
            <div className="h-32 flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <CommandList>
              <CommandEmpty>{notFoundLabel}</CommandEmpty>
              <CommandGroup>
                {data.map((product) => (
                  <CommandItem
                    key={product.value}
                    value={product.value}
                    onSelect={(currentValue) => {
                      setValue(
                        value.includes(currentValue)
                          ? value.filter((v) => v !== currentValue)
                          : [...value, currentValue]
                      );
                    }}
                  >
                    {product.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value.includes(product.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
