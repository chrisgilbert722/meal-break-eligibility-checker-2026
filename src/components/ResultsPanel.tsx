import React from 'react';
import type { MealBreakResult } from '../logic/mealBreakCalculations';

interface ResultsPanelProps {
    result: MealBreakResult;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const getStatusColor = () => {
        if (result.isEligible) return '#166534';
        if (result.stateHasLaw) return '#92400e';
        return '#6b7280';
    };

    const getStatusBg = () => {
        if (result.isEligible) return 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)';
        if (result.stateHasLaw) return 'linear-gradient(to bottom, #FFFBEB, #FEF3C7)';
        return 'linear-gradient(to bottom, #F9FAFB, #F3F4F6)';
    };

    const getBorderColor = () => {
        if (result.isEligible) return '#86EFAC';
        if (result.stateHasLaw) return '#FCD34D';
        return '#D1D5DB';
    };

    const getEligibilityLabel = () => {
        if (result.isEligible) return 'Eligible for Meal Break';
        if (result.stateHasLaw) return 'Below Threshold';
        return 'No State Requirement';
    };

    return (
        <div className="card" style={{
            background: getStatusBg(),
            borderColor: getBorderColor(),
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Meal Break Eligibility
                </h2>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: getStatusColor(),
                    lineHeight: 1.2,
                    letterSpacing: '-0.025em'
                }}>
                    {getEligibilityLabel()}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.message}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: `1px solid ${getBorderColor()}`
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>BREAK LENGTH</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: result.isEligible ? '#166534' : '#6b7280' }}>
                        {result.isEligible ? `${result.breakLengthMinutes} min` : 'N/A'}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${getBorderColor()}`, borderRight: `1px solid ${getBorderColor()}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>BREAK TYPE</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {result.breakType === 'paid' ? 'Paid' : result.breakType === 'unpaid' ? 'Unpaid' : 'N/A'}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>STATE LAW</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: result.stateHasLaw ? '#166534' : '#6b7280' }}>
                        {result.stateHasLaw ? 'Yes' : 'No'}
                    </div>
                </div>
            </div>
        </div>
    );
};
