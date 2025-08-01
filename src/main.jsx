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
  RemeditionContextProvider,
  ReportContextProvider,
  SchedulingAssesmentContextProvider,
  TagsContextProvider,
  TVMCardsContextProvider,
  VulnerabililtyDataContextProvider,
} from "./context";
import AppSoftContextProvider from "./context/ApplicationSoftwareInventoryContext/ApplicationSoftwareInventoryContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <AllEmployeeContextProvider>
          <VulnerabililtyDataContextProvider>
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
                                  <App />
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
          </VulnerabililtyDataContextProvider>
        </AllEmployeeContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
