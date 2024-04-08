import React from 'react';

const PhoneList = ({ phones }) => {
  return (
    <div>
      <h1>List of Phones</h1>
      <ul>
        {phones.map(phone => (
          <li key={phone.model}>
            <strong>{phone.brand}</strong> {phone.model} - ${phone.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneList;
