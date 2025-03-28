import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import './EarningsSection.css';

const EarningsSection = () => {
  const [earnings, setEarnings] = useState({
    totalEarnings: 45670,
    monthlyEarnings: [
      { month: 'Jan', amount: 4200 },
      { month: 'Feb', amount: 3800 },
      { month: 'Mar', amount: 5100 },
      { month: 'Apr', amount: 4600 },
      { month: 'May', amount: 4900 }
    ],
    recentTransactions: [
      {
        id: 1,
        project: 'Brand Identity Design',
        client: 'TechInnovate Solutions',
        amount: 1500,
        date: '2024-05-15'
      },
      {
        id: 2,
        project: 'Website Redesign',
        client: 'Global Marketing Inc.',
        amount: 2300,
        date: '2024-05-10'
      },
      {
        id: 3,
        project: 'Marketing Brochure',
        client: 'Creative Marketing Agency',
        amount: 1200,
        date: '2024-05-05'
      }
    ]
  });

  return (
    <div className="earnings-section">
      <div className="earnings-overview">
        <div className="total-earnings-card">
          <div className="earnings-header">
            <DollarSign className="earnings-icon" />
            <h2>Total Earnings</h2>
          </div>
          <div className="total-amount">
            <h3>${earnings.totalEarnings.toLocaleString()}</h3>
            <span className="earnings-trend positive">
              <TrendingUp /> 12.5% from last month
            </span>
          </div>
        </div>
        <div className="monthly-earnings-chart">
          <h3>Monthly Earnings</h3>
          <div className="chart-bars">
            {earnings.monthlyEarnings.map((monthEarning, index) => (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar" 
                  style={{height: `${monthEarning.amount / 50}%`}}
                ></div>
                <span>{monthEarning.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="recent-transactions">
        <div className="section-header">
          <h2>Recent Transactions</h2>
        </div>
        <div className="transactions-list">
          {earnings.recentTransactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-details">
                <h3>{transaction.project}</h3>
                <p>{transaction.client}</p>
              </div>
              <div className="transaction-amount">
                <span>${transaction.amount}</span>
                <p>{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsSection;