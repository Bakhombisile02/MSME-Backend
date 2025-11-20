# Controller Update Guide for msmeBusiness.contoller.js

## Changes Required

### 1. Import Statement (DONE)
```javascript
const ownershipService = require('../services/ownershipService');
```

### 2. Update `add` Function

**Find this line:**
```javascript
const { directorsInfo, ...msmeData } = req.body;
```

**Replace with:**
```javascript
const { directorsInfo, owners, ...msmeData } = req.body;

// Validate ownership type and owners array
const ownershipValidation = ownershipService.validateOwnership(
    msmeData.ownership_type, 
    owners
);
if (!ownershipValidation.valid) {
    return res.status(400).json({ error: ownershipValidation.error });
}

// Validate additional required fields
const fieldsValidation = ownershipService.validateAdditionalFields(msmeData);
if (!fieldsValidation.valid) {
    return res.status(400).json({ error: fieldsValidation.error });
}

// Validate directors nationality
const directorsValidation = ownershipService.validateDirectorsNationality(directorsInfo);
if (!directorsValidation.valid) {
    return res.status(400).json({ error: directorsValidation.error });
}

// Compute owner gender summary (server-side only)
msmeData.owner_gender_summary = ownershipService.computeGenderSummary(owners);
```

**After creating MSME record, add:**
```javascript
// Create business_owners records
if (owners && owners.length > 0) {
    const ownerRecords = owners.map(owner => ({
        business_id: msme.id,
        gender: owner.gender
    }));
    const createdOwners = await BaseRepo.baseBulkCreate(
        BusinessOwnersModel, 
        ownerRecords
    );
    if (!createdOwners) {
        return res.status(400).json({ error: 'Error creating business owners' });
    }
}
```

### 3. Update `update` Function

**Add after validation:**
```javascript
const { directorsInfo, owners, ...msmeData } = req.body;

// Validate ownership if provided
if (owners && msmeData.ownership_type) {
    const ownershipValidation = ownershipService.validateOwnership(
        msmeData.ownership_type, 
        owners
    );
    if (!ownershipValidation.valid) {
        return res.status(400).json({ error: ownershipValidation.error });
    }
    
    // Compute gender summary
    msmeData.owner_gender_summary = ownershipService.computeGenderSummary(owners);
    
    // Delete existing owners for this business
    await BusinessOwnersModel.destroy({ where: { business_id: id } });
    
    // Insert new owners
    const ownerRecords = owners.map(owner => ({
        business_id: id,
        gender: owner.gender
    }));
    await BaseRepo.baseBulkCreate(BusinessOwnersModel, ownerRecords);
}

// Validate additional fields if provided
if (msmeData.inkhundla || msmeData.rural_urban_classification) {
    const fieldsValidation = ownershipService.validateAdditionalFields({
        inkhundla: msmeData.inkhundla || 'temp',
        rural_urban_classification: msmeData.rural_urban_classification || 'Rural'
    });
    if (!fieldsValidation.valid) {
        return res.status(400).json({ error: fieldsValidation.error });
    }
}

// Validate directors nationality if provided
if (directorsInfo) {
    const directorsValidation = ownershipService.validateDirectorsNationality(directorsInfo);
    if (!directorsValidation.valid) {
        return res.status(400).json({ error: directorsValidation.error });
    }
}
```

### 4. Update `getMSMEDetails` Function

**After fetching directors, add:**
```javascript
// Fetch business owners
const owners = await BaseRepo.baseFindAllById(
    BusinessOwnersModel,
    'business_id',
    id
);

return res.status(200).json({
    message: "Business found",
    msmeDetails,
    directorsDetail,
    owners: owners || []
});
```

### 5. Import BusinessOwnersModel

**At the top of the file, find model imports and add:**
```javascript
const { BusinessOwnersModel } = require('../models');
```

## Testing Checklist

After making these changes:

- [ ] Test creating business with Individual ownership (1 owner)
- [ ] Test creating business with Partnership ownership (2-5 owners)
- [ ] Test validation: Individual with 2+ owners (should fail)
- [ ] Test validation: Partnership with 1 owner (should fail)
- [ ] Test validation: Missing inkhundla (should fail)
- [ ] Test validation: Invalid rural_urban_classification (should fail)
- [ ] Test validation: Director without nationality (should fail)
- [ ] Test update business with new ownership data
- [ ] Test getMSMEDetails returns owners array
- [ ] Verify owner_gender_summary computed correctly (Male/Female/Both)

## Files to Check

After controller update, verify:
- Models are loaded in `/models/index.js` (auto-loaded)
- Migration files are ready to run
- Frontend API payload includes new fields
