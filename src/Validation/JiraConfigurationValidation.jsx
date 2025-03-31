import { string, number, object } from "yup";

export const JiraConfiigValidation = object({
	Domain: string()
		.required("Domain is required"),
	JIRA_USERNAME: string()
		.min(3, "Username must be at least 3 characters")
		.required("JIRA Username is required"),
	JIRA_API_KEY: string()
		.min(8, "API Key must be at least 8 characters")
		.required("JIRA  API Key is required"),
});