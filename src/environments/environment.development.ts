let env: any = {
  production: false,
  // apiurl: `https://walkaroo.indusnovateur.in:7508/api`,
  // media: `https://walkaroo.indusnovateur.in:7508/`,
  apiurl: `http://4.247.144.208:8080/api`,
  media: `http://4.247.144.208:8080/`,
  devtype:`QC`,

}
if (typeof window !== 'undefined') {
  //  env = {
  //     production: true,
  //     apiurl: `http://${window.location.hostname}:${window.location.port}/api`,
  //     media: `http://${window.location.hostname}:${window.location.port}`,
  //   //  devtype:`Dev` 
  //   // devtype:`QC` 
  //    devtype:`QC`
  //  }
}
export const environment = env