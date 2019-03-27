class API {

  constructor(type) {
    this.history = {};
    this.url_base = 'https://parallelum.com.br/fipe/api/v1/';
    this.type = type === undefined ? 'carros' : type;
  }

  setType(value) {
    this.type = value;
  }

  getBrands() {
    return fetch(this.url_base + this.type + '/marcas').then(res => res.json())
  }

  getModels(brand_id) {
    return fetch(this.url_base + this.type + '/marcas/' + brand_id + '/modelos').then(res => res.json())
  }

  getYears(brand_id, model_id) {
    return fetch(this.url_base + this.type + '/marcas/' + brand_id + '/modelos/' + model_id + '/anos').then(res => res.json())
  }

  getVehicle(brand_id, model_id, year_id) {
    return fetch(this.url_base + this.type + '/marcas/' + brand_id + '/modelos/' + model_id + '/anos/' + year_id).then(res => res.json())
  }
}

export default new API('carros');
