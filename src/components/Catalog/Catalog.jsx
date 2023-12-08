import React, { useState } from 'react';
import makes from "./makes.json";
import Select from 'react-select';

const Catalog = () => {
  const [selectPrice, setSelectPrice] = useState(null);
  const [fromMile, setFromMile] = useState('');
  const [toMile, setToMile] = useState('');

  const handleChange = (option) => {
    setSelectPrice(option ? option.value : "");
  };

  const optionsMakeFilter = makes.map((make) => ({ value: make, label: make }));

  const generatePrice = () => {
    const minRate = 10;
    const maxRate = 300;
    const step = 10;
    
    const rates = [];
    for (let rate = minRate; rate <= maxRate; rate += step) {
      rates.push(rate);
    }

    return rates;
  };

  const optionsMakePrice = generatePrice().map(rate => ({ value: rate, label: rate }));

  const placeholderText = "Enter the text";

  return (
    <div>
      <form>
        <label htmlFor="makeFilter">Car brand</label>
        <Select
          id="makeFilter"
          name="makeFilter"
          options={optionsMakeFilter}
          isSearchable
          placeholder={placeholderText}
        />
        <label htmlFor="makePrice">Price/ 1 hour</label>
        <Select
          id="makePrice"
          name="makePrice"
          options={optionsMakePrice}
          isSearchable={false}
          placeholder='To $'
          value={
            selectPrice !== null
              ? {
                  value: selectPrice,
                  label: `To ${selectPrice}$`,
                }
              : null
          }
          onChange={handleChange}
        />
        <label htmlFor="carMileage">Сar mileage / km</label>
        <span className="input-prefix">From</span>
        <input
          id="carMileage"
          type="number"
          name="from"
          onChange={(e) => {
            const value = Math.max(e.target.value, 0);
            setFromMile(value);
          }}
        />
        <span className="input-prefix">To</span>
        <input
          id="carMileage"
          type="number"
          name="to"
          onChange={(e) => {
            const value = Math.max(e.target.value, 0);
            setToMile(value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Catalog;
