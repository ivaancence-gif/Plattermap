import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useNotifications } from "@/hooks/useNotifications";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Sun, Moon, Monitor, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { preferences, updatePreferences, loading } = useUserPreferences();
  const { sendNotification } = useNotifications();
  const { theme, setTheme } = useTheme();
  const [sendingTest, setSendingTest] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (preferences.theme && theme !== preferences.theme) {
      setTheme(preferences.theme);
    }
  }, [preferences.theme]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    updatePreferences({ theme: value as any });
  };

  const handleSendTestEmail = async () => {
    if (!user) return;
    
    setSendingTest(true);
    try {
      await sendNotification(
        user.id,
        "new_features",
        "Test Notification from Recipe Book",
        `
          <h1>Test Email</h1>
          <p>This is a test email to verify your notification settings are working correctly.</p>
          <p>If you received this email, your notification preferences are configured properly!</p>
          <br/>
          <p>Best regards,<br/>The Recipe Book Team</p>
        `
      );
    } catch (error) {
      console.error("Error sending test email:", error);
    } finally {
      setSendingTest(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading preferences...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the app looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger id="theme" className="bg-background">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Recipe Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Display</CardTitle>
              <CardDescription>
                Set your default preferences for viewing recipes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="view">Default View</Label>
                <Select
                  value={preferences.default_view}
                  onValueChange={(value) =>
                    updatePreferences({ default_view: value as any })
                  }
                >
                  <SelectTrigger id="view" className="bg-background">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How recipes should be displayed by default
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="servings">Default Servings</Label>
                <Select
                  value={preferences.default_servings.toString()}
                  onValueChange={(value) =>
                    updatePreferences({ default_servings: parseInt(value) })
                  }
                >
                  <SelectTrigger id="servings" className="bg-background">
                    <SelectValue placeholder="Select servings" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="1">1 serving</SelectItem>
                    <SelectItem value="2">2 servings</SelectItem>
                    <SelectItem value="4">4 servings</SelectItem>
                    <SelectItem value="6">6 servings</SelectItem>
                    <SelectItem value="8">8 servings</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Default number of servings for recipes
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Measurement Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Units & Measurements</CardTitle>
              <CardDescription>
                Choose your preferred measurement system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="units">Measurement Units</Label>
                <Select
                  value={preferences.measurement_unit}
                  onValueChange={(value) =>
                    updatePreferences({ measurement_unit: value as any })
                  }
                >
                  <SelectTrigger id="units" className="bg-background">
                    <SelectValue placeholder="Select units" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="metric">Metric (kg, g, ml)</SelectItem>
                    <SelectItem value="imperial">Imperial (lb, oz, cups)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Your preferred system for measurements
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Email Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Manage your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="recipe-updates">Recipe Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new recipes and recipe improvements
                  </p>
                </div>
                <Switch
                  id="recipe-updates"
                  checked={preferences.email_recipe_updates}
                  onCheckedChange={(checked) =>
                    updatePreferences({ email_recipe_updates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-features">New Features</Label>
                  <p className="text-sm text-muted-foreground">
                    Be the first to know about new features and updates
                  </p>
                </div>
                <Switch
                  id="new-features"
                  checked={preferences.email_new_features}
                  onCheckedChange={(checked) =>
                    updatePreferences({ email_new_features: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-recommendations">Weekly Recommendations</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized recipe recommendations every week
                  </p>
                </div>
                <Switch
                  id="weekly-recommendations"
                  checked={preferences.email_weekly_recommendations}
                  onCheckedChange={(checked) =>
                    updatePreferences({ email_weekly_recommendations: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Test Email Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Test Notifications
              </CardTitle>
              <CardDescription>
                Send a test email to verify your notification settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSendTestEmail} 
                disabled={sendingTest}
                className="w-full sm:w-auto"
              >
                {sendingTest ? "Sending..." : "Send Test Email"}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                This will send a test notification to your email address
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
