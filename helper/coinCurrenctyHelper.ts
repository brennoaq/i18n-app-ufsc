import axios from "axios";

export const getCurrencyData = async () => {
  try {
    const response = await axios.get(
      'http://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL'
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};