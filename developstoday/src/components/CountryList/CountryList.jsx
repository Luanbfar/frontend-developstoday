import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import getAllCountries, {
  getPopulation,
  getFlag,
  getCountryInfo,
} from "../../services/CountryService";
import "./CountryList.css";

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [populationData, setPopulationData] = useState([]);
  const [flagData, setFlagData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const [slideAnimation, setSlideAnimation] = useState(false);

  const fetchCountries = async () => {
    const response = await getAllCountries();
    setCountries(response);
  };

  const fetchPopulation = async () => {
    const response = await getPopulation();
    setPopulationData(response.data);
  };

  const fetchFlags = async () => {
    const response = await getFlag();
    setFlagData(response.data);
  };

  const fetchCountryInfo = async (countryCode) => {
    const response = await getCountryInfo(countryCode);
    setCountryInfo(response);
  };

  useEffect(() => {
    fetchCountries();
    fetchPopulation();
    fetchFlags();
  }, []);

  const handleClick = (countryName, countryCode) => {
    setSelectedCountry(countryName);
    setSlideAnimation(true);
    fetchCountryInfo(countryCode);
  };

  const filteredData = populationData.find(
    (country) => country.country === selectedCountry
  );

  return (
    <div className={`container ${slideAnimation ? "slide-left" : ""}`}>
      <div className="country-list">
        {countries.map((country) => {
          const countryFlag = flagData.find(
            (flag) => flag.name === country.name
          );
          return (
            <p
              onClick={() => handleClick(country.name, country.countryCode)}
              key={country.countryCode}
            >
              {countryFlag && (
                <img
                  src={countryFlag.flag}
                  alt={`${country.name} flag`}
                  className="country-flag"
                />
              )}
              {country.name}
            </p>
          );
        })}
      </div>

      <div>
        {selectedCountry && filteredData && (
          <div className="chart">
            <h2>{selectedCountry} Population</h2>
            <LineChart
              width={640}
              height={300}
              data={filteredData.populationCounts}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        )}

        {countryInfo && countryInfo.borders && (
          <div className="country-info">
            <h3>Borders</h3>
            <p>
              {countryInfo.borders.length > 0
                ? countryInfo.borders
                    .map((border) => border.commonName)
                    .join(", ")
                : "None"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
