import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import {
  AllCustomerContextProvider,
  AllEmployeeContextProvider,
  ApplicationVulnerabilityContextProvider,
  AuthContextProvider,
  DataContextProvider,
  ExceptionContextProvider,
  InfrastructureVulnerabilityContextProvider,
  JiraContextProvider,
  RemeditionContextProvider,
  SchedulingAssesmentContextProvider,
  VulnerabililtyDataContextProvider
} from "./context";

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


                          <App />


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
