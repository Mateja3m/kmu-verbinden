import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ExpertSubmissionForm } from "@/components/experts/ExpertSubmissionForm";

export default function ExpertSubmission() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
              Werden Sie Teil des KMU Expertenrats
            </h1>
            <p className="text-lg text-gray-600">
              Teilen Sie Ihr Fachwissen mit Schweizer KMUs und werden Sie Teil unseres exklusiven Expertennetzwerks.
            </p>
          </div>
          
          <div className="bg-white shadow-xl rounded-lg p-8">
            <ExpertSubmissionForm />
          </div>
        </div>
      </main>
    </div>
  );
}