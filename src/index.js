import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Do tasks here
const companiesUrl = 'https://gist.githubusercontent.com/VincentLeV/a0c326b9cbeabf63b4e5e02aa9779f6c/raw/b916a9e3d40aef926bf7e3b9b4db308d7da1ca5d/shares.json'

//2.Use fetch-api to establish connection to JSON
const fetchCOmpanies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//3.yeild computation
const dividendApp = async () => {
  const companies = await fetchCOmpanies(companiesUrl);
  console.log(companies)



  //4.average dividend computation (last 5 years)

  //5. Weighted average computation

  //**Output data format: array of company objects**
  /*   const outputData = [
      {
        Share:
        Company: Company1,
        Price:
        Last year dividend: 0.75
        Dividend yield-%: 2.3
        Five-year average dividend yield-%: X.Y
        Five-year weighted average dividend yield-%: W.Z
      },
      {
        Share:
        Company: Company2,
        Price:
        Last year dividend: 0.75
        Dividend yield-%: 2.3
        Five-year average dividend yield-%: X.Y
        Five-year weighted average dividend yield-%: W.Z
      },
    ] */

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
