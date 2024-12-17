import { Grid } from "@mui/material"
import React, { useState } from "react"
import { Pie } from 'react-chartjs-2';
import { Line } from "react-chartjs-2";
import { Scatter } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2';
import { ListBase, WithListContext } from 'react-admin';

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement, 
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

interface Customer {
  user_id: number;
  age: number;
  annual_income: number;
  purchase_amount: number;
  loyalty_score: number;
  region: string;
  purchase_frequency: number;
}


ChartJS.register( ArcElement,LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const PurchaseFrequencyAmountChart = () => (
    <ListBase resource="Customer" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                // Convert data object to an array and sort by user_id or any other relevant field
                const dataArray = data ? Object.values(data).sort((a, b) => a.user_id - b.user_id) : [];

                // Chart data and options for purchase frequency and amount
                const lineChartData = {
                    labels: dataArray.map(item => item.user_id), // X-axis labels, using user_id as identifier
                    datasets: [
                        {
                            label: 'Purchase Frequency',
                            data: dataArray.map(item => item.purchase_frequency),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'Purchase Amount',
                            data: dataArray.map(item => item.purchase_amount/20),
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            tension: 0.4,
                        }
                    ],
                };

                const lineChartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: 'Purchase Frequency vs Purchase Amount',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'User ID',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Value',
                            },
                            beginAtZero: true,
                        },
                    },
                };

                return (
                    <Grid item xs={12}>
                        <h2>Purchase Frequency vs Purchase Amount</h2>
                        <Line data={lineChartData} options={lineChartOptions} />
                    </Grid>
                );
            }}
        />
    </ListBase>
);

const UserDistributionByRegionChart = () => (
  <ListBase resource="Customer" disableSyncWithLocation perPage={100}>
      <WithListContext
          render={({ data, isLoading }) => {
              if (isLoading) {
                  return <p>Loading...</p>;
              }

              // 确保 data 是一个数组
              const customers = Array.isArray(data) ? data : [];

              // 统计各个区域的用户数量
              const regionDistribution = customers.reduce((acc, customer) => {
                  if (customer.region) {
                      acc[customer.region] = (acc[customer.region] || 0) + 1;
                  }
                  return acc;
              }, {} as Record<string, number>);

              // 如果没有数据，显示提示信息
              if (Object.keys(regionDistribution).length === 0) {
                  return <p>No data available for regions.</p>;
              }

              // 准备饼图数据
              const pieChartData = {
                  labels: Object.keys(regionDistribution),
                  datasets: [
                      {
                          data: Object.values(regionDistribution),
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                          hoverOffset: 4,
                      },
                  ],
              };

              const pieChartOptions = {
                  responsive: true,
                  plugins: {
                      legend: {
                          position: 'top' as const,
                      },
                      title: {
                          display: true,
                          text: 'User Distribution by Region',
                      },
                  },
              };

              return (
                  <Grid item xs={12}>
                      <h3>User Distribution by Region</h3>
                      <Pie data={pieChartData} options={pieChartOptions} />
                  </Grid>
              );
          }}
      />
  </ListBase>
);

const UserAgeDistributionChart = () => (
  <ListBase resource="Customer" disableSyncWithLocation perPage={100}>
      <WithListContext
          render={({ data, isLoading }) => {
              if (isLoading) {
                  return <p>Loading...</p>;
              }

              // 确保 data 是一个数组
              const customers = Array.isArray(data) ? data : [];

              // 统计年龄段分布
              const ageDistribution = customers.reduce((acc, customer) => {
                  const age = customer.age;
                  if (age >= 18 && age <= 25) {
                      acc['18-25'] = (acc['18-25'] || 0) + 1;
                  } else if (age >= 26 && age <= 35) {
                      acc['26-35'] = (acc['26-35'] || 0) + 1;
                  } else if (age >= 36 && age <= 45) {
                      acc['36-45'] = (acc['36-45'] || 0) + 1;
                  } else {
                      acc['46+'] = (acc['46+'] || 0) + 1;
                  }
                  return acc;
              }, {} as Record<string, number>);

              // 准备饼图数据
              const pieChartData = {
                  labels: Object.keys(ageDistribution),
                  datasets: [
                      {
                          data: Object.values(ageDistribution),
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                          hoverOffset: 4,
                      },
                  ],
              };

              const pieChartOptions = {
                  responsive: true,
                  plugins: {
                      legend: {
                          position: 'top' as const,
                      },
                      title: {
                          display: true,
                          text: 'User Age Distribution',
                      },
                  },
              };

              return (
                  <Grid item xs={12}>
                      <h3>User Age Distribution</h3>
                      <Pie data={pieChartData} options={pieChartOptions} />
                  </Grid>
              );
          }}
      />
  </ListBase>
);

const LoyaltyScoreDistributionChart = () => (
  <ListBase resource="Customer" disableSyncWithLocation perPage={100}>
    <WithListContext
      render={({ data, isLoading }) => {
        if (isLoading) {
          return <p>Loading...</p>;
        }

        // 确保 data 是一个数组
        const customers = Array.isArray(data) ? data : [];

        // 统计忠诚度分数的区间分布
        const loyaltyDistribution = customers.reduce((acc, customer) => {
          const loyalty = customer.loyalty_score;

          if (loyalty <= 3) {
            acc["0-3"] = (acc["0-3"] || 0) + 1;
          } else if (loyalty <= 5) {
            acc["3-5"] = (acc["3-5"] || 0) + 1;
          } else {
            acc["5+"] = (acc["5+"] || 0) + 1;
          }

          return acc;
        }, {} as Record<string, number>);

        // 手动设置排序顺序：0-3, 3-5, 5+
        const sortedLabels = ["0-3", "3-5", "5+"];

        // 准备柱状图数据
        const barChartData = {
          labels: sortedLabels,  // 确保标签的顺序是按顺序排列的
          datasets: [
            {
              label: "User Count by Loyalty Score",
              data: sortedLabels.map(label => loyaltyDistribution[label] || 0), // 根据排序顺序获取对应的数据
              backgroundColor: "#FFCE56",  // 设置柱子的颜色
              borderColor: "#FFCE56",      // 边框颜色
              borderWidth: 1,              // 边框宽度
            },
          ],
        };

        // 配置柱状图的选项
        const barChartOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "User Distribution by Loyalty Score",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Loyalty Score",
              },
            },
            y: {
              title: {
                display: true,
                text: "User Count",
              },
              beginAtZero: true, // Y轴从0开始
            },
          },
        };

        return (
          <Grid item xs={12}>
            <h3>User Distribution by Loyalty Score</h3>
            <Bar data={barChartData} options={barChartOptions} />
          </Grid>
        );
      }}
    />
  </ListBase>
);


const IncomeVsPurchaseChart = () => (
  <ListBase resource="Customer" disableSyncWithLocation perPage={100}>
    <WithListContext
      render={({ data, isLoading }) => {
        if (isLoading) {
          return <p>Loading...</p>;
        }

        // 确保 data 是一个数组
        const customers = Array.isArray(data) ? data : [];

        // 准备散点图数据
        const scatterData = {
          datasets: [
            {
              label: "Income vs Purchase Amount",
              data: customers.map((customer) => ({
                x: customer.annual_income, // 年收入
                y: customer.purchase_amount, // 购买金额
                r: 5, // 点的大小，可以根据需求调整
              })),
              backgroundColor: "rgba(75, 192, 192, 1)", // 点的颜色
            },
          ],
        };

        // 配置散点图的选项
        const scatterOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Annual Income vs Purchase Amount",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Annual Income",
              },
            },
            y: {
              title: {
                display: true,
                text: "Purchase Amount",
              },
              beginAtZero: true, // Y轴从0开始
            },
          },
        };

        return (
          <Grid item xs={12}>
            <h3>Annual Income vs Purchase Amount</h3>
            <Scatter data={scatterData} options={scatterOptions} />
          </Grid>
        );
      }}
    />
  </ListBase>
);

export const ChartPage1 = (props: any) => {
    return (
        <div style={{ padding: 16 }}>
            <Grid container>
                <Grid item xs={8} md={8} >
                    <PurchaseFrequencyAmountChart />
                </Grid>

                <Grid item xs={4} md={4} >
                <UserDistributionByRegionChart />
                </Grid>
                <Grid item xs={4} md={4} >
                <UserAgeDistributionChart />
                </Grid>
                <Grid item xs={8} md={8} >
             <LoyaltyScoreDistributionChart/>
                </Grid>
                <Grid item xs={12} md={12} >
                <IncomeVsPurchaseChart/>
                </Grid>

            </Grid>
        </div>
    )


}