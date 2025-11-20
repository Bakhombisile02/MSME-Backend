# Advanced Search Filters Update - Backend

## Changes Made

### 1. Enhanced filtersAPI Controller (`controllers/msmeBusiness.contoller.js`)

**New Filter Parameters Supported:**
- `business_category_id` - Category ID
- `business_sub_category_id` - Sub-category ID
- `region` - Business region
- `inkhundla` - Constituency within region
- `town` - Town/city name (exact match)
- `rural_urban_classification` - Rural/Urban/Semi Urban
- `employees` - Employee count range
- `establishment_year` - Year established
- `turnover` - Turnover range
- `ownerType` - Legacy owner type field
- `ownership_type` - Individual/Partnership
- `owner_gender` - Male/Female/Both (uses owner_gender_summary)
- `business_type` - Registered/Unregistered
- `disability_owned` - Yes/No
- `keyword` - Full-text search across name, products, services, description, address
- `sort` - newest/oldest/name_asc/name_desc

**Key Features:**
- All filters use exact match except `keyword` which uses LIKE %...% across multiple columns
- Empty/All values are ignored
- Maintains backward compatibility with existing query params
- Built with Sequelize Op.or for keyword and combined with Op.and implicit in where clause

### 2. API Wrapper Update (`src/apis/business-category-api.js`)

**getBusinessListfilter** now:
- Accepts all new filter fields
- Supports both legacy keys (businessType, isDisabilityOwned) and new keys
- Properly handles pagination via `page` parameter
- Sends sort parameter to backend

## Security & Performance Notes

**Current Implementation:**
- Uses Sequelize parameterized queries (safe from SQL injection)
- All string filters are whitelisted or validated before DB query
- Keyword search uses LIKE with wildcards (potential perf issue on large datasets)

**Recommendations:**
- Add DB indexes on frequently filtered columns: `region`, `business_category_id`, `business_sub_category_id`, `business_type`, `disability_owned`
- Consider full-text search index for keyword search columns if dataset grows
- Add query result caching (Redis) for popular filter combinations
- Rate-limit the filters endpoint to prevent abuse

## Testing Checklist

- [ ] Test each filter individually
- [ ] Test combinations of filters
- [ ] Test keyword search with special characters
- [ ] Test pagination with filters
- [ ] Test sorting options
- [ ] Verify backward compatibility with existing categoryId/region/keyword URL params
- [ ] Load test with concurrent requests
- [ ] Verify no SQL injection via malformed params

## Database Indexes (Recommended)

```sql
CREATE INDEX idx_msme_category ON MSMEBusiness(business_category_id);
CREATE INDEX idx_msme_subcategory ON MSMEBusiness(business_sub_category_id);
CREATE INDEX idx_msme_region ON MSMEBusiness(region);
CREATE INDEX idx_msme_inkhundla ON MSMEBusiness(inkhundla);
CREATE INDEX idx_msme_verified ON MSMEBusiness(is_verified);
CREATE INDEX idx_msme_business_type ON MSMEBusiness(business_type);
CREATE INDEX idx_msme_disability ON MSMEBusiness(disability_owned);
CREATE INDEX idx_msme_owner_gender ON MSMEBusiness(owner_gender_summary);
-- Full-text index for keyword search (MySQL)
ALTER TABLE MSMEBusiness ADD FULLTEXT INDEX ft_msme_search (name_of_organization, product_offered, service_offered, brief_company_description);
```
