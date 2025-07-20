// src/app/dashboard/[username]/[repo]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const today = new Date();
const earliestDate = new Date("2000-01-01");

export const formSchema = z
  .object({
    mode: z.enum(["single", "range", "year"]),
    singleDate: z.date().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    year: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const yearNum = parseInt(val, 10);
          return yearNum >= 2000 && yearNum < today.getFullYear();
        },
        {
          message: `Year must be between 2000 and ${today.getFullYear() - 1}`,
          path: ["year"],
        }
      ),
  })
  // Validate required fields per mode
  .refine(
    (data) => {
      if (data.mode === "single") return !!data.singleDate;
      if (data.mode === "range") return !!data.startDate && !!data.endDate;
      if (data.mode === "year") return !!data.year;
      return false;
    },
    {
      message: "Please fill all required fields for the selected mode.",
      path: ["mode"],
    }
  )
  // Ensure endDate > startDate for range mode
  .refine(
    (data) => {
      if (data.mode === "range" && data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date must be after start date.",
      path: ["endDate"],
    }
  );

type FormSchema = z.infer<typeof formSchema>;

const Repo = () => {
  const { username, repo } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [know, setKnow] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: "single",
    },
  });

  const mode = form.watch("mode");

  const onSubmit = (values: FormSchema) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="container py-10 mx-auto flex flex-col justify-center items-center min-h-[70vh]">
      <div className="disclaimer text-center mb-5">
        <h2 className="font-bold">Disclaimer</h2>
        <HoverCard>
          <HoverCardTrigger>
            <p className="underline text-muted-foreground cursor-pointer">
              First Read me
            </p>
          </HoverCardTrigger>
          <HoverCardContent className="text-center flex flex-col gap-2">
            <p>⚠️ You are about to make a GitHub push.</p> <br />
            <p>
              {" "}
              This activity will be reflected in your GitHub contribution graph.{" "}
            </p>
            <p>
              {" "}
              Please note: artificially inflating your activity is morally not
              correct.
            </p>{" "}
            <p>
              {" "}
              Proceed only if you are fully aware of what you're doing and
              accept responsibility.{" "}
            </p>
            <Button onClick={() => setKnow(true)}>I know, I'm aware</Button>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="w-full max-w-lg rounded-2xl shadow-xl p-8 border backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Repository Date Filter
        </h2>
        <p className="text-muted-foreground mb-8 text-center text-sm">
          Select a mode and provide the required date(s) to filter repository
          data.
        </p>

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground mb-4 justify-center">
            <Loader2 className="animate-spin" size={20} />
            Fetching repo...
          </div>
        )}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Mode Selection */}
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Select Mode
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Date</SelectItem>
                        <SelectItem value="range">Date Range</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Single Date */}
            {mode === "single" && (
              <FormField
                control={form.control}
                name="singleDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select a date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > today || date < earliestDate
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Date Range */}
            {mode === "range" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select start date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > today || date < earliestDate
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select End date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const startDate = form.watch("startDate");
                              return (
                                (!!startDate && date <= startDate) ||
                                date > today ||
                                date < earliestDate
                              );
                            }}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Year */}
            {mode === "year" && (
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2024"
                        {...field}
                        min={2000}
                        max={today.getFullYear() - 1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full text-lg font-semibold">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Repo;
