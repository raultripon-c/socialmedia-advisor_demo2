import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AmplifyPreviewPage,
  CampaignStudioCreate,
  CampaignStudioDashboard,
  CampaignStudioList,
  CampaignStudioWorkspace,
  ContentBoardPage,
} from "./features/CampaignStudio";
import { DemoShell } from "./shell/DemoShell";

const seedDemoTenant = () => {
  const tenant = {
    customerCode: "dukehealth",
    refNum: "demo",
    tenantName: "Duke Health",
    customerName: "Duke Health",
  };
  localStorage.setItem("selectedTenant", JSON.stringify(tenant));
  sessionStorage.setItem(
    "selectedApp",
    JSON.stringify({
      id: "campaign-studio-new",
      name: "Social Media Advisor",
      hoverText: "Social Media Advisor",
      appConfig: { route: "/campaign-studio/campaigns" },
    }),
  );
};

export default function App() {
  useEffect(() => {
    seedDemoTenant();
  }, []);

  return (
    <Routes>
      <Route element={<DemoShell />}>
        <Route path="/" element={<Navigate to="/campaign-studio/campaigns" replace />} />
        <Route path="/campaign-studio/campaigns" element={<CampaignStudioList />} />
        <Route path="/campaign-studio/campaigns/new" element={<CampaignStudioCreate />} />
        <Route
          path="/campaign-studio/campaigns/workspace/:campaignWorkspaceId"
          element={<CampaignStudioWorkspace />}
        />
        <Route
          path="/campaign-studio/campaigns/:campaignId/dashboard"
          element={<CampaignStudioDashboard />}
        />
        <Route path="/campaign-studio/content-board" element={<ContentBoardPage />} />
        <Route path="/campaign-studio/amplify-preview" element={<AmplifyPreviewPage />} />
        <Route path="*" element={<Navigate to="/campaign-studio/campaigns" replace />} />
      </Route>
    </Routes>
  );
}
