import React from 'react';
import Plot from 'react-plotly.js';
import { ListBase, WithListContext } from 'react-admin';
import { Grid } from '@mui/material';

export const ChartPage2 = () => (
    <ListBase resource="Customer" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                // Convert data object to an array and sort by user_id or any other relevant field
                const dataArray = data ? Object.values(data).sort((a, b) => a.user_id - b.user_id) : [];

                // Extract the required data for 3D scatter plot
                const age = dataArray.map(item => item.age);
                const annualIncome = dataArray.map(item => item.annual_income);
                const purchaseAmount = dataArray.map(item => item.purchase_amount);

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h2>3D Scatter Plot of Customer Data</h2>
                            <Plot
                                data={[
                                    {
                                        x: age,
                                        y: annualIncome,
                                        z: purchaseAmount,
                                        mode: 'markers',
                                        type: 'scatter3d',
                                        marker: {
                                            size: 5,
                                            color: purchaseAmount, // Color markers based on purchase amount
                                            colorscale: 'Viridis', // Color scale for markers
                                            showscale: true // Adds a color scale legend
                                        }
                                    }
                                ]}
                                layout={{
                                    title: 'Age vs Annual Income vs Purchase Amount',
                                    scene: {
                                        xaxis: { title: 'Age (years)' },
                                        yaxis: { title: 'Annual Income ($)' },
                                        zaxis: { title: 'Purchase Amount ($)' },
                                    },
                                    width: 800,
                                    height: 600,
                                    margin: { l: 0, r: 0, b: 0, t: 40 }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            }}
        />
    </ListBase>
);
