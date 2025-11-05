import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AllEmployeeContextProvider,
  ApplicationVulnerabilityContextProvider,
  AuthContextProvider,
  DataContextProvider,
  ExceptionContextProvider,
  InfraAssetContextProvider,
  InfrastructureVulnerabilityContextProvider,
  JiraContextProvider,
  MailContextProvider,
  MainReportContextProvider,
  NessusContextProvider,
  RemeditionContextProvider,
  SchedulingAssesmentContextProvider,
  SeverityContextProvider,
  TagsContextProvider,
  VulnerabililtyDataContextProvider,
} from "./context";
import AppSoftContextProvider from "./context/ApplicationSoftwareInventoryContext/ApplicationSoftwareInventoryContext";
import AIVAContextProvider from "./context/AI-VAContext/AI-VAContext";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <VulnerabililtyDataContextProvider>
          <AllEmployeeContextProvider>
              <JiraContextProvider>
                <SchedulingAssesmentContextProvider>
                  <ApplicationVulnerabilityContextProvider>
                    <RemeditionContextProvider>
                      <ExceptionContextProvider>
                        <InfrastructureVulnerabilityContextProvider>
                          <AppSoftContextProvider>
                            <InfraAssetContextProvider>
                              <TagsContextProvider>
                                 
                                    <SeverityContextProvider>
                                      <NessusContextProvider>
                                        <MainReportContextProvider>
                                          <MailContextProvider>
                                            <AIVAContextProvider>
                                              <App />
                                            </AIVAContextProvider>
                                          </MailContextProvider>
                                        </MainReportContextProvider>
                                      </NessusContextProvider>
                                    </SeverityContextProvider>
                              </TagsContextProvider>
                            </InfraAssetContextProvider>
                          </AppSoftContextProvider>
                        </InfrastructureVulnerabilityContextProvider>
                      </ExceptionContextProvider>
                    </RemeditionContextProvider>
                  </ApplicationVulnerabilityContextProvider>
                </SchedulingAssesmentContextProvider>
              </JiraContextProvider>
          </AllEmployeeContextProvider>
        </VulnerabililtyDataContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
