import React, { useEffect, useMemo, useState } from "react";
import "../CampaignStudio.css";
import "../ContentBoard/ContentBoard.css";
import "./AmplifyPreview.css";
import {
  channelLabel,
  demoImpactSummary,
  demoSharePacks,
  statusLabel,
} from "./amplifyData";
import { AmplifyDispatchWizard } from "./AmplifyDispatchWizard";
import { AmplifyPackDrawer } from "./AmplifyPackDrawer";
import { CampaignStudioSubNav } from "../ContentBoard/CampaignStudioSubNav";
import { AmplifyMode, SharePack, SharePackStatus } from "./amplifyTypes";

const barHeights = [28, 42, 36, 58, 48, 72, 64, 80, 70, 88, 76, 92];

export const AmplifyPreviewPage: React.FC = () => {
  const [mode, setMode] = useState<AmplifyMode>("packs");
  const [packs, setPacks] = useState<SharePack[]>(demoSharePacks);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activePackId, setActivePackId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<SharePackStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const activePack = packs.find((pack) => pack.id === activePackId) || null;
  const needsApprovalCount = packs.filter((pack) => pack.status === "needs_approval").length;

  const filteredPacks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return packs.filter((pack) => {
      if (statusFilter !== "all" && pack.status !== statusFilter) return false;
      if (!query) return true;
      return (
        pack.title.toLowerCase().includes(query) ||
        pack.subtitle.toLowerCase().includes(query) ||
        pack.audienceLabel.toLowerCase().includes(query)
      );
    });
  }, [packs, search, statusFilter]);

  useEffect(() => {
    if (!toast) return undefined;
    const handle = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(handle);
  }, [toast]);

  const showToast = (message: string) => setToast(message);

  const toggleSelected = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updatePack = (id: string, patch: Partial<SharePack>) => {
    setPacks((prev) => prev.map((pack) => (pack.id === id ? { ...pack, ...patch } : pack)));
  };

  const handleApprove = (pack: SharePack) => {
    updatePack(pack.id, { status: "ready" });
    showToast(`Approved “${pack.title}”`);
  };

  const handleSend = (pack: SharePack) => {
    updatePack(pack.id, {
      status: "sent",
      sentAt: new Date().toISOString(),
      metrics: pack.metrics || { shares: 0, clicks: 0, applications: 0, emvUsd: 0 },
    });
    setActivePackId(null);
    setSelectedIds((prev) => prev.filter((id) => id !== pack.id));
    showToast(`Sent “${pack.title}” to ${pack.audienceCount} employees`);
  };

  const handleBulkApprove = () => {
    setPacks((prev) =>
      prev.map((pack) =>
        selectedIds.includes(pack.id) && pack.status === "needs_approval"
          ? { ...pack, status: "ready" }
          : pack
      )
    );
    showToast(`Approved ${selectedIds.length} pack(s)`);
    setSelectedIds([]);
  };

  const handleBulkSend = () => {
    const now = new Date().toISOString();
    setPacks((prev) =>
      prev.map((pack) =>
        selectedIds.includes(pack.id) && (pack.status === "ready" || pack.status === "needs_approval")
          ? {
              ...pack,
              status: "sent",
              sentAt: now,
              metrics: pack.metrics || { shares: 0, clicks: 0, applications: 0, emvUsd: 0 },
            }
          : pack
      )
    );
    showToast(`Sent ${selectedIds.length} pack(s)`);
    setSelectedIds([]);
  };

  const handleDispatchSend = (pack: SharePack) => {
    setPacks((prev) => [pack, ...prev]);
    setMode("packs");
    showToast(`Dispatched “${pack.title}”`);
  };

  return (
    <main className="campaign-studio content-board amplify-preview">
      <header className="cs-page-header cb-page-header">
        <div>
          <h1>Social Media Advisor</h1>
          <CampaignStudioSubNav />
        </div>
      </header>

      <section className="cb-toolbar">
        <div className="cb-toolbar__main">
          <div className="cb-toolbar__title-block">
            <div className="cb-toolbar__title-row">
              <h2>Amplify</h2>
              {needsApprovalCount > 0 && (
                <span className="cb-toolbar__badge">{needsApprovalCount} to approve</span>
              )}
            </div>
            <p>Turn approved stories into employee share packs — then measure organic reach.</p>
          </div>
          <div className="cb-toolbar__actions">
            {mode !== "dispatch" && (
              <button
                type="button"
                className="cs-btn cs-btn--primary"
                onClick={() => setMode("dispatch")}
              >
                New share pack
              </button>
            )}
          </div>
        </div>

        <div className="ap-mode-switch" role="tablist" aria-label="Amplify views">
          {(
            [
              ["packs", "Share Packs"],
              ["dispatch", "Dispatch"],
              ["impact", "Impact"],
            ] as [AmplifyMode, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              className={`ap-mode-switch__btn${mode === id ? " is-active" : ""}`}
              onClick={() => setMode(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {mode === "packs" && (
        <>
          <div className="ap-filters">
            <label>
              Status
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as SharePackStatus | "all")
                }
              >
                <option value="all">All</option>
                <option value="needs_approval">Needs approval</option>
                <option value="ready">Ready</option>
                <option value="sent">Sent</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="ap-filters__search">
              Search
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pack, audience…"
              />
            </label>
          </div>

          <div className="ap-pack-grid">
            {filteredPacks.map((pack) => {
              const selected = selectedIds.includes(pack.id);
              return (
                <article
                  key={pack.id}
                  className={`ap-pack-card${selected ? " is-selected" : ""}`}
                  onClick={() => setActivePackId(pack.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActivePackId(pack.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ap-pack-card__media">
                    <img src={pack.thumbnailUrl} alt="" />
                    <input
                      className="ap-pack-card__check"
                      type="checkbox"
                      checked={selected}
                      aria-label={`Select ${pack.title}`}
                      onClick={(event) => toggleSelected(pack.id, event)}
                      onChange={() => undefined}
                    />
                  </div>
                  <div className="ap-pack-card__body">
                    <span className={`ap-badge ap-badge--${pack.status}`}>
                      {statusLabel[pack.status]}
                    </span>
                    <h3>{pack.title}</h3>
                    <p className="ap-pack-card__sub">{pack.subtitle}</p>
                    <p className="ap-pack-card__meta">
                      {pack.audienceCount} · {pack.channels.map((c) => channelLabel[c]).join(", ")}
                      <br />
                      CTA: {pack.ctaLabel}
                      {pack.metrics ? (
                        <>
                          <br />
                          {pack.metrics.shares} shares · {pack.metrics.clicks} clicks
                        </>
                      ) : null}
                    </p>
                    <div className="ap-pack-card__actions">
                      {pack.status === "needs_approval" ? (
                        <button
                          type="button"
                          className="cs-btn cs-btn--primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleApprove(pack);
                          }}
                        >
                          Review
                        </button>
                      ) : pack.status === "ready" ? (
                        <button
                          type="button"
                          className="cs-btn cs-btn--primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleSend(pack);
                          }}
                        >
                          Send
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="cs-btn cs-btn--secondary"
                          onClick={(event) => {
                            event.stopPropagation();
                            setActivePackId(pack.id);
                          }}
                        >
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {selectedIds.length > 0 && (
            <div className="ap-bulk-bar">
              <p>
                <strong>{selectedIds.length}</strong> selected
              </p>
              <div className="ap-bulk-bar__actions">
                <button type="button" className="cs-btn cs-btn--secondary" onClick={handleBulkApprove}>
                  Approve
                </button>
                <button type="button" className="cs-btn cs-btn--primary" onClick={handleBulkSend}>
                  Send via Email
                </button>
                <button
                  type="button"
                  className="cs-btn cs-btn--ghost"
                  onClick={() => setSelectedIds([])}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {mode === "dispatch" && (
        <AmplifyDispatchWizard onCancel={() => setMode("packs")} onSend={handleDispatchSend} />
      )}

      {mode === "impact" && <ImpactView />}

      <AmplifyPackDrawer
        pack={activePack}
        onClose={() => setActivePackId(null)}
        onApprove={handleApprove}
        onSend={handleSend}
      />

      {toast && (
        <div className="cb-toast" role="status">
          <span className="cb-toast__check" aria-hidden="true">
            ✓
          </span>
          {toast}
        </div>
      )}
    </main>
  );
};

const ImpactView: React.FC = () => {
  const summary = demoImpactSummary;

  return (
    <section className="ap-impact">
      <div className="ap-kpi-grid">
        <div className="ap-kpi">
          <span>Shares</span>
          <strong>{summary.shares.toLocaleString()}</strong>
          <small>{summary.sharesDeltaLabel}</small>
        </div>
        <div className="ap-kpi">
          <span>Career site clicks</span>
          <strong>{summary.clicks.toLocaleString()}</strong>
        </div>
        <div className="ap-kpi">
          <span>Apps attributed</span>
          <strong>{summary.applications.toLocaleString()}</strong>
        </div>
        <div className="ap-kpi">
          <span>EMV</span>
          <strong>${(summary.emvUsd / 1000).toFixed(1)}k</strong>
          <small>vs paid social</small>
        </div>
      </div>

      <div className="ap-impact-panels">
        <div className="ap-panel">
          <h3>Share velocity</h3>
          <div className="ap-bars" aria-hidden="true">
            {barHeights.map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
        <div className="ap-panel">
          <h3>Top packs</h3>
          <ul className="ap-top-list">
            {summary.topPacks.map((pack, index) => (
              <li key={pack.id}>
                <span>
                  {index + 1}. {pack.title}
                </span>
                <strong>{pack.clicks} clk</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Pack</th>
              <th>Channel</th>
              <th>Clicks</th>
              <th>Apps</th>
              <th>Last share</th>
            </tr>
          </thead>
          <tbody>
            {summary.rows.map((row) => (
              <tr key={`${row.employee}-${row.packTitle}`}>
                <td>{row.employee}</td>
                <td>{row.packTitle}</td>
                <td>{channelLabel[row.channel]}</td>
                <td>{row.clicks}</td>
                <td>{row.apps}</td>
                <td>{row.lastShare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
