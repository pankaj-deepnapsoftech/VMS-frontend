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
  InfrastructureVulnerabilityContextProvider,
  JiraContextProvider,
  MailContextProvider,
  RemeditionContextProvider,
  SeverityContextProvider,
  VulnerabililtyDataContextProvider,
} from "./context";
import AppSoftContextProvider from "./context/ApplicationSoftwareInventoryContext/ApplicationSoftwareInventoryContext";
import AIVAContextProvider from "./context/AI-VAContext/AI-VAContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DataContextProvider>
          <VulnerabililtyDataContextProvider>
            <AllEmployeeContextProvider>
              <JiraContextProvider>
                  <ApplicationVulnerabilityContextProvider>
                    <RemeditionContextProvider>
                      <ExceptionContextProvider>
                        <InfrastructureVulnerabilityContextProvider>
                          <AppSoftContextProvider>
                            <SeverityContextProvider>
                              <MailContextProvider>
                                <AIVAContextProvider>
                                  <App />
                                </AIVAContextProvider>
                              </MailContextProvider>
                            </SeverityContextProvider>
                          </AppSoftContextProvider>
                        </InfrastructureVulnerabilityContextProvider>
                      </ExceptionContextProvider>
                    </RemeditionContextProvider>
                  </ApplicationVulnerabilityContextProvider>
              </JiraContextProvider>
            </AllEmployeeContextProvider>
          </VulnerabililtyDataContextProvider>
        </DataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
