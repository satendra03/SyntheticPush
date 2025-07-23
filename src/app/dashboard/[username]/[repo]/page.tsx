// src/app/dashboard/[username]/[repo]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { formSchema, SyntheticPushPayload } from "@/types";
import { toast } from "sonner"


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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const today = new Date();
const earliestDate = new Date("2020-01-01");

type FormSchema = z.infer<typeof formSchema>;

const Repo = () => {
  const { data: session } = useSession();

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

  const onSubmit = async (values: FormSchema) => {
    if(!know) {
      toast.error("Please read the disclaimer first");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const payload: SyntheticPushPayload = {
        date: values.singleDate?.toISOString() || "",
        repo: `${username}/${repo}`,
        accessToken: session?.user?.accessToken || "",
        authorName: session?.user?.username || "",
        authorEmail: session?.user?.email || "",
      };
      const res = await fetch("/api/github/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      console.log("Push result:", data);
      toast.success(`${data.success ? "Push successful" : "Push failed"}`);
    } catch (err) {
      setError("Failed to push: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10 mx-auto flex flex-col justify-center items-center min-h-[70vh]">
      <div className="disclaimer text-center mb-5">
        <h2 className="font-bold">Disclaimer</h2>

        <Drawer>
          <DrawerTrigger>
            <p className="underline text-muted-foreground cursor-pointer">
              First Read me
            </p>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Disclaimer</DrawerTitle>
              <DrawerDescription>
                <div>
                  <p>⚠️ You are about to make a GitHub push.</p> <br />
                  <p>
                    {" "}
                    This activity will be reflected in your GitHub contribution
                    graph.{" "}
                  </p>
                  <p>
                    {" "}
                    Please note: artificially inflating your activity is morally
                    not correct.
                  </p>{" "}
                  <p>
                    {" "}
                    Proceed only if you are fully aware of what you're doing and
                    accept responsibility.{" "}
                  </p>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerClose className="mb-10">
              <Button
                variant="destructive"
                className="cursor-pointer active:scale-95 transition-all"
                onClick={() => setKnow(true)}
              >
                I know, I'm aware
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="w-full max-w-lg rounded-2xl shadow-xl p-8 border backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Date Selector</h2>
        <p className="text-muted-foreground mb-8 text-center text-sm">
          Select a mode and provide the required date(s) to do the work!!! data.
        </p>

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
                        <SelectItem value="range" disabled>
                          Date Range{" "}
                          <i className="text-muted-foreground text-sm">
                            (Coming Soon...)
                          </i>
                        </SelectItem>
                        <SelectItem value="year" disabled>
                          Year{" "}
                          <i className="text-muted-foreground text-sm">
                            (Coming Soon...)
                          </i>
                        </SelectItem>
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
                        min={2020}
                        max={today.getFullYear() - 1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all cursor-pointer text-lg font-semibold"
            >
              {isLoading ? <Loader2 /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Repo;
