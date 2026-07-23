import React from "react";
import { channelLabel, statusLabel } from "./amplifyData";
import { SharePack } from "./amplifyTypes";

interface AmplifyPackDrawerProps {
  pack: SharePack | null;
  onClose: () => void;
  onSend: (pack: SharePack) => void;
  onApprove: (pack: SharePack) => void;
}

export const AmplifyPackDrawer: React.FC<AmplifyPackDrawerProps> = ({
  pack,
  onClose,
  onSend,
  onApprove,
}) => {
  if (!pack) return null;

  return (
    <>
      <button type="button" className="ap-drawer-backdrop" aria-label="Close drawer" onClick={onClose} />
      <aside className="ap-drawer" role="dialog" aria-modal="true" aria-labelledby="ap-drawer-title">
        <header className="ap-drawer__header">
          <div>
            <span className={`ap-badge ap-badge--${pack.status}`}>{statusLabel[pack.status]}</span>
            <h2 id="ap-drawer-title">{pack.title}</h2>
          </div>
          <button type="button" className="ap-drawer__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="ap-drawer__body">
          <div className="ap-drawer__media">
            <img src={pack.thumbnailUrl} alt="" />
          </div>

          {pack.metrics && (
            <div className="ap-drawer__section">
              <h3>Results</h3>
              <div className="ap-metrics-strip">
                <div>
                  <strong>{pack.metrics.shares}</strong>
                  <span>Shares</span>
                </div>
                <div>
                  <strong>{pack.metrics.clicks}</strong>
                  <span>Clicks</span>
                </div>
                <div>
                  <strong>{pack.metrics.applications}</strong>
                  <span>Apps</span>
                </div>
                <div>
                  <strong>${(pack.metrics.emvUsd / 1000).toFixed(1)}k</strong>
                  <span>EMV</span>
                </div>
              </div>
            </div>
          )}

          <div className="ap-drawer__section">
            <h3>Captions ({pack.captions.length})</h3>
            <ul className="ap-caption-list">
              {pack.captions.map((caption) => (
                <li key={caption.id}>{caption.text}</li>
              ))}
            </ul>
          </div>

          <div className="ap-drawer__section">
            <h3>Mandatory hiring CTA</h3>
            <p>
              <strong>{pack.ctaLabel}</strong>
            </p>
            <p>{pack.ctaDestination}</p>
            <p className="ap-utm">{pack.utmPreview}</p>
          </div>

          <div className="ap-drawer__section">
            <h3>Audience</h3>
            <p>
              {pack.audienceLabel} · {pack.audienceCount} employees
            </p>
            <p style={{ marginTop: 6 }}>
              Channels: {pack.channels.map((channel) => channelLabel[channel]).join(", ")}
            </p>
          </div>

          <div className="ap-drawer__section">
            <h3>Source</h3>
            <p>{pack.sourceLabel}</p>
          </div>
        </div>

        <footer className="ap-drawer__footer">
          {pack.status === "needs_approval" && (
            <button type="button" className="cs-btn cs-btn--primary" onClick={() => onApprove(pack)}>
              Approve pack
            </button>
          )}
          {(pack.status === "ready" || pack.status === "needs_approval") && (
            <button type="button" className="cs-btn cs-btn--primary" onClick={() => onSend(pack)}>
              Send pack
            </button>
          )}
          <button type="button" className="cs-btn cs-btn--secondary" onClick={onClose}>
            Close
          </button>
        </footer>
      </aside>
    </>
  );
};
