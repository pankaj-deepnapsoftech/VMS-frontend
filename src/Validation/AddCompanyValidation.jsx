import * as Yup from 'yup';

export const addCompanySchema = Yup.object({
	companyName: Yup.string().min(3).max(30).required("Please provide company name"),
	websiteURL: Yup.string().min(5).max(30).required("Please provide website url"),
	industrialSector: Yup.string().min(3).max(30).required("Please provide industrial sector"),
	employeeCount: Yup.number().required("Please provide employee count"),
	country: Yup.string().min(3).max(30).required("Please provide country"),
	state: Yup.string().min(3).max(30).required("Please provide state"),
	city: Yup.string().min(3).max(30).required("Please provide city"),
});