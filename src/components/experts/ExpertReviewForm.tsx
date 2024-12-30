import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StarRating } from "./StarRating";

interface ExpertReviewFormProps {
  expertId: string;
}

interface ReviewFormData {
  rating: number;
  comment: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

export function ExpertReviewForm({ expertId }: ExpertReviewFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<ReviewFormData>();

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setIsSubmitting(true);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        toast({
          title: "Fehler",
          description: "Sie müssen angemeldet sein, um eine Bewertung abzugeben.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('expert_reviews')
        .insert({
          expert_id: expertId,
          reviewer_profile_id: session.session.user.id,
          rating: data.rating,
          comment: data.comment,
          is_anonymous: data.isAnonymous,
          is_public: data.isPublic,
        });

      if (error) throw error;

      toast({
        title: "Erfolg",
        description: "Ihre Bewertung wurde erfolgreich gespeichert.",
      });

      reset();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Fehler",
        description: "Ihre Bewertung konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bewertung abgeben</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Bewertung
            </label>
            <StarRating
              onChange={(rating) => setValue('rating', rating)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Kommentar
            </label>
            <Textarea
              {...register('comment')}
              placeholder="Schreiben Sie hier Ihre Bewertung..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                {...register('isAnonymous')}
                id="anonymous"
              />
              <label
                htmlFor="anonymous"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Anonym
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                {...register('isPublic')}
                id="public"
              />
              <label
                htmlFor="public"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Öffentlich
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wird gespeichert..." : "Bewertung abschicken"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}