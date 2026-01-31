import React from 'react';
import type { MealBreakInput } from '../logic/mealBreakCalculations';

interface InputCardProps {
    values: MealBreakInput;
    onChange: (field: keyof MealBreakInput, value: number | boolean | string) => void;
}

const selectStyle = {
    width: '100%',
    padding: 'var(--space-3)',
    fontSize: '1rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    background: '#fff'
};

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* State of Employment */}
                <div>
                    <label htmlFor="state">State of Employment</label>
                    <select
                        id="state"
                        value={values.state}
                        onChange={(e) => onChange('state', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="IL">Illinois</option>
                        <option value="KY">Kentucky</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MN">Minnesota</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NY">New York</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="OTHER">Other State</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        State where work is performed
                    </span>
                </div>

                {/* Hours Worked Per Shift */}
                <div>
                    <label htmlFor="hoursWorked">Hours Worked Per Shift</label>
                    <input
                        type="number"
                        id="hoursWorked"
                        value={values.hoursWorked}
                        onChange={(e) => onChange('hoursWorked', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="24"
                        step="0.5"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Total hours in a single shift
                    </span>
                </div>

                {/* Industry Type */}
                <div>
                    <label htmlFor="industryType">Industry Type</label>
                    <select
                        id="industryType"
                        value={values.industryType}
                        onChange={(e) => onChange('industryType', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="general">General/Office</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="retail">Retail</option>
                        <option value="food_service">Food Service</option>
                        <option value="manufacturing">Manufacturing</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Some industries have specific rules
                    </span>
                </div>

                {/* Employee Age */}
                <div>
                    <label htmlFor="employeeAge">Employee Age</label>
                    <select
                        id="employeeAge"
                        value={values.employeeAge}
                        onChange={(e) => onChange('employeeAge', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="adult">Adult (18 or older)</option>
                        <option value="minor">Minor (under 18)</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Minors often have stricter break requirements
                    </span>
                </div>
            </div>
        </div>
    );
};
