// src/components/PaymentSubmitForm.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Loader2,
  Send,
  Receipt,
  QrCode,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PaymentRequest {
  id: string;
  amount: number;
  creditsRequested: number;
  transactionId: string;
  paymentMethod: string;
  paymentDate: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  rejectionReason?: string;
}

export function PaymentSubmitForm() {
  const { data: session, status: authStatus } = useSession();

  const [amount, setAmount] = useState<string>("50");
  const [transactionId, setTransactionId] = useState<string>("");
  const paymentMethod = "GPay";
  const [paymentDate, setPaymentDate] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [history, setHistory] = useState<PaymentRequest[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  const upiId = "satendrakumarparteti@oksbi";

  const fetchHistory = useCallback(async () => {
    if (!session?.user) return;
    try {
      setLoadingHistory(true);
      const res = await fetch("/api/payments/history");
      const data = await res.json();
      if (data.success && Array.isArray(data.requests)) {
        setHistory(data.requests);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  }, [session?.user]);

  useEffect(() => {
    if (session?.user) {
      fetchHistory();
    }
  }, [session?.user, fetchHistory]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!session?.user) {
      setErrorMsg("Please log in with GitHub first to submit payment details.");
      return;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount < 1) {
      setErrorMsg("Please enter a valid amount (minimum ₹1).");
      return;
    }

    if (!transactionId.trim() || transactionId.trim().length < 4) {
      setErrorMsg("Please enter your 12-digit UPI Reference Number / Transaction ID.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/payments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numAmount,
          transactionId: transactionId.trim(),
          paymentMethod,
          paymentDate,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit payment details.");
      }

      setSuccessMsg("Details submitted! Credits will be added once approved by admin.");
      setTransactionId("");
      setNotes("");
      fetchHistory();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 mt-12">
      {/* Container Card */}
      <div className="rounded-2xl border border-emerald-500/20 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                <Receipt className="w-3 h-3 mr-1" />
                Step 2 of 2
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">Instant Admin Approval Queue</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Submit GPay Payment Details
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Paid via <strong className="text-foreground">Google Pay (GPay)</strong> to <span className="font-mono text-emerald-400 font-semibold">{upiId}</span>? Paste your transaction details below for quick verification.
            </p>
          </div>

          {/* Copy UPI Box */}
          <button
            type="button"
            onClick={handleCopyUpi}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border/80 bg-background/80 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition text-xs font-mono group"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span className="font-medium text-foreground">{upiId}</span>
            {copiedUpi ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-400 transition" />
            )}
          </button>
        </div>

        {/* Not Logged In Notice */}
        {authStatus !== "loading" && !session?.user && (
          <div className="my-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>
              You must be logged in with your GitHub account so credits can be deposited to your profile.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          {/* Quick Amount Packs */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
              Select Amount Paid (₹1 = 1 Credit)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { val: "50", credits: "50 Credits", commits: "150 commits" },
                { val: "100", credits: "100 Credits", commits: "300 commits" },
                { val: "350", credits: "350 Credits", commits: "~1,000 commits" },
                { val: "500", credits: "500 Credits", commits: "1,500 commits" },
              ].map((pack) => {
                const isSelected = amount === pack.val;
                return (
                  <button
                    key={pack.val}
                    type="button"
                    onClick={() => setAmount(pack.val)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/15 shadow-md shadow-emerald-500/10"
                        : "border-border/70 bg-background/50 hover:border-border hover:bg-background/80"
                    }`}
                  >
                    <div className="text-base font-bold text-foreground">₹{pack.val}</div>
                    <div className="text-xs font-semibold text-emerald-400 font-mono mt-0.5">
                      {pack.credits}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{pack.commits}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Custom Amount */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Amount Paid (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="50"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="50"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-border/80 bg-background/70 font-mono text-sm text-foreground focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 font-mono">
                Will credit: <strong className="text-emerald-400">{Math.floor(Number(amount) || 0)} Credits</strong> ({Math.floor(Number(amount) || 0) * 3} Commits)
              </p>
            </div>

            {/* Payment Method - GPay Only */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Payment Method
                </label>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  GPay Only
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 font-mono text-sm text-foreground">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-emerald-400">Google Pay (GPay)</span>
                <span className="text-xs text-muted-foreground ml-auto font-sans">Only supported method</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* UTR / Transaction ID */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                UPI Ref / UTR / Transaction ID *
              </label>
              <input
                type="text"
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. 429812938102 or T2410..."
                className="w-full px-3 py-2.5 rounded-xl border border-border/80 bg-background/70 font-mono text-sm text-foreground focus:outline-none focus:border-emerald-500 transition"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Found in your UPI app receipt as &quot;UPI Ref No.&quot; or &quot;UTR&quot;.
              </p>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Payment Date
              </label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/80 bg-background/70 font-mono text-sm text-foreground focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Additional Note / Screenshot Link (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Sent from Google Pay account of Satendra"
              className="w-full px-3 py-2.5 rounded-xl border border-border/80 bg-background/70 text-sm text-foreground focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !session?.user}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting for Verification...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Payment for Approval</span>
              </>
            )}
          </Button>
        </form>

        {/* User's Previous Submissions */}
        {session?.user && (
          <div className="mt-10 pt-8 border-t border-border/60 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Your Payment Submissions</span>
              </h4>
              <button
                type="button"
                onClick={fetchHistory}
                disabled={loadingHistory}
                className="text-xs text-muted-foreground hover:text-emerald-400 transition font-mono"
              >
                {loadingHistory ? "Refreshing..." : "Refresh Status"}
              </button>
            </div>

            {loadingHistory && history.length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2 text-emerald-400" />
                Loading your submitted requests...
              </div>
            ) : history.length === 0 ? (
              <div className="text-xs text-muted-foreground/80 p-4 rounded-xl bg-background/40 border border-border/40 text-center">
                No payment requests submitted yet. After paying via UPI, submit the details above.
              </div>
            ) : (
              <div className="space-y-2.5">
                {history.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-xl border border-border/70 bg-background/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">₹{req.amount}</span>
                        <span className="text-emerald-400 font-mono">({req.creditsRequested} Credits)</span>
                        <span className="text-muted-foreground font-mono">• {req.paymentMethod}</span>
                      </div>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        UTR: <span className="text-foreground select-all">{req.transactionId}</span> • Date: {req.paymentDate}
                      </div>
                      {req.rejectionReason && (
                        <div className="text-[11px] text-red-400 font-medium">
                          Reason: {req.rejectionReason}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {req.status === "pending" && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 bg-yellow-500/10 font-mono">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Approval
                        </Badge>
                      )}
                      {req.status === "approved" && (
                        <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-mono">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Approved & Credited
                        </Badge>
                      )}
                      {req.status === "rejected" && (
                        <Badge variant="outline" className="text-red-400 border-red-500/30 bg-red-500/10 font-mono">
                          <XCircle className="w-3 h-3 mr-1" />
                          Rejected
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
