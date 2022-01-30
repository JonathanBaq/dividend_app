import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//2.Use fetch-api to fetch JSON
const companiesUrl =
  "https://gist.githubusercontent.com/VincentLeV/a0c326b9cbeabf63b4e5e02aa9779f6c/raw/b916a9e3d40aef926bf7e3b9b4db308d7da1ca5d/shares.json";

const fetchCOmpanies = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Bad response");
  }
};

//MAIN App
const dividendApp = async () => {
  //3.yeild computation function
  const getDividendYield = (company) => {
    const dividendHistory = company.dividendHistory;
    const yearDividend = dividendHistory.filter(
      (dividend) => dividend.year === 2021
    );
    if (yearDividend[0]) {
      const dividendYield = (yearDividend[0].dividend / company.price) * 100;
      console.log(`Dividend yield(2021) of ${company.share} is ${parseFloat(dividendYield.toFixed(2))}`);
      return parseFloat(dividendYield.toFixed(2));
    } else {
      throw new Error("Dividend for year does not exist");
    }
  };

  //4.average dividend computation (last 5 years) function
  const getAveDividends = (company) => {
    const dividendArray = company.dividendHistory;
    const dividends = dividendArray.map(dividends => dividends.dividend)
    const fiveYearDividends = dividends.filter((dividend, index) => index <= 4)
    const price = company.price;
    const initialValue = 0;

    const sum = fiveYearDividends.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, initialValue).toFixed(2);

    console.log(`Average Yield(5 years) of ${company.share} is ${parseFloat(((sum / 5 / price) * 100).toFixed(2))}`);
    return parseFloat(((sum / 5 / price) * 100).toFixed(2));
  }

  //5. Weighted average computation function

  try {
    const companies = await fetchCOmpanies(companiesUrl);
    console.log(companies);

    //**Output data format: array of company objects**
    const getShares = () => {
      return companies.map(company => (
        {
          share: company.share,
          company: company.company,
          price: company.price,
          lastYearDividend: company.dividendHistory[0].dividend,
          dividendYield: getDividendYield(company),
          AveYield: getAveDividends(company),
          //weightedAve: getWeightedAve(company)
        }
      )
      );
    };

    const initialSharesArray = await getShares(companies);
    console.log(initialSharesArray);

    //Final output formatting
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Something went wrong, Error: ${error.message}`);
    }
  }
};

dividendApp();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
