import React, { useState } from "react";
import jordanThumb from "../../../assets/campaign-studio/video-hub/vh-jordan-blake.jpg";
import { amplifyTemplates } from "./amplifyData";
import { AmplifyChannel, AmplifyTemplateId, SharePack } from "./amplifyTypes";

interface AmplifyDispatchWizardProps {
  onCancel: () => void;
  onSend: (pack: SharePack) => void;
}

const defaultCaptions = [
  "Proud of our Atlanta eng team — we’re hiring seniors who care about craft.",
  "We’re hiring — here’s why I stay building here.",
  "Know a strong engineer in Atlanta? Open roles on our team.",
  "Our Atlanta squad is growing. Apply if systems + impact excite you.",
  "Peer note: we’re looking for senior engineers who mentor as they ship.",
  "Join a team that ships thoughtfully. Sr Engineer roles open in Atlanta.",
];

export const AmplifyDispatchWizard: React.FC<AmplifyDispatchWizardProps> = ({ onCancel, onSend }) => {
  const [step, setStep] = useState(1);
  const [templateId, setTemplateId] = useState<AmplifyTemplateId | null>(null);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [ctaDestination, setCtaDestination] = useState("/careers/jobs/sr-engineer-atlanta");
  const [audience, setAudience] = useState("Atlanta Engineering · Senior+");
  const [channels, setChannels] = useState<AmplifyChannel[]>(["email"]);
  const [note, setNote] = useState("");

  const toggleChannel = (channel: AmplifyChannel) => {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((item) => item !== channel) : [...prev, channel]
    );
  };

  const finish = () => {
    const template = amplifyTemplates.find((item) => item.id === templateId);
    const now = new Date().toISOString();
    onSend({
      id: `pack-new-${Date.now()}`,
      title: template?.title || "New share pack",
      subtitle: "Pull · marketer dispatch",
      status: "sent",
      source: "pull_marketer",
      sourceLabel: `Pull · ${template?.title || "Custom"}`,
      audienceLabel: audience,
      audienceCount: 47,
      channels: channels.length ? channels : ["email"],
      thumbnailUrl: jordanThumb,
      ctaLabel: "Apply — Sr Engineer, Atlanta",
      ctaDestination,
      utmPreview:
        "?utm_source=advocacy&utm_medium=email&utm_campaign=dispatch-preview&utm_content={empId}",
      captions: defaultCaptions.map((text, index) => ({
        id: `new-c${index + 1}`,
        text,
      })),
      metrics: { shares: 0, clicks: 0, applications: 0, emvUsd: 0 },
      createdAt: now,
      sentAt: now,
    });
  };

  return (
    <section className="ap-dispatch">
      <div className="ap-steps" aria-label="Dispatch steps">
        <span className={step >= 1 ? (step === 1 ? "is-active" : "is-done") : undefined}>
          1 Template
        </span>
        <span className={step >= 2 ? (step === 2 ? "is-active" : "is-done") : undefined}>
          2 Content
        </span>
        <span className={step >= 3 ? (step === 3 ? "is-active" : "is-done") : undefined}>
          3 Audience
        </span>
        <span className={step === 4 ? "is-active" : undefined}>4 Send</span>
      </div>

      {step === 1 && (
        <>
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>Choose a template</h3>
          <div className="ap-template-grid">
            {amplifyTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                className={`ap-template-card${templateId === template.id ? " is-selected" : ""}`}
                onClick={() => setTemplateId(template.id)}
              >
                <strong>{template.title}</strong>
                <p>{template.description}</p>
              </button>
            ))}
          </div>
          <div className="ap-dispatch__footer">
            <button type="button" className="cs-btn cs-btn--secondary" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              className="cs-btn cs-btn--primary"
              disabled={!templateId}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="ap-dispatch-grid">
            <div>
              <div className="ap-field">
                <span>Assets</span>
                <p style={{ margin: 0, fontSize: 13, color: "#637085" }}>
                  Bound from Video Hub / campaign preview media.
                </p>
                <img
                  src={jordanThumb}
                  alt=""
                  style={{
                    marginTop: 8,
                    width: "100%",
                    maxWidth: 280,
                    borderRadius: 8,
                    aspectRatio: "16 / 10",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="ap-field">
                <span>Captions (AI · anti-spam)</span>
                <div className="ap-caption-pick">
                  {defaultCaptions.map((text, index) => (
                    <label key={text} className={captionIndex === index ? "is-selected" : undefined}>
                      <input
                        type="radio"
                        name="caption"
                        checked={captionIndex === index}
                        onChange={() => setCaptionIndex(index)}
                      />
                      <span>{text}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="ap-field">
                <span>Mandatory hiring CTA *</span>
                <select
                  value={ctaDestination}
                  onChange={(event) => setCtaDestination(event.target.value)}
                >
                  <option value="/careers/jobs/sr-engineer-atlanta">
                    Job req · Sr Engineer Atlanta
                  </option>
                  <option value="/careers/engineering">Department page · Engineering</option>
                  <option value="/careers/talent-community">Talent community</option>
                </select>
                <p className="ap-utm">
                  ?utm_source=advocacy&utm_medium=email&utm_campaign=dispatch-preview&utm_content=
                  {"{empId}"}
                </p>
              </div>
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#464f5e",
                }}
              >
                Share card preview
              </span>
              <div className="ap-preview-card">
                <img src={jordanThumb} alt="" />
                <p>{defaultCaptions[captionIndex]}</p>
                <span className="ap-preview-card__cta">Apply — Sr Engineer, Atlanta</span>
              </div>
            </div>
          </div>
          <div className="ap-dispatch__footer">
            <button type="button" className="cs-btn cs-btn--secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className="cs-btn cs-btn--primary" onClick={() => setStep(3)}>
              Continue
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="ap-field">
            <span>Audience segment</span>
            <select value={audience} onChange={(event) => setAudience(event.target.value)}>
              <option>Atlanta Engineering · Senior+</option>
              <option>Sales Management</option>
              <option>Nursing · Mentors</option>
              <option>Sustainability ERG</option>
            </select>
            <p style={{ margin: 0, fontSize: 13, color: "#637085" }}>Est. 47 employees</p>
          </div>

          <div className="ap-field">
            <span>Channels</span>
            <div className="ap-check-row">
              {(["email", "slack", "teams"] as AmplifyChannel[]).map((channel) => (
                <label key={channel}>
                  <input
                    type="checkbox"
                    checked={channels.includes(channel)}
                    onChange={() => toggleChannel(channel)}
                  />
                  {channel === "teams" ? "MS Teams" : channel[0].toUpperCase() + channel.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="ap-field">
            <span>Optional note</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Short personal message to employees…"
            />
          </div>

          <div className="ap-dispatch__footer">
            <button type="button" className="cs-btn cs-btn--secondary" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              type="button"
              className="cs-btn cs-btn--primary"
              disabled={!channels.length}
              onClick={() => setStep(4)}
            >
              Review
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="ap-review-box">
            <strong>Ready to send</strong>
            <div style={{ marginTop: 8 }}>
              47 employees · {channels.join(", ")} · 6 caption variants · CTA → {ctaDestination}
            </div>
            {note ? <div style={{ marginTop: 8 }}>Note: {note}</div> : null}
          </div>
          <div className="ap-dispatch__footer">
            <button type="button" className="cs-btn cs-btn--secondary" onClick={() => setStep(3)}>
              Back
            </button>
            <button type="button" className="cs-btn cs-btn--primary" onClick={finish}>
              Send now
            </button>
          </div>
        </>
      )}
    </section>
  );
};
