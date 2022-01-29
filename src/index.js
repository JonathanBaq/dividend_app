import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//2.Use fetch-api to fetch JSON
const companiesUrl = 'https://gist.githubusercontent.com/VincentLeV/a0c326b9cbeabf63b4e5e02aa9779f6c/raw/b916a9e3d40aef926bf7e3b9b4db308d7da1ca5d/shares.json'

const fetchCOmpanies = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Bad response')
  }
}

//MAIN App
const dividendApp = async () => {
  //3.yeild computation function
  const getDividendYield = (company) => {
    const dividendHistory = company.dividendHistory;
    const yearDividend = dividendHistory.filter(dividend => dividend.year === 2021);
    const dividendYield = (yearDividend[0].dividend / company.price) * 100;

    return Math.round(dividendYield * 100) / 100;
  }

  //4.average dividend computation (last 5 years) function 

  //5. Weighted average computation function

  try {
    const companies = await fetchCOmpanies(companiesUrl);
    console.log(companies)

    //**Output data format: array of company objects**
    const getShares = () => {
      return companies.map(company => ({
        share: company.share,
        company: company.company,
        price: company.price,
        lastYearDividend: company.dividendHistory[0].dividend,
        dividendYield: getDividendYield(company),
        //AveYield: getAveYield(company),
        //weightedAve: getWeightedAve(company)
      })
      )
    }

    const initialSharesArray = getShares(companies);
    console.log(initialSharesArray);

    //Final output formatting

  } catch (error) {
    if (error instanceof Error) {
      console.log(`Something went wrong, Error: ${error.message}`);
    }
  }
}

dividendApp();
































ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
