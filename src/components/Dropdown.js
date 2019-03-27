import React from 'react';

const Dropdown = (props) => {
  return (
    <div className='dropdown'>
      <div className='label'>{props.label}</div>
      <select onChange={(e) => props.onChange(e.target.value)} value={props.value === null ? '' : props.value}>
        {props.status === 'loading' && <option value='' disabled>Loading...</option>}
        {props.data && props.data.length && <option value='' disabled>- Select -</option>}
        {props.data && props.data.map(item => (
          <option key={item.codigo} value={item.codigo}>{item.nome}</option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown;
