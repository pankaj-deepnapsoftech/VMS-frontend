import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AllCustomerContextProvider,
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
  ReportContextProvider,
  SchedulingAssesmentContextProvider,
  SeverityContextProvider,
  TagsContextProvider,
  TVMCardsContextProvider,
  VulnerabililtyDataContextProvider,
} from "./context";
import AppSoftContextProvider from "./context/ApplicationSoftwareInventoryContext/ApplicationSoftwareInventoryContext";
import AIVAContextProvider, {
  AIVAContext,
} from "./context/AI-VAContext/AI-VAContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <VulnerabililtyDataContextProvider>
          <AllEmployeeContextProvider>
            <AllCustomerContextProvider>
              <JiraContextProvider>
                <SchedulingAssesmentContextProvider>
                  <ApplicationVulnerabilityContextProvider>
                    <RemeditionContextProvider>
                      <ExceptionContextProvider>
                        <InfrastructureVulnerabilityContextProvider>
                          <AppSoftContextProvider>
                            <InfraAssetContextProvider>
                              <TagsContextProvider>
                                <TVMCardsContextProvider>
                                  <ReportContextProvider>
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
                                  </ReportContextProvider>
                                </TVMCardsContextProvider>
                              </TagsContextProvider>
                            </InfraAssetContextProvider>
                          </AppSoftContextProvider>
                        </InfrastructureVulnerabilityContextProvider>
                      </ExceptionContextProvider>
                    </RemeditionContextProvider>
                  </ApplicationVulnerabilityContextProvider>
                </SchedulingAssesmentContextProvider>
              </JiraContextProvider>
            </AllCustomerContextProvider>
          </AllEmployeeContextProvider>
        </VulnerabililtyDataContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
