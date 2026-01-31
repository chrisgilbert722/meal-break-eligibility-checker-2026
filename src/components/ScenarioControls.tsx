import React from 'react';
import type { MealBreakInput } from '../logic/mealBreakCalculations';

interface ScenarioControlsProps {
    values: MealBreakInput;
    onChange: (field: keyof MealBreakInput, value: number | boolean | string) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const hoursOptions = [
        { label: '4 hrs', value: 4 },
        { label: '6 hrs', value: 6 },
        { label: '8 hrs', value: 8 },
        { label: '10 hrs', value: 10 },
    ];

    const stateOptions = [
        { label: 'CA', value: 'CA' },
        { label: 'NY', value: 'NY' },
        { label: 'TX', value: 'TX' },
        { label: 'WA', value: 'WA' },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Hours Worked Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Hours Worked</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {hoursOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('hoursWorked', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.hoursWorked === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.hoursWorked === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.hoursWorked === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* State Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>State</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {stateOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('state', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.state === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.state === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.state === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
