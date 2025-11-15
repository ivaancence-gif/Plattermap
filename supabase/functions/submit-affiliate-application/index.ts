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

interface AffiliateApplication {
  name: string;
  email: string;
  website: string;
  audience?: string;
  message?: string;
}

// Validation regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/;

const validateApplication = (data: AffiliateApplication): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.push("Name is required");
  } else if (data.name.length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.push("Email is required");
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push("Invalid email address");
  } else if (data.email.length > 255) {
    errors.push("Email must be less than 255 characters");
  }

  // Validate website
  if (!data.website || data.website.trim().length === 0) {
    errors.push("Website URL is required");
  } else if (!URL_REGEX.test(data.website)) {
    errors.push("Invalid website URL (must start with http:// or https://)");
  } else if (data.website.length > 500) {
    errors.push("Website URL must be less than 500 characters");
  }

  // Validate optional fields
  if (data.audience && data.audience.length > 200) {
    errors.push("Audience description must be less than 200 characters");
  }

  if (data.message && data.message.length > 2000) {
    errors.push("Message must be less than 2000 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[AFFILIATE-APPLICATION] Function started");

    const applicationData: AffiliateApplication = await req.json();

    // Validate input
    const validation = validateApplication(applicationData);
    if (!validation.valid) {
      console.error("[AFFILIATE-APPLICATION] Validation failed:", validation.errors);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: validation.errors 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("[AFFILIATE-APPLICATION] Validation passed");

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Sanitize and prepare data
    const sanitizedData = {
      name: applicationData.name.trim(),
      email: applicationData.email.trim().toLowerCase(),
      website: applicationData.website.trim(),
      audience: applicationData.audience?.trim() || null,
      message: applicationData.message?.trim() || null,
    };

    // Store application in database
    const { data: application, error: dbError } = await supabase
      .from("affiliate_applications")
      .insert(sanitizedData)
      .select()
      .single();

    if (dbError) {
      console.error("[AFFILIATE-APPLICATION] Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save application" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("[AFFILIATE-APPLICATION] Application saved:", application.id);

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "Recipe Book <onboarding@resend.dev>",
        to: [sanitizedData.email],
        subject: "Affiliate Application Received - Recipe Book",
        html: `
          <h1>Thank you for your interest!</h1>
          <p>Dear ${sanitizedData.name},</p>
          <p>We've received your affiliate program application and will review it within 2-3 business days.</p>
          <h3>Application Details:</h3>
          <ul>
            <li><strong>Website:</strong> ${sanitizedData.website}</li>
            ${sanitizedData.audience ? `<li><strong>Audience:</strong> ${sanitizedData.audience}</li>` : ''}
          </ul>
          <p>We'll be in touch soon!</p>
          <br/>
          <p>Best regards,<br/>The Recipe Book Team</p>
        `,
      });
      console.log("[AFFILIATE-APPLICATION] Confirmation email sent to applicant");
    } catch (emailError) {
      console.error("[AFFILIATE-APPLICATION] Failed to send confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    // Send notification email to admin (optional)
    try {
      await resend.emails.send({
        from: "Recipe Book <onboarding@resend.dev>",
        to: ["admin@recipebook.com"], // Replace with your admin email
        subject: "New Affiliate Application",
        html: `
          <h1>New Affiliate Application</h1>
          <h3>Applicant Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${sanitizedData.name}</li>
            <li><strong>Email:</strong> ${sanitizedData.email}</li>
            <li><strong>Website:</strong> ${sanitizedData.website}</li>
            ${sanitizedData.audience ? `<li><strong>Audience:</strong> ${sanitizedData.audience}</li>` : ''}
          </ul>
          ${sanitizedData.message ? `<p><strong>Message:</strong><br/>${sanitizedData.message}</p>` : ''}
          <p>Application ID: ${application.id}</p>
        `,
      });
      console.log("[AFFILIATE-APPLICATION] Admin notification sent");
    } catch (emailError) {
      console.error("[AFFILIATE-APPLICATION] Failed to send admin notification:", emailError);
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        applicationId: application.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("[AFFILIATE-APPLICATION] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
