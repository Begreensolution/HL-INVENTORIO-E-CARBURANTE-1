import React from 'react';
import AnomalyAlerts from './AnomalyAlerts';
import CostAnalysis from './CostAnalysis';
import DriverOverview from './DriverOverview';

export default function InventoryAnalytics() {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <AnomalyAlerts />
      <CostAnalysis />
      <DriverOverview />
    </div>
  );
}