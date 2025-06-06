import * as Yup from 'yup';

export const addCompanySchema = Yup.object({
	companyName: Yup.string().required("Please provide company name"),
	websiteURL: Yup.string().url().required("Please provide website url"),
	industrialSector: Yup.string().required("Please provide industrial sector"),
	employeeCount: Yup.number().required("Please provide employee count"),
	country: Yup.string().required("Please provide country"),
	state: Yup.string().required("Please provide state"),
	city: Yup.string().required("Please provide city"),
});