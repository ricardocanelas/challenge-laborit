const KEY = 'laborit_cars_favourites_v011';

const local = {
  getStore: function () {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  },

  setStore: function (data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  },
}

export default local;
