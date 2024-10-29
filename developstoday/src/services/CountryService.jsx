import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export default async function getAllCountries() {
  try {
    const countries = await axios.get(`${BASE_URL}/countries`);
    return countries.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getPopulation() {
  try {
    const population = await axios.get(`${BASE_URL}/population`);
    return population.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getFlag() {
  try {
    const flags = await axios.get(`${BASE_URL}/flags`);
    return flags.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getCountryInfo(countryCode) {
  try {
    const countryInfo = await axios.get(`${BASE_URL}/countryinfo`, {
      params: { countryCode },
    });
    return countryInfo.data;
  } catch (error) {
    console.error(error.message);
  }
}
