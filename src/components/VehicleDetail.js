import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

const VehicleDetail = (props) => {

  if (props.data.status === 'none') {
    return <div className='vehicle notfound'>Selecione todos os campos acima.</div>
  }

  if (props.data.status === 'loading') {
    return <div className='vehicle loading'><FaSpinner className='animate rotate' /></div>
  }

  const { Marca, Modelo, Valor, AnoModelo, Combustivel, CodigoFipe, MesReferencia } = props.data.data
  const { isFavourite } = props;

  return (
    <div className='vehicle'>
      <div className='label'>Dados do veículo</div>

      <div className='container'>
        <div className='body'>
          <div className=''>
            <div className='brand'>{Marca}</div>
            <div className='model'>{Modelo}</div>
          </div>
          <div className=''>
            <div className='price'>{Valor}</div>
            <div className='ref'>Mês ref.: {MesReferencia}</div>
          </div>
        </div>
        <div className='footer'>
          <div className=''>
            <div className='fuel tag'>{Combustivel}</div>
            <div className='year tag'>{AnoModelo}</div>
            <div className='fipe'>FIPE: {CodigoFipe}</div>
          </div>
          <div className=''>
            <div className='favourite' onClick={(e) => props.onFavouriteChange(props.data.data, !props.isFavourite)}>
              {isFavourite && <IoIosHeart fill='red' />}
              {!isFavourite && <IoIosHeartEmpty />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetail;
