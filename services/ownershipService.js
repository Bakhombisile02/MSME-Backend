/**
 * Ownership Service
 * Handles validation and computation for business ownership data
 */

/**
 * Validates ownership type matches the number of owners
 * @param {string} ownershipType - 'Individual' or 'Partnership'
 * @param {Array} owners - Array of owner objects with gender field
 * @returns {Object} { valid: boolean, error: string|null }
 */
function validateOwnership(ownershipType, owners) {
    if (!ownershipType) {
        return { valid: false, error: 'Ownership type is required' };
    }

    if (!owners || !Array.isArray(owners)) {
        return { valid: false, error: 'Owners array is required' };
    }

    if (ownershipType === 'Individual') {
        if (owners.length !== 1) {
            return { 
                valid: false, 
                error: 'Individual ownership requires exactly 1 owner' 
            };
        }
    } else if (ownershipType === 'Partnership') {
        if (owners.length < 2 || owners.length > 5) {
            return { 
                valid: false, 
                error: 'Partnership requires 2-5 owners' 
            };
        }
    } else {
        return { 
            valid: false, 
            error: 'Invalid ownership type. Must be "Individual" or "Partnership"' 
        };
    }

    // Validate each owner has a gender
    for (let i = 0; i < owners.length; i++) {
        if (!owners[i].gender || !['Male', 'Female'].includes(owners[i].gender)) {
            return { 
                valid: false, 
                error: `Owner ${i + 1} must have a valid gender (Male or Female)` 
            };
        }
    }

    return { valid: true, error: null };
}

/**
 * Computes the gender summary from an array of owners
 * @param {Array} owners - Array of owner objects with gender field
 * @returns {string} 'Male', 'Female', 'Both', or null
 */
function computeGenderSummary(owners) {
    if (!owners || owners.length === 0) {
        return null;
    }

    const genders = owners.map(o => o.gender);
    const uniqueGenders = [...new Set(genders)];

    if (uniqueGenders.length > 1) {
        return 'Both';
    }

    return uniqueGenders[0]; // 'Male' or 'Female'
}

/**
 * Validates additional required fields
 * @param {Object} data - Business data object
 * @returns {Object} { valid: boolean, error: string|null }
 */
function validateAdditionalFields(data) {
    if (!data.inkhundla || data.inkhundla.trim() === '') {
        return { valid: false, error: 'Inkhundla is required' };
    }

    const validClassifications = ['Rural', 'Urban', 'Semi Urban'];
    if (!data.rural_urban_classification || 
        !validClassifications.includes(data.rural_urban_classification)) {
        return { 
            valid: false, 
            error: 'Valid rural urban classification is required (Rural, Urban, or Semi Urban)' 
        };
    }

    return { valid: true, error: null };
}

/**
 * Validates directors have nationality field
 * @param {Array} directors - Array of director objects
 * @returns {Object} { valid: boolean, error: string|null }
 */
function validateDirectorsNationality(directors) {
    if (!directors || !Array.isArray(directors)) {
        return { valid: true, error: null }; // Optional if no directors
    }

    const validNationalities = ['Swazi', 'Non Swazi'];
    
    for (let i = 0; i < directors.length; i++) {
        if (!directors[i].nationality || 
            !validNationalities.includes(directors[i].nationality)) {
            return { 
                valid: false, 
                error: `Director ${i + 1} must have a valid nationality (Swazi or Non Swazi)` 
            };
        }
    }

    return { valid: true, error: null };
}

module.exports = {
    validateOwnership,
    computeGenderSummary,
    validateAdditionalFields,
    validateDirectorsNationality
};
