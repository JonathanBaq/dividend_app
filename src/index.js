import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Do tasks here
const dividendApp = async () => {
  const companiesUrl = 'https://gist.githubusercontent.com/VincentLeV/a0c326b9cbeabf63b4e5e02aa9779f6c/raw/b916a9e3d40aef926bf7e3b9b4db308d7da1ca5d/shares.json'

  //2.Use fetch-api to establish connection to JSON
  const fetchCOmpanies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  const companies = await fetchCOmpanies(companiesUrl);
  console.log(companies)

  //3.yeild computation
  const getDividendYield = (company) => {
    const dividendHistory = company.dividendHistory;
    const recentDividend = dividendHistory.filter(dividend => dividend.year === 2021);
    const dividendYield = recentDividend.map(dividend => (dividend.dividend / company.price) * 100)

    return Math.round(dividendYield * 100) / 100;
  }
  //Array of dividendYield arranged by original order of companies
  console.log(companies.map(company => getDividendYield(company)));

  //4.average dividend computation (last 5 years)

  //5. Weighted average computation

  //**Output data format: array of company objects**
  const formatOutput = () => {
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

  const initialSharesArray = formatOutput(companies);
  console.log(initialSharesArray);

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
