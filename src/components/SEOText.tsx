import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This meal break eligibility checker estimates whether you may be entitled to a meal break based
                on your state's labor laws and hours worked per shift. These are estimates only and should not
                be considered legal advice. Meal break laws vary by state, with some states having no specific
                requirements while others mandate breaks after certain hours. Industry type and employee age may
                also affect eligibility. Consult your employer's policies or a labor law professional for
                specific guidance.
            </p>
        </div>
    );
};
