export const calculateVRS = (EPSS, exploitComplexity, exploitAvailale, threatType) => {
  const exploitComp = exploitComplexity === "Without Authentication" ? 0.9 : exploitComplexity === "Low Privilege Require" ? 0.3 : 0;
  const threat = threatType === "Vulnerability" ? 1 : 0.7;
  const exploitAvail = exploitAvailale ? 1 : 0;

  const result = 100 * ((EPSS * 0.35) + (exploitComp * 0.25) + (exploitAvail * 0.25) + (threat * 0.15)) / 1

  return result.toFixed(2)

}


export const calculateACS = (data) => {
  if (data) {
    let total = data.asset_class + data.data_sensitivity + data.exposure + data.hosting + data.service_role_score_total;
    const result = 100 * (total) / 50;
    return result
  }

  return 0
}


export const calculateARS = (data) => {
  const vrs = calculateVRS(data.EPSS, data.exploit_complexity, data.Exploit_Availale, data.threat_type);
  const acs = data?.BusinessApplication ? calculateACS(data?.BusinessApplication) : calculateACS(data?.InfraStructureAsset);

  return Math.sqrt((acs * vrs)).toFixed(2);

}

export const calculateEPSS_annual = (epss) => {
  const monthsInYear = 365 / 30;
  const probability = 1 - Math.pow((1 - epss), monthsInYear);
  return probability.toFixed(5);
}


export const calculateLM = (cost,acs)=>{
  return cost*acs/100
}


export const calculateALE = (data) => {

console.log(data)
  const vrs = calculateVRS(data.EPSS, data.exploit_complexity, data.Exploit_Availale, data.threat_type);
  const acs = data?.BusinessApplication ? calculateACS(data?.BusinessApplication) : calculateACS(data?.InfraStructureAsset);
  // const ars = calculateARS(vrs, acs);
  const epss_annual = calculateEPSS_annual(data.EPSS);
  const lm = data?.BusinessApplication  ?  calculateLM(data?.BusinessApplication.amount,acs) : calculateLM(data?.InfraStructureAsset.amount,acs)
  // console.log("vrs is : %d, and acs is: %d, and epss_anula is : %d , and lm is : %d",vrs,acs,epss_annual,lm)

  return epss_annual*lm;
}


