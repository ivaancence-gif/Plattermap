import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type NotificationType = "recipe_updates" | "new_features" | "weekly_recommendations";

export const useNotifications = () => {
  const { toast } = useToast();

  const sendNotification = async (
    userId: string,
    notificationType: NotificationType,
    subject: string,
    htmlContent: string
  ) => {
    try {
      const { data, error } = await supabase.functions.invoke("send-notification", {
        body: {
          userId,
          notificationType,
          subject,
          htmlContent,
        },
      });

      if (error) throw error;

      if (data.sent) {
        toast({
          title: "Notification Sent",
          description: "Email notification sent successfully",
        });
      } else {
        toast({
          title: "Notification Skipped",
          description: data.message,
        });
      }

      return data;
    } catch (error: any) {
      console.error("Error sending notification:", error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    sendNotification,
  };
};
