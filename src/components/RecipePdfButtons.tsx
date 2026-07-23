import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PdfRecipe, downloadRecipePdf, printRecipePdf } from "@/lib/recipePdf";
import { Capacitor } from "@capacitor/core";

interface RecipePdfButtonsProps {
  recipe: PdfRecipe;
  size?: "default" | "sm";
}

export const RecipePdfButtons = ({ recipe, size = "default" }: RecipePdfButtonsProps) => {
  const [busy, setBusy] = useState<"download" | "print" | null>(null);
  const isNative = Capacitor.isNativePlatform();

  const run = async (kind: "download" | "print") => {
    setBusy(kind);
    try {
      if (kind === "download") {
        await downloadRecipePdf(recipe);
        if (!isNative) toast.success("Recipe PDF downloaded");
      } else {
        await printRecipePdf(recipe);
      }
    } catch (e) {
      // User cancelling the native share sheet is not an error worth surfacing
      const msg = e instanceof Error ? e.message : "";
      if (!/cancel/i.test(msg)) toast.error("Could not create the PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={size}
        className="gap-2"
        disabled={busy !== null}
        onClick={() => run("download")}
      >
        {busy === "download" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isNative ? "Save / Share PDF" : "Download PDF"}
      </Button>
      {!isNative && (
        <Button
          variant="outline"
          size={size}
          className="gap-2"
          disabled={busy !== null}
          onClick={() => run("print")}
        >
          {busy === "print" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Printer className="w-4 h-4" />
          )}
          Print
        </Button>
      )}
    </div>
  );
};
