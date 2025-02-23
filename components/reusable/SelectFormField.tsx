"use client";

import Link from "next/link";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Define the props dynamically
interface SelectFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // Allows passing any field name dynamically
  label: string; // Label for the select field
  description?: string; // Optional description text
  options: { id: string; name: string }[]; // Array of selectable items
}

export default function SelectFormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
}: SelectFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name} // Dynamically set field name
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0 ? (
                options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>
                  No options available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {description && (
            <FormDescription>
              {description}{" "}
              <Link href="/settings/preferences" className="text-blue-600">
                Manage here
              </Link>
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
