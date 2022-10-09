let prod = false;
//let local = "localhost";
let local = "192.168.0.228";
let server = "krezilotto";
let port = "8080";
let keno_port = 82;
let kz_port = 4200;
export const token = 'fasfyyAh129999sdg7fsafeGSGgjajhha127SHHwetyHwihd828yudbzbBbdavh378bsdbfjfhdf8834rbbdfmsdfn78';
export const getUrl = (name: any) => (prod) ? `https://${name}.herokuapp.com/api/` : 'http://'+ name +':'+port+'/api/' ;

// let url =  () => { let nom =  sessionStorage.getItem('url_backend'); return nom; };
let url = () => { return (prod) ? server : local; };

let  KNS = () => {
  if (prod) {
    return "https://keno.kreziloto.com/";
  }
  return `http://${ url() }:${keno_port}/keno/`;
}
let  KLS = () => {
  if (prod) {
    return "https://kreziloto.com/game/mobil/";
  }
  return `http://${ url() }:${kz_port}/game/mobil/`;
}
// const name = sessionStorage.getItem('url_backend');
// **** DONT NOT FORGET TO SET "PRODUCTION" TO "TRUE" ***///
export const environment = {
      production: prod,
      node: false,
      apiUrl    : getUrl(url()),
      albou: "http://localhost:82/",
      local: local,
      server: server,
      server_keno: KNS() + "?token=",
      server_kz: KLS(),
};
