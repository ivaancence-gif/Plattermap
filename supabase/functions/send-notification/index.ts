import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  userId: string;
  notificationType: "recipe_updates" | "new_features" | "weekly_recommendations";
  subject: string;
  htmlContent: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[SEND-NOTIFICATION] Function started");

    const { userId, notificationType, subject, htmlContent }: NotificationRequest = await req.json();

    if (!userId || !notificationType || !subject || !htmlContent) {
      console.error("[SEND-NOTIFICATION] Missing required parameters");
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[SEND-NOTIFICATION] Processing notification for user ${userId}, type: ${notificationType}`);

    // Create Supabase client with service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch user profile and preferences
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("[SEND-NOTIFICATION] Error fetching user profile:", profileError);
      return new Response(
        JSON.stringify({ error: "User not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[SEND-NOTIFICATION] Found user email: ${profile.email}`);

    // Fetch user preferences
    const { data: preferences, error: preferencesError } = await supabase
      .from("user_preferences")
      .select("email_recipe_updates, email_new_features, email_weekly_recommendations")
      .eq("user_id", userId)
      .single();

    if (preferencesError) {
      console.error("[SEND-NOTIFICATION] Error fetching preferences:", preferencesError);
      // Default to sending if preferences not found
    }

    // Check if user has opted in for this notification type
    let isOptedIn = true;
    if (preferences) {
      if (notificationType === "recipe_updates") {
        isOptedIn = preferences.email_recipe_updates ?? true;
      } else if (notificationType === "new_features") {
        isOptedIn = preferences.email_new_features ?? true;
      } else if (notificationType === "weekly_recommendations") {
        isOptedIn = preferences.email_weekly_recommendations ?? true;
      }
    }

    if (!isOptedIn) {
      console.log(`[SEND-NOTIFICATION] User has opted out of ${notificationType} notifications`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "User has opted out of this notification type",
          sent: false 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("[SEND-NOTIFICATION] User is opted in, sending email...");

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "PlatterMap <onboarding@resend.dev>",
      to: [profile.email],
      subject: subject,
      html: htmlContent,
    });

    console.log("[SEND-NOTIFICATION] Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: true,
        response: emailResponse 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("[SEND-NOTIFICATION] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
