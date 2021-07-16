export const GeneralHelpers = {
  uniqueAppVersions: (users) => {
    const appVersions = users.filter((appVersion) => {
      return appVersion.version !== undefined
    })

    const versions = appVersions.map((v) => {
      return v.version
    })

    let uniqueVersions = [];
    versions.forEach((c) => {
      if (!uniqueVersions.includes(c)) {
        uniqueVersions.push(c);
      }
    });
    return uniqueVersions.sort((a, b) => {
      return a - b
    })
  }
}