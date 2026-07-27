"use client";

import { useState } from "react";

interface FlaggedClause {
  clauseTitle: string;
  originalText: string;
  riskLevel: "CRITICAL_VIOLATION" | "HIGH_RISK" | "FAIR_STANDARD";
  plainLanguageExplanation: string;
  localRightWarning: string;
  recommendation: string;
}

interface AuditResult {
  overallRiskScore: number;
  summary: string;
  flaggedClauses: FlaggedClause[];
  counterEmailDraft: string;
}

export default function Home() {
  const [leaseText, setLeaseText] = useState("");
  const [jurisdiction, setJurisdiction] = useState("California, USA");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!leaseText.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze-lease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leaseText, jurisdiction }),
      });

      // Check if response is HTML (server error page) instead of JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned an invalid response. Please check that .env.local is in the root folder and your OpenAI API key is valid."
        );
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case "CRITICAL_VIOLATION":
        return "bg-red-100 text-red-800 border-red-300";
      case "HIGH_RISK":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-slate-900 text-white py-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-xl font-bold">🛡️</div>
            <div>
              <h1 className="text-xl font-bold">RentShield AI</h1>
              <p className="text-xs text-slate-400">Tenant Rights Guard & Lease Auditor</p>
            </div>
          </div>
          <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-indigo-300">
            AI-Powered Legal Assist
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-2">Audit Your Lease</h2>
            <p className="text-sm text-slate-600 mb-4">
              Paste lease agreement text below to scan for predatory terms or illegal fee penalties.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                State / Jurisdiction
              </label>
              <input
                type="text"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                placeholder="e.g. California, New York, London UK"
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                Lease Agreement Text
              </label>
              <textarea
                rows={12}
                value={leaseText}
                onChange={(e) => setLeaseText(e.target.value)}
                placeholder="Paste clauses or full lease agreement here..."
                className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !leaseText.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Auditing Lease Document...</span>
              ) : (
                <span>🛡️ Run Tenant Audit</span>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </div>
        </section>

        <section className="md:col-span-7">
          {!result && !loading && (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="text-5xl mb-4 text-slate-300">📜</div>
              <h3 className="text-lg font-medium text-slate-700">No Lease Audited Yet</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1">
                Enter your lease clauses on the left and select your state to check for unfair terms or statutory violations.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="animate-spin text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-slate-700">Analyzing Terms & Local Tenant Laws</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1">
                Checking for deposit rules, landlord right-of-entry laws, notice requirements, and predatory fee structures...
              </p>
            </div>
          )}

          {result && (
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Lease Risk Index
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{result.summary}</p>
                </div>
                <div className="text-right pl-4">
                  <span className={`text-3xl font-extrabold ${result.overallRiskScore > 50 ? "text-red-600" : "text-emerald-600"}`}>
                    {result.overallRiskScore}/100
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Risk Score</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-md font-bold text-slate-800 mb-4">
                  Audit Breakdown ({result.flaggedClauses.length} Clauses Assessed)
                </h3>
                <div className="flex flex-col gap-4">
                  {result.flaggedClauses.map((clause, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-900">{clause.clauseTitle}</h4>
                        <span className={`text-xs px-2.5 py-1 rounded-md border font-bold ${getBadgeStyle(clause.riskLevel)}`}>
                          {clause.riskLevel.replace("_", " ")}
                        </span>
                      </div>
                      <blockquote className="text-xs italic bg-white p-2 rounded border border-slate-200 text-slate-600 mb-2 font-mono">
                        "{clause.originalText}"
                      </blockquote>
                      <div className="space-y-2 text-xs text-slate-700">
                        <p><strong>Plain English:</strong> {clause.plainLanguageExplanation}</p>
                        <p className="text-amber-800"><strong>Legal Protection Note:</strong> {clause.localRightWarning}</p>
                        <p className="text-indigo-700"><strong>Action Advice:</strong> {clause.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-md font-bold text-slate-800 mb-2">
                  ✍️ Landlord Counter-Negotiation Email
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Copy and send this professional draft to your prospective landlord before signing.
                </p>
                <textarea
                  readOnly
                  rows={8}
                  value={result.counterEmailDraft}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none"
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}