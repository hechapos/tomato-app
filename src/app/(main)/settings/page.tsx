"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarPicker } from "@/components/shared/avatar-picker";
import { toast } from "sonner";
import { User, Timer, BookOpen, Palette, Shield } from "lucide-react";

interface UserSettings {
  id: string;
  email: string;
  displayName: string | null;
  avatarPreset: string;
  pomodoroMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  newCardsPerDay: number;
  theme: string;
}

export default function SettingsPage() {
  const { update } = useSession();
  const { setTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Delete account
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/user/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load settings");
        setLoading(false);
      });
  }, []);

  const saveSettings = async (updates: Partial<UserSettings>) => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setSettings((prev) => (prev ? { ...prev, ...updates } : prev));

      if (updates.theme) {
        setTheme(updates.theme);
      }

      if (updates.displayName || updates.avatarPreset) {
        await update();
      }

      toast.success("Settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setChangingPassword(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to change password");
      }

      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete account");
      }

      toast.success("Account deleted");
      signOut({ callbackUrl: "/login" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete account");
      setDeleting(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 max-w-[600px]">
          <TabsTrigger value="profile" className="gap-1.5">
            <User className="h-4 w-4 hidden sm:block" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="timer" className="gap-1.5">
            <Timer className="h-4 w-4 hidden sm:block" />
            Timer
          </TabsTrigger>
          <TabsTrigger value="study" className="gap-1.5">
            <BookOpen className="h-4 w-4 hidden sm:block" />
            Study
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5">
            <Palette className="h-4 w-4 hidden sm:block" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-1.5">
            <Shield className="h-4 w-4 hidden sm:block" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Name</CardTitle>
                <CardDescription>
                  How you want to be called in the app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label htmlFor="displayName">Name</Label>
                    <Input
                      id="displayName"
                      value={settings.displayName || ""}
                      onChange={(e) =>
                        setSettings((prev) =>
                          prev ? { ...prev, displayName: e.target.value } : prev
                        )
                      }
                      placeholder="Your display name"
                      maxLength={30}
                    />
                  </div>
                  <Button
                    onClick={() =>
                      saveSettings({ displayName: settings.displayName || undefined })
                    }
                    disabled={saving}
                  >
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>
                  Choose your tomato avatar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AvatarPicker
                  value={settings.avatarPreset}
                  onChange={(value) => {
                    setSettings((prev) =>
                      prev ? { ...prev, avatarPreset: value } : prev
                    );
                    saveSettings({ avatarPreset: value });
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timer Tab */}
        <TabsContent value="timer">
          <Card>
            <CardHeader>
              <CardTitle>Timer Settings</CardTitle>
              <CardDescription>
                Configure your Pomodoro timer durations and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div>
                  <Label>Focus Duration: {settings.pomodoroMinutes} minutes</Label>
                  <Slider
                    value={[settings.pomodoroMinutes]}
                    onValueChange={([v]) =>
                      setSettings((prev) =>
                        prev ? { ...prev, pomodoroMinutes: v } : prev
                      )
                    }
                    min={5}
                    max={60}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                <div>
                  <Label>
                    Short Break: {settings.shortBreakMinutes} minutes
                  </Label>
                  <Slider
                    value={[settings.shortBreakMinutes]}
                    onValueChange={([v]) =>
                      setSettings((prev) =>
                        prev ? { ...prev, shortBreakMinutes: v } : prev
                      )
                    }
                    min={1}
                    max={15}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 min</span>
                    <span>15 min</span>
                  </div>
                </div>

                <div>
                  <Label>
                    Long Break: {settings.longBreakMinutes} minutes
                  </Label>
                  <Slider
                    value={[settings.longBreakMinutes]}
                    onValueChange={([v]) =>
                      setSettings((prev) =>
                        prev ? { ...prev, longBreakMinutes: v } : prev
                      )
                    }
                    min={5}
                    max={30}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5 min</span>
                    <span>30 min</span>
                  </div>
                </div>

                <div>
                  <Label>
                    Long Break After: {settings.longBreakInterval} pomodoros
                  </Label>
                  <Slider
                    value={[settings.longBreakInterval]}
                    onValueChange={([v]) =>
                      setSettings((prev) =>
                        prev ? { ...prev, longBreakInterval: v } : prev
                      )
                    }
                    min={2}
                    max={6}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>2</span>
                    <span>6</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-start Breaks</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start break timer after focus ends
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoStartBreaks}
                    onCheckedChange={(checked) =>
                      setSettings((prev) =>
                        prev ? { ...prev, autoStartBreaks: checked } : prev
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-start Pomodoros</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start focus timer after break ends
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoStartPomodoros}
                    onCheckedChange={(checked) =>
                      setSettings((prev) =>
                        prev ? { ...prev, autoStartPomodoros: checked } : prev
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound when timer completes
                    </p>
                  </div>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) =>
                      setSettings((prev) =>
                        prev ? { ...prev, soundEnabled: checked } : prev
                      )
                    }
                  />
                </div>
              </div>

              <Button
                onClick={() =>
                  saveSettings({
                    pomodoroMinutes: settings.pomodoroMinutes,
                    shortBreakMinutes: settings.shortBreakMinutes,
                    longBreakMinutes: settings.longBreakMinutes,
                    longBreakInterval: settings.longBreakInterval,
                    autoStartBreaks: settings.autoStartBreaks,
                    autoStartPomodoros: settings.autoStartPomodoros,
                    soundEnabled: settings.soundEnabled,
                  })
                }
                disabled={saving}
              >
                Save Timer Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Tab */}
        <TabsContent value="study">
          <Card>
            <CardHeader>
              <CardTitle>Study Settings</CardTitle>
              <CardDescription>
                Configure your daily study limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>
                  New Cards Per Day: {settings.newCardsPerDay}
                </Label>
                <Slider
                  value={[settings.newCardsPerDay]}
                  onValueChange={([v]) =>
                    setSettings((prev) =>
                      prev ? { ...prev, newCardsPerDay: v } : prev
                    )
                  }
                  min={5}
                  max={50}
                  step={5}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5 cards</span>
                  <span>50 cards</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Maximum number of new (unseen) cards to introduce each day
                </p>
              </div>

              <Button
                onClick={() =>
                  saveSettings({ newCardsPerDay: settings.newCardsPerDay })
                }
                disabled={saving}
              >
                Save Study Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Choose your preferred theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label>Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => {
                    setSettings((prev) =>
                      prev ? { ...prev, theme: value } : prev
                    );
                    saveSettings({ theme: value });
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{settings.email}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Min 8 chars, 1 uppercase, 1 number
                  </p>
                </div>
                <Button
                  onClick={handleChangePassword}
                  disabled={changingPassword || !currentPassword || !newPassword}
                >
                  {changingPassword ? "Changing..." : "Change Password"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Permanently delete your account and all data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete your account?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. All your data including
                        decks, review progress, and session history will be
                        permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                      <Label htmlFor="deletePassword">
                        Enter your password to confirm
                      </Label>
                      <Input
                        id="deletePassword"
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={deleting || !deletePassword}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting ? "Deleting..." : "Delete Account"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
