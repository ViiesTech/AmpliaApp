/**
 * Amplia Tax Complexity Scoring Framework
 */

export const SCORING_RULES = {
    BASE_RETURN: 10,
    INCOME_DOCUMENTS: {
        W2: 2,
        NEC_MISC_1099: 3,
        K1: 4,
        SSA_1099: 1,
        UNEMPLOYMENT_1099G: 1,
    },
    BUSINESS_INVESTMENT: {
        SCHEDULE_C: 6,
        RENTAL_PROPERTY: 5,
        CAPITAL_GAINS: 3,
        CRYPTO: 6,
        STATE_FILING_ADDITIONAL: 4,
    },
    SPECIAL_SITUATIONS: {
        FOREIGN_INCOME: 10,
        ITIN_APPLICATION: 8,
        AMENDED_RETURN: 8,
        PRIOR_YEAR_ISSUES: 6,
    },
    DEPENDENTS_CREDITS: {
        DEPENDENT_AFTER_FIRST: 1,
        CHILDCARE_CREDIT: 2,
        EDUCATION_CREDIT: 2,
    }
};

export const TIERS = {
    TIER_1: { name: 'Simple', min: 10, max: 15, basePrice: 150 },
    TIER_2: { name: 'Standard', min: 16, max: 25, basePrice: 250 },
    TIER_3: { name: 'Complex', min: 26, max: 40, basePrice: 350 },
    TIER_4: { name: 'Advanced', min: 41, max: Infinity, basePrice: 500 }, // Manual Review
};

/**
 * Calculates the complexity score based on document counts and flags.
 * @param {Object} data - Document counts and situation flags
 * @returns {number} complexity score
 */
export const calculateComplexityScore = (data) => {
    let score = SCORING_RULES.BASE_RETURN;

    // Income Documents
    score += (data.w2Count || 0) * SCORING_RULES.INCOME_DOCUMENTS.W2;
    score += (data.necMisc1099Count || 0) * SCORING_RULES.INCOME_DOCUMENTS.NEC_MISC_1099;
    score += (data.k1Count || 0) * SCORING_RULES.INCOME_DOCUMENTS.K1;
    score += (data.ssa1099Count || 0) * SCORING_RULES.INCOME_DOCUMENTS.SSA_1099;
    score += (data.unemploymentCount || 0) * SCORING_RULES.INCOME_DOCUMENTS.UNEMPLOYMENT_1099G;

    // Business & Investment
    if (data.hasScheduleC) score += SCORING_RULES.BUSINESS_INVESTMENT.SCHEDULE_C;
    score += (data.rentalPropertyCount || 0) * SCORING_RULES.BUSINESS_INVESTMENT.RENTAL_PROPERTY;
    if (data.hasCapitalGains) score += SCORING_RULES.BUSINESS_INVESTMENT.CAPITAL_GAINS;
    if (data.hasCrypto) score += SCORING_RULES.BUSINESS_INVESTMENT.CRYPTO;
    score += (data.additionalStatesCount || 0) * SCORING_RULES.BUSINESS_INVESTMENT.STATE_FILING_ADDITIONAL;

    // Special Situations
    if (data.hasForeignIncome) score += SCORING_RULES.SPECIAL_SITUATIONS.FOREIGN_INCOME;
    if (data.hasITIN) score += SCORING_RULES.SPECIAL_SITUATIONS.ITIN_APPLICATION;
    if (data.isAmended) score += SCORING_RULES.SPECIAL_SITUATIONS.AMENDED_RETURN;
    if (data.hasPriorYearIssues) score += SCORING_RULES.SPECIAL_SITUATIONS.PRIOR_YEAR_ISSUES;

    // Dependents & Credits
    if (data.dependentCount > 1) {
        score += (data.dependentCount - 1) * SCORING_RULES.DEPENDENTS_CREDITS.DEPENDENT_AFTER_FIRST;
    }
    if (data.hasChildcareCredit) score += SCORING_RULES.DEPENDENTS_CREDITS.CHILDCARE_CREDIT;
    if (data.hasEducationCredit) score += SCORING_RULES.DEPENDENTS_CREDITS.EDUCATION_CREDIT;

    return score;
};

/**
 * Determines the complexity tier and base price for a given score.
 * @param {number} score 
 * @returns {Object} Tier information
 */
export const getTierInfo = (score) => {
    if (score <= TIERS.TIER_1.max) return TIERS.TIER_1;
    if (score <= TIERS.TIER_2.max) return TIERS.TIER_2;
    if (score <= TIERS.TIER_3.max) return TIERS.TIER_3;
    return TIERS.TIER_4;
};

/**
 * Checks if a change in documents is material.
 * @param {Object} oldData 
 * @param {Object} newData 
 * @returns {Object} { isMaterial: boolean, reasons: string[] }
 */
export const detectMaterialChange = (oldData, newData) => {
    const oldScore = calculateComplexityScore(oldData);
    const newScore = calculateComplexityScore(newData);
    const oldTier = getTierInfo(oldScore);
    const newTier = getTierInfo(newScore);

    const reasons = [];

    // 1. Tier Change
    if (newTier.name !== oldTier.name) {
        reasons.push('Complexity tier increased');
    }

    // 2. Addition of 3+ income documents at once
    const oldIncomeCount = (oldData.w2Count || 0) + (oldData.necMisc1099Count || 0) + (oldData.k1Count || 0) + (oldData.ssa1099Count || 0) + (oldData.unemploymentCount || 0);
    const newIncomeCount = (newData.w2Count || 0) + (newData.necMisc1099Count || 0) + (newData.k1Count || 0) + (newData.ssa1099Count || 0) + (newData.unemploymentCount || 0);
    if (newIncomeCount - oldIncomeCount >= 3) {
        reasons.push('Added 3 or more income documents');
    }

    // 3. Introduction of a new complexity category
    if (!oldData.hasScheduleC && newData.hasScheduleC) reasons.push('Added Self-Employment (Schedule C)');
    if ((oldData.rentalPropertyCount || 0) === 0 && (newData.rentalPropertyCount || 0) > 0) reasons.push('Added Rental Property');
    if (!oldData.hasCrypto && newData.hasCrypto) reasons.push('Added Crypto Statements');
    if (!oldData.hasForeignIncome && newData.hasForeignIncome) reasons.push('Added Foreign Income/Assets');
    if (!oldData.hasITIN && newData.hasITIN) reasons.push('Added ITIN Application');
    if ((oldData.k1Count || 0) === 0 && (newData.k1Count || 0) > 0) reasons.push('Added K-1 Statements');

    return {
        isMaterial: reasons.length > 0,
        reasons
    };
};
