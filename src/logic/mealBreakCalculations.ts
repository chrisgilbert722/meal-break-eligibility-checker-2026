export interface MealBreakInput {
    state: string;
    hoursWorked: number;
    industryType: 'general' | 'healthcare' | 'retail' | 'food_service' | 'manufacturing';
    employeeAge: 'adult' | 'minor';
}

export interface StateFactor {
    factor: string;
    value: string;
    description: string;
}

export interface MealBreakResult {
    isEligible: boolean;
    breakLengthMinutes: number;
    breakType: 'paid' | 'unpaid' | 'none';
    stateHasLaw: boolean;
    factors: StateFactor[];
    message: string;
    additionalNotes: string[];
}

// States with meal break laws
const STATES_WITH_MEAL_LAWS: Record<string, { threshold: number; breakLength: number; paid: boolean }> = {
    'CA': { threshold: 5, breakLength: 30, paid: false },
    'CO': { threshold: 5, breakLength: 30, paid: false },
    'CT': { threshold: 7.5, breakLength: 30, paid: false },
    'DE': { threshold: 7.5, breakLength: 30, paid: false },
    'IL': { threshold: 7.5, breakLength: 20, paid: false },
    'KY': { threshold: 5, breakLength: 30, paid: false },
    'MA': { threshold: 6, breakLength: 30, paid: false },
    'MN': { threshold: 8, breakLength: 30, paid: false },
    'NE': { threshold: 8, breakLength: 30, paid: false },
    'NV': { threshold: 8, breakLength: 30, paid: false },
    'NH': { threshold: 5, breakLength: 30, paid: false },
    'NY': { threshold: 6, breakLength: 30, paid: false },
    'ND': { threshold: 5, breakLength: 30, paid: false },
    'OR': { threshold: 6, breakLength: 30, paid: false },
    'RI': { threshold: 6, breakLength: 20, paid: false },
    'TN': { threshold: 6, breakLength: 30, paid: false },
    'WA': { threshold: 5, breakLength: 30, paid: false },
    'WV': { threshold: 6, breakLength: 20, paid: false },
};

// Minor-specific rules (stricter in many states)
const MINOR_RULES: Record<string, { threshold: number; breakLength: number }> = {
    'CA': { threshold: 5, breakLength: 30 },
    'CO': { threshold: 5, breakLength: 30 },
    'FL': { threshold: 4, breakLength: 30 },
    'IL': { threshold: 5, breakLength: 30 },
    'MA': { threshold: 6, breakLength: 30 },
    'NY': { threshold: 6, breakLength: 30 },
    'OH': { threshold: 5, breakLength: 30 },
    'PA': { threshold: 5, breakLength: 30 },
    'WA': { threshold: 4, breakLength: 30 },
};

export function calculateMealBreak(input: MealBreakInput): MealBreakResult {
    const { state, hoursWorked, industryType, employeeAge } = input;

    const factors: StateFactor[] = [];
    const additionalNotes: string[] = [];
    let isEligible = false;
    let breakLengthMinutes = 0;
    let breakType: 'paid' | 'unpaid' | 'none' = 'none';
    let stateHasLaw = false;

    const stateUpper = state.toUpperCase();
    const stateRule = STATES_WITH_MEAL_LAWS[stateUpper];
    const minorRule = MINOR_RULES[stateUpper];

    // Check state law
    if (stateRule) {
        stateHasLaw = true;
        factors.push({
            factor: 'State Law',
            value: 'Has meal break law',
            description: `${stateUpper} requires meal breaks`
        });
    } else {
        factors.push({
            factor: 'State Law',
            value: 'No state requirement',
            description: 'Federal law does not require meal breaks'
        });
    }

    // Add hours worked factor
    factors.push({
        factor: 'Hours Worked',
        value: `${hoursWorked} hours`,
        description: hoursWorked >= 6 ? 'Typical threshold for meal break' : 'Below common threshold'
    });

    // Add employee age factor
    factors.push({
        factor: 'Employee Age',
        value: employeeAge === 'minor' ? 'Minor (under 18)' : 'Adult (18+)',
        description: employeeAge === 'minor' ? 'May have stricter requirements' : 'Standard rules apply'
    });

    // Add industry factor
    const industryLabels: Record<string, string> = {
        'general': 'General',
        'healthcare': 'Healthcare',
        'retail': 'Retail',
        'food_service': 'Food Service',
        'manufacturing': 'Manufacturing'
    };
    factors.push({
        factor: 'Industry',
        value: industryLabels[industryType],
        description: industryType === 'healthcare' ? 'May have exceptions' : 'Standard rules apply'
    });

    // Determine eligibility
    if (employeeAge === 'minor' && minorRule) {
        if (hoursWorked >= minorRule.threshold) {
            isEligible = true;
            breakLengthMinutes = minorRule.breakLength;
            breakType = 'unpaid';
            additionalNotes.push(`Minors in ${stateUpper} require a ${minorRule.breakLength}-minute break after ${minorRule.threshold} hours`);
        }
    } else if (stateRule) {
        if (hoursWorked >= stateRule.threshold) {
            isEligible = true;
            breakLengthMinutes = stateRule.breakLength;
            breakType = stateRule.paid ? 'paid' : 'unpaid';
        }
    }

    // Federal fallback
    if (!stateHasLaw && !isEligible) {
        if (hoursWorked >= 6) {
            additionalNotes.push('While not legally required, many employers provide meal breaks for shifts of 6+ hours');
        }
    }

    // Industry-specific notes
    if (industryType === 'healthcare' && stateHasLaw) {
        additionalNotes.push('Healthcare workers may have on-duty meal period exceptions');
    }

    // Generate message
    let message: string;
    if (isEligible) {
        message = `Estimated eligible for ${breakLengthMinutes}-minute meal break`;
    } else if (stateHasLaw) {
        message = `Below ${stateUpper} threshold for required meal break`;
    } else {
        message = 'No state meal break requirement - check employer policy';
    }

    return {
        isEligible,
        breakLengthMinutes,
        breakType,
        stateHasLaw,
        factors,
        message,
        additionalNotes
    };
}
