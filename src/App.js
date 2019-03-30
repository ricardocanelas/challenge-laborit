import React, { Component } from 'react';
import Dropdown from './components/Dropdown'
import VehicleDetail from './components/VehicleDetail'
import FavouriteTable from './components/FavouriteTable'
import API from './helpers/api'
import local from './helpers/local'

class App extends Component {

  state = {
    brands: {
      selected: null,
      status: 'loading',
      data: [],
    },
    models: {
      selected: null,
      status: 'none',
      data: [],
    },
    years: {
      selected: null,
      status: 'none',
      data: [],
    },
    vehicle: {
      status: 'none',
      data: null,
    },
    favourites: local.getStore(),
  }

  // I created this function to look like Redux architecture
  // if it's necessary to add redux or hook in the future,
  // I believe that will be less painful

  reducer = (action, callback = () => { }) => this.setState(currentState => {
    switch (action.type) {
      case 'brands_fetched':
        return {
          ...currentState,
          brands: { selected: null, data: action.payload, status: 'loaded' },
        };
      case 'models_fetched':
        return {
          ...currentState,
          models: { selected: null, data: action.payload, status: 'loaded' },
          vehicle: { data: null, status: 'none' },
        };
      case 'years_fetched':
        return {
          ...currentState,
          years: { selected: null, data: action.payload, status: 'loaded' },
          vehicle: { data: null, status: 'none' },
        };
      case 'vehicle_fetched':
        return {
          ...currentState,
          vehicle: {
            data: {
              ...action.payload,
              id: `${currentState.brands.selected}-${currentState.models.selected}-${currentState.years.selected}`,
            },
            status: 'loaded',
          },
        };
      case 'brands_selected':
        return {
          ...currentState,
          brands: {
            ...currentState.brands,
            selected: action.payload,
          },
          models: { selected: null, data: null, status: 'loading' },
          years: { selected: null, data: [], status: 'none' },
          vehicle: { data: null, status: 'none' },
        };
      case 'models_selected':
        return {
          ...currentState,
          models: { ...currentState.models, selected: action.payload },
          years: { selected: null, data: null, status: 'loading' },
          vehicle: { data: null, status: 'none' },
        }
      case 'years_selected':
        return {
          ...currentState,
          years: { ...currentState.years, selected: action.payload, status: 'loaded' },
          vehicle: { data: null, status: 'loading' },
        }
      case 'favourite_added':
        return {
          ...currentState,
          favourites: [...currentState.favourites, action.payload],
        }
      case 'favourite_removed':
        return {
          ...currentState,
          favourites: [...currentState.favourites.filter(item => item.id !== action.payload.id)],
        }
      default:
        return currentState;
    }
  }, callback);

  componentDidMount() {
    API.getBrands().then(result => {
      this.reducer({ type: 'brands_fetched', payload: result });
    })
  }

  handleChange = field => value => {
    const status = field.toUpperCase();

    if (status === 'BRANDS') {
      this.reducer({ type: 'brands_selected', payload: value });
      API.getModels(value).then(result => {
        this.reducer({ type: 'models_fetched', payload: result.modelos });
      })
    }

    if (status === 'MODELS') {
      this.reducer({ type: 'models_selected', payload: value });
      API.getYears(this.state.brands.selected, value).then(result => {
        this.reducer({ type: 'years_fetched', payload: result });
      });
    }

    if (status === 'YEARS') {
      this.reducer({ type: 'years_selected', payload: value });
      API.getVehicle(this.state.brands.selected, this.state.models.selected, value).then(result => {
        this.reducer({ type: 'vehicle_fetched', payload: result });
      })
    }
  }

  handleFavouriteChange = (data, favourite) => {
    this.reducer({ type: favourite ? 'favourite_added' : 'favourite_removed', payload: data }, () => {
      local.setStore(this.state.favourites);
    });
  }

  render() {
    const { brands, models, years, vehicle, favourites } = this.state;
    const isFavourite = vehicle.status === 'loaded' ? (favourites.find(item => item.id === vehicle.data.id) ? true : false) : false;

    return (
      <div className="wrapper">
        <div className='logo'>Laborit Cars</div>
        <div className='dropdowns'>
          <Dropdown label='Marca' value={brands.selected} onChange={this.handleChange('brands')} data={brands.data} status={brands.status} />
          <Dropdown label='Modelo' value={models.selected} onChange={this.handleChange('models')} data={models.data} status={models.status} />
          <Dropdown label='Ano' value={years.selected} onChange={this.handleChange('years')} data={years.data} status={years.status} />
        </div>
        <VehicleDetail data={vehicle} onFavouriteChange={this.handleFavouriteChange} isFavourite={isFavourite} />
        <hr />
        <FavouriteTable data={favourites} />
        <div className='by'>
          <a href='https://github.com/ricardocanelas'>by RicardoCanelas</a>
        </div>
      </div>
    );
  }
}

export default App;
