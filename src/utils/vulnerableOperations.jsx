   export const calculateVRS = (EPSS, exploitComplexity, exploitAvailale, threatType) => {
    const exploitComp = exploitComplexity === "Without Authentication" ? 0.9 : exploitComplexity === "Low Privilege Require" ? 0.3 : 0;
    const threat = threatType === "Vulnerability" ? 1 : 0.7;
    const exploitAvail = exploitAvailale ? 1 : 0;

    const result = 100 * ((EPSS * 0.35) + (exploitComp * 0.25) + (exploitAvail * 0.25) + (threat * 0.15)) / 1

    return result.toFixed(2)

  }


  export const calculateARS = (data) => {
      if(data){
        let total = data.asset_class + data.data_sensitivity + data.exposure + data.hosting + data.service_role_score_total;
        const result = 100*(total)/50;
        return result
      }
     
      return 0
    }


