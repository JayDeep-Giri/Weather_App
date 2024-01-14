import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoUrl } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        return  await fetch(`${geoUrl}?minPopulation=1000000&namePrefix=${inputValue}`,geoApiOptions)
        .then(async (response) => await response.json())
        .then((response) => {
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label:`${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        });
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return(
        <AsyncPaginate
            placeholder="Search for the city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;