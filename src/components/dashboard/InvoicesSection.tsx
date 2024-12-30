import { useEffect, useState } from "react";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Invoice = Tables<"invoices">;

export const InvoicesSection = ({
  profile,
}: {
  profile: Tables<"profiles"> | null;
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!profile) return;

      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("year", { ascending: false });

      if (error) {
        toast({
          title: "Fehler",
          description: "Rechnungen konnten nicht geladen werden",
          variant: "destructive",
        });
        return;
      }

      setInvoices(data || []);
    };

    fetchInvoices();
  }, [profile, toast]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("de-CH");
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">Rechnungen</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jahr</TableHead>
            <TableHead>Betrag</TableHead>
            <TableHead>Fälligkeitsdatum</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Keine Rechnungen vorhanden
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.year}</TableCell>
                <TableCell>{formatAmount(Number(invoice.amount))}</TableCell>
                <TableCell>{formatDate(invoice.due_date)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {invoice.status === "paid" ? "Bezahlt" : "Ausstehend"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};