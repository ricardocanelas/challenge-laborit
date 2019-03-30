import React from 'react';

const FavouriteTable = (props) => {
  return (
    <div className='favourite-list'>
      <div className='label'>Favoritos</div>
      <table>
        <thead>
          <tr>
            <th width='140px'>Marca</th>
            <th>Modelo / Ano</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length === 0 && (
            <tr><td colSpan='3' className='text-center'>- sem favoritos -</td></tr>
          )}
          {props.data.map(item =>
            <tr key={item.id} data={item}>
              <td>{item.Marca}</td>
              <td>{item.Modelo} ({item.AnoModelo})</td>
              <td>{item.Valor}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default FavouriteTable;
