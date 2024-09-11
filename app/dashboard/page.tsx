"use client";

import { UserButton, useAuth, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getScripts, createNewScript } from "@/controllers/supabaseRequests";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import langs from "@/lib/langs";

export default function Dashboard() {
  const { userId, getToken } = useAuth();
  const [scripts, setScripts] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newScriptForm, setNewScriptForm] = useState({
    title: "",
    description: "",
    language: "",
    isPublic: false,
  });
  const [hasScriptLoaded, setHasScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadScripts = async () => {
      const token = await getToken({
        template: "supabase",
      });
      const scripts = await getScripts({ user_id: userId!, token });
      setScripts(scripts!);
      setHasScriptLoaded(true);
    };
    loadScripts();
  }, []);

  const createScript = async () => {
    try {
      const token = await getToken({
        template: "supabase",
      });
      const newScript = await createNewScript({
        user_id: userId!,
        token,
        ...newScriptForm,
      });

      setScripts([...scripts, newScript[0]]);
    } catch (error) {
      console.error("Error creating new script:", error);
      return;
    }
  };

  if (!userId) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-white text-2xl font-semibold">
          Please sign in to continue
        </h1>
      </div>
    );
  }

  return (
    <div className="dark:bg-background dark:text-foreground min-h-screen">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <CodeIcon className="h-6 w-6" />
                <span>Create New Script</span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Create a new code editor script.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="title">Title</Label>
            <Input
              required
              type="text"
              id="title"
              placeholder="Bubble Sort"
              className="w-full"
              onChange={(e) => {
                setNewScriptForm({ ...newScriptForm, title: e.target.value });
              }}
            />
            <Label htmlFor="description">Description</Label>
            <Input
              required
              type="text"
              id="description"
              placeholder="Sorts an array of numbers."
              className="w-full"
              onChange={(e) => {
                setNewScriptForm({
                  ...newScriptForm,
                  description: e.target.value,
                });
              }}
            />
            <Label htmlFor="language">Language</Label>
            <Select
              required
              onValueChange={(value) => {
                setNewScriptForm({ ...newScriptForm, language: value });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {langs.map((lang) => {
                  return (
                    <SelectItem key={lang.name} value={lang.name}>
                      {lang.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={createScript}>
              <span>Create Script</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="p-6 md:p-10">
        <div className="flex items-center justify-between mb-6 h-">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <ClerkLoading>
            <Skeleton className="w-12 h-12 rounded-full" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-12 h-12",
                },
              }}
            />
          </ClerkLoaded>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New Script
          </Button>
        </div>
        <div className="grid gap-6">
          <Card className="bg-card dark:bg-card-dark">
            <CardHeader>
              <CardTitle>Your Scripts</CardTitle>
              <CardDescription>
                Manage your code editor scripts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hasScriptLoaded ? (
                    scripts ? (
                      scripts.map((script) => {
                        return (
                          <TableRow key={script.id}>
                            <TableCell>
                              <div className="font-medium">{script.title}</div>
                              <div className="text-muted-foreground text-sm">
                                {script.description}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground text-sm">
                                {new Date(script.last_modified).toDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Link href={`/edit/${script.id}`}>
                                    <FilePenIcon className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <ShareIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : null
                  ) : (
                    <TableRow>
                      <TableCell>
                        <Skeleton className="w-3/4 h-[40px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-[100px] h-[40px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-[100px] h-[40px]" />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ShareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
