const BaseRepo = require('../services/BaseRepository');
const { MSMEBusinessModel, DirectorsInfoModel,ServiceProvidersModel,BusinessCategoriesModel } = require('../models');
const { validationResult } = require('express-validator');

module.exports.getDashboardData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const year = req.params.year;

  console.log("Year:", year);

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel,"deletedAt",null, year);
    const totalMSMEApproved = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "is_verified", "2" ,year);
    const totalMSMERejected = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "3" , year);
    const totalMSMEPending = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "1", year);

    console.log(totalMSME, totalMSMEApproved, totalMSMERejected, totalMSMEPending);

    res.status(201).json({
      message: 'Dashboard data fetched successfully',
      data: {
        totalMSME,
        totalMSMEApproved,
        totalMSMERejected,
        totalMSMEPending
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports.getMSMETotalData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  console.log("Year:", year);

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel,"deletedAt",null, year);
    const totalMSMEApproved = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "is_verified", "2" ,year);
    const totalMSMERejected = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "3" , year);
    const totalMSMEPending = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "1", year);
    const totalOwnerFemale = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "ownerType", "Female" , year);
    const totalOwnerMale = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "ownerType", "Male" , year);
    const totalDisabilityOwned = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "disability_owned", "Yes", year);

    const totalMSMERagistered = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "business_type", "Registered" , year);
    const totalMSMEUnragistered = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "business_type", "Unregistered", year);
    
    console.log(totalMSME, totalMSMEApproved, totalMSMERejected, 
      totalMSMEPending,totalOwnerFemale, totalOwnerMale, totalDisabilityOwned,
      totalMSMERagistered, totalMSMEUnragistered
    );

    res.status(201).json({
      message: 'Dashboard MSME Total data fetched successfully',
      data: {
        totalMSME,
        totalMSMEApproved,
        totalMSMERejected,
        totalMSMEPending,
        totalOwnerFemale,
        totalOwnerMale,
        totalDisabilityOwned,
        totalMSMERagistered,
        totalMSMEUnragistered
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getMSMEDirectorsInfoData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  console.log("Year:", year);

  const params = {
    searchParams: {},
  }
  try {
    const totalDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,"deletedAt", null, year);
    const totalMaleDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "gender", "Male", year);
    const totalFemaleDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel, "gender", "Female", year);
    const totalOtherDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel, "gender", "Other" , year);
    const total18YearsOldDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "age", "18-25" , year);
    const total25YearsOldDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "age", "25-40", year);
    const total40YearsOldDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "age", "40+" , year);
    
    console.log(totalDirectors, totalMaleDirectors, totalFemaleDirectors, 
      total18YearsOldDirectors,total25YearsOldDirectors, total40YearsOldDirectors);

    res.status(201).json({
      message: 'Dashboard MSME Directors data fetched successfully',
      data: {
        totalDirectors,
        totalMaleDirectors,
        totalFemaleDirectors,
        totalOtherDirectors,
        total18YearsOldDirectors,
        total25YearsOldDirectors,
        total40YearsOldDirectors
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}





module.exports.getDashboardMSMERequestsData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardAlarts(MSMEBusinessModel, year);

    res.status(201).json({
      message: 'Dashboard MSME Requests Received Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardAccordingToTurnoverData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  console.log("Year:", year);

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel,"deletedAt",null, year);
    const totalMSMESmall = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "turnover", "small", year);
    const totalMSMEMicro = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "turnover", "micro" , year);
    const totalMSMEMedium = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "turnover", "medium" , year);

    console.log(totalMSME, totalMSMESmall, totalMSMEMicro, totalMSMEMedium);

    res.status(201).json({
      message: 'Dashboard MSME Turnover data fetched successfully',
      data: {
        totalMSME,
        totalMSMESmall,
        totalMSMEMicro,
        totalMSMEMedium
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports.getDashboardMSMERegionWiseData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardUserRigionWise(MSMEBusinessModel, year);

    res.status(201).json({
      message: 'Dashboard User Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports.getDashboardMSMEListAccordingToCategoryData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getMSMEDataAccordingToCategory(MSMEBusinessModel,BusinessCategoriesModel);

    res.status(201).json({
      message: 'Dashboard User Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardServiceProviderListAccordingToCategoryData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getServiceProviderDataAccordingToCategory(ServiceProvidersModel);

    res.status(201).json({
      message: 'Dashboard User Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


// ============== ADVANCED ANALYTICS ENDPOINTS ==============

/**
 * Get MSME Growth Trends - Registration trends over time
 */
module.exports.getMSMEGrowthTrends = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    
    // Get monthly registration trends for the last 12 months
    const monthlyTrends = await MSMEBusinessModel.findAll({
      attributes: [
        [fn('YEAR', col('createdAt')), 'year'],
        [fn('MONTH', col('createdAt')), 'month'],
        [fn('COUNT', col('id')), 'count'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '3' THEN 1 END)"), 'rejected'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '1' THEN 1 END)"), 'pending']
      ],
      group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
      order: [[fn('YEAR', col('createdAt')), 'DESC'], [fn('MONTH', col('createdAt')), 'DESC']],
      limit: 12,
      raw: true
    });

    // Calculate growth rate
    const growthData = monthlyTrends.reverse().map((month, index) => {
      if (index === 0) return { ...month, growth_rate: 0 };
      const prevCount = monthlyTrends[index - 1].count;
      const growth_rate = prevCount > 0 ? ((month.count - prevCount) / prevCount * 100).toFixed(2) : 0;
      return { ...month, growth_rate: parseFloat(growth_rate) };
    });

    res.status(200).json({
      message: 'Growth trends fetched successfully',
      data: growthData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Business Age Distribution & Survival Analysis
 */
module.exports.getBusinessAgeAnalysis = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col, literal } = Sequelize;
    
    const currentYear = new Date().getFullYear();
    
    const ageDistribution = await MSMEBusinessModel.findAll({
      attributes: [
        [literal(`CASE 
          WHEN establishment_year = '' OR establishment_year IS NULL THEN 'Unknown'
          WHEN ${currentYear} - CAST(establishment_year AS UNSIGNED) < 1 THEN '0-1 years'
          WHEN ${currentYear} - CAST(establishment_year AS UNSIGNED) BETWEEN 1 AND 3 THEN '1-3 years'
          WHEN ${currentYear} - CAST(establishment_year AS UNSIGNED) BETWEEN 3 AND 5 THEN '3-5 years'
          WHEN ${currentYear} - CAST(establishment_year AS UNSIGNED) BETWEEN 5 AND 10 THEN '5-10 years'
          ELSE '10+ years'
        END`), 'age_group'],
        [fn('COUNT', col('id')), 'count'],
        [literal("COUNT(id)"), 'count']
      ],
      group: ['age_group'],
      raw: true
    });

    res.status(200).json({
      message: 'Business age analysis fetched successfully',
      data: ageDistribution
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Category Performance Analytics
 */
module.exports.getCategoryPerformance = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    
    const categoryPerformance = await MSMEBusinessModel.findAll({
      attributes: [
        'business_category_name',
        [fn('COUNT', col('id')), 'total_count'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved_count'],
        [Sequelize.literal("COUNT(CASE WHEN ownerType = 'Female' THEN 1 END)"), 'female_owned'],
        [Sequelize.literal("COUNT(CASE WHEN disability_owned = 'Yes' THEN 1 END)"), 'disability_owned'],
        [Sequelize.literal("COUNT(CASE WHEN turnover = 'medium' THEN 1 END)"), 'medium_turnover']
      ],
      where: {
        business_category_name: { [Sequelize.Op.ne]: null }
      },
      group: ['business_category_name'],
      order: [[fn('COUNT', col('id')), 'DESC']],
      raw: true
    });

    // Calculate approval rate for each category
    const withMetrics = categoryPerformance.map(cat => ({
      ...cat,
      approval_rate: cat.total_count > 0 ? ((cat.approved_count / cat.total_count) * 100).toFixed(2) : 0,
      female_ownership_rate: cat.total_count > 0 ? ((cat.female_owned / cat.total_count) * 100).toFixed(2) : 0
    }));

    res.status(200).json({
      message: 'Category performance fetched successfully',
      data: withMetrics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Geographic Clustering Analysis
 */
module.exports.getGeographicAnalysis = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    
    const geoAnalysis = await MSMEBusinessModel.findAll({
      attributes: [
        'region',
        'rural_urban_classification',
        [fn('COUNT', col('id')), 'count'],
        [Sequelize.literal("COUNT(CASE WHEN ownerType = 'Female' THEN 1 END)"), 'female_owned'],
        [Sequelize.literal("COUNT(CASE WHEN business_type = 'Registered' THEN 1 END)"), 'registered']
      ],
      where: {
        region: { [Sequelize.Op.ne]: null }
      },
      group: ['region', 'rural_urban_classification'],
      order: [['region', 'ASC']],
      raw: true
    });

    res.status(200).json({
      message: 'Geographic analysis fetched successfully',
      data: geoAnalysis
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Employee Size Distribution
 */
module.exports.getEmployeeSizeDistribution = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col, literal } = Sequelize;
    
    const employeeDistribution = await MSMEBusinessModel.findAll({
      attributes: [
        'employees',
        [fn('COUNT', col('id')), 'count'],
        'business_category_name'
      ],
      where: {
        employees: { [Sequelize.Op.ne]: null }
      },
      group: ['employees', 'business_category_name'],
      order: [[fn('COUNT', col('id')), 'DESC']],
      limit: 50,
      raw: true
    });

    res.status(200).json({
      message: 'Employee distribution fetched successfully',
      data: employeeDistribution
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Approval Funnel Metrics
 */
module.exports.getApprovalFunnel = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    
    const year = req.params.year;
    
    let whereClause = {};
    if (year && year !== 'All') {
      whereClause = Sequelize.where(fn('YEAR', col('createdAt')), year);
    }
    
    // Get funnel data by month
    const funnelData = await MSMEBusinessModel.findAll({
      attributes: [
        [fn('YEAR', col('createdAt')), 'year'],
        [fn('MONTH', col('createdAt')), 'month'],
        [fn('COUNT', col('id')), 'total_applications'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '3' THEN 1 END)"), 'rejected'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '1' THEN 1 END)"), 'pending'],
        [fn('AVG', fn('DATEDIFF', col('updatedAt'), col('createdAt'))), 'avg_processing_days']
      ],
      where: whereClause,
      group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
      order: [[fn('YEAR', col('createdAt')), 'DESC'], [fn('MONTH', col('createdAt')), 'DESC']],
      limit: 12,
      raw: true
    });

    // Calculate conversion rates
    const withConversion = funnelData.map(month => ({
      ...month,
      approval_rate: month.total_applications > 0 ? ((month.approved / month.total_applications) * 100).toFixed(2) : 0,
      rejection_rate: month.total_applications > 0 ? ((month.rejected / month.total_applications) * 100).toFixed(2) : 0,
      avg_processing_days: month.avg_processing_days ? parseFloat(month.avg_processing_days).toFixed(1) : 0
    }));

    res.status(200).json({
      message: 'Approval funnel fetched successfully',
      data: withConversion.reverse()
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Engagement Metrics (Feedback, Contact, Subscriptions)
 */
module.exports.getEngagementMetrics = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    const { ContactUsModel, FeedbackModel, SubscribeModel } = require('../models');
    
    const year = req.params.year;
    let whereClause = {};
    if (year && year !== 'All') {
      whereClause = Sequelize.where(fn('YEAR', col('createdAt')), year);
    }

    // Get monthly engagement trends
    const [contactTrends, feedbackTrends, subscribeTrends] = await Promise.all([
      ContactUsModel.findAll({
        attributes: [
          [fn('YEAR', col('createdAt')), 'year'],
          [fn('MONTH', col('createdAt')), 'month'],
          [fn('COUNT', col('id')), 'count']
        ],
        where: whereClause,
        group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
        order: [[fn('YEAR', col('createdAt')), 'DESC'], [fn('MONTH', col('createdAt')), 'DESC']],
        limit: 12,
        raw: true
      }),
      FeedbackModel.findAll({
        attributes: [
          [fn('YEAR', col('createdAt')), 'year'],
          [fn('MONTH', col('createdAt')), 'month'],
          [fn('COUNT', col('id')), 'count'],
          'feedbackType'
        ],
        where: whereClause,
        group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt')), 'feedbackType'],
        order: [[fn('YEAR', col('createdAt')), 'DESC'], [fn('MONTH', col('createdAt')), 'DESC']],
        raw: true
      }),
      SubscribeModel.findAll({
        attributes: [
          [fn('YEAR', col('createdAt')), 'year'],
          [fn('MONTH', col('createdAt')), 'month'],
          [fn('COUNT', col('id')), 'count']
        ],
        where: whereClause,
        group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
        order: [[fn('YEAR', col('createdAt')), 'DESC'], [fn('MONTH', col('createdAt')), 'DESC']],
        limit: 12,
        raw: true
      })
    ]);

    res.status(200).json({
      message: 'Engagement metrics fetched successfully',
      data: {
        contacts: contactTrends.reverse(),
        feedback: feedbackTrends,
        subscriptions: subscribeTrends.reverse()
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Comparative Year-over-Year Analysis
 */
module.exports.getYearOverYearComparison = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];
    
    const yearlyComparison = await Promise.all(
      years.map(async (year) => {
        const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "deletedAt", null, year);
        const totalApproved = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "2", year);
        const femaleOwned = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "ownerType", "Female", year);
        const disabilityOwned = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "disability_owned", "Yes", year);
        
        return {
          year,
          total_msme: totalMSME,
          approved: totalApproved,
          female_owned: femaleOwned,
          disability_owned: disabilityOwned,
          approval_rate: totalMSME > 0 ? ((totalApproved / totalMSME) * 100).toFixed(2) : 0
        };
      })
    );

    res.status(200).json({
      message: 'Year-over-year comparison fetched successfully',
      data: yearlyComparison
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Gender Diversity Metrics
 */
module.exports.getGenderDiversityMetrics = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    
    // Get business ownership gender distribution
    const ownershipGender = await MSMEBusinessModel.findAll({
      attributes: [
        'ownerType',
        'business_category_name',
        [fn('COUNT', col('id')), 'count'],
        [Sequelize.literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved']
      ],
      where: {
        ownerType: { [Sequelize.Op.ne]: null }
      },
      group: ['ownerType', 'business_category_name'],
      raw: true
    });

    // Get director gender distribution
    const directorGender = await DirectorsInfoModel.findAll({
      attributes: [
        'gender',
        [fn('COUNT', col('id')), 'count'],
        'age'
      ],
      group: ['gender', 'age'],
      raw: true
    });

    res.status(200).json({
      message: 'Gender diversity metrics fetched successfully',
      data: {
        ownership: ownershipGender,
        directors: directorGender
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get Service Provider Analytics
 */
module.exports.getServiceProviderAnalytics = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col } = Sequelize;
    
    // Get service provider distribution by category
    const categoryDistribution = await ServiceProvidersModel.findAll({
      attributes: [
        'categorie_name',
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['categorie_name'],
      order: [[fn('COUNT', col('id')), 'DESC']],
      raw: true
    });

    // Get recent service provider registrations
    const recentRegistrations = await ServiceProvidersModel.findAll({
      attributes: [
        [fn('YEAR', col('createdAt')), 'year'],
        [fn('MONTH', col('createdAt')), 'month'],
        [fn('COUNT', col('id')), 'count']
      ],
      group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
      order: [[fn('YEAR', col('createdAt')), 'DESC'], [fn('MONTH', col('createdAt')), 'DESC']],
      limit: 12,
      raw: true
    });

    res.status(200).json({
      message: 'Service provider analytics fetched successfully',
      data: {
        category_distribution: categoryDistribution,
        monthly_registrations: recentRegistrations.reverse()
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
/**
 * Get Flexible Time Period Comparison
 * Supports: weekly, monthly, 6months, yearly, all
 */
module.exports.getFlexibleTimeComparison = async (req, res, next) => {
  try {
    const { Sequelize } = require('sequelize');
    const { fn, col, literal, where } = Sequelize;
    
    const period = req.params.period || 'monthly'; // weekly, monthly, 6months, yearly, all
    const currentDate = new Date();
    let comparisonData = [];
    
    switch(period) {
      case 'weekly':
        // Last 12 weeks
        comparisonData = await MSMEBusinessModel.findAll({
          attributes: [
            [fn('YEAR', col('createdAt')), 'year'],
            [fn('WEEK', col('createdAt')), 'week'],
            [fn('COUNT', col('id')), 'total_msme'],
            [literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved'],
            [literal("COUNT(CASE WHEN ownerType = 'Female' THEN 1 END)"), 'female_owned'],
            [literal("COUNT(CASE WHEN disability_owned = 'Yes' THEN 1 END)"), 'disability_owned']
          ],
          where: literal(`createdAt >= DATE_SUB(NOW(), INTERVAL 12 WEEK)`),
          group: [fn('YEAR', col('createdAt')), fn('WEEK', col('createdAt'))],
          order: [[fn('YEAR', col('createdAt')), 'ASC'], [fn('WEEK', col('createdAt')), 'ASC']],
          raw: true
        });
        
        // Format labels as "Week X, Year"
        comparisonData = comparisonData.map(item => ({
          ...item,
          label: `Week ${item.week}, ${item.year}`,
          approval_rate: item.total_msme > 0 ? ((item.approved / item.total_msme) * 100).toFixed(2) : 0
        }));
        break;
        
      case 'monthly':
        // Last 12 months
        comparisonData = await MSMEBusinessModel.findAll({
          attributes: [
            [fn('YEAR', col('createdAt')), 'year'],
            [fn('MONTH', col('createdAt')), 'month'],
            [fn('COUNT', col('id')), 'total_msme'],
            [literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved'],
            [literal("COUNT(CASE WHEN ownerType = 'Female' THEN 1 END)"), 'female_owned'],
            [literal("COUNT(CASE WHEN disability_owned = 'Yes' THEN 1 END)"), 'disability_owned']
          ],
          where: literal(`createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)`),
          group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
          order: [[fn('YEAR', col('createdAt')), 'ASC'], [fn('MONTH', col('createdAt')), 'ASC']],
          raw: true
        });
        
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        comparisonData = comparisonData.map(item => ({
          ...item,
          label: `${months[item.month - 1]} ${item.year}`,
          approval_rate: item.total_msme > 0 ? ((item.approved / item.total_msme) * 100).toFixed(2) : 0
        }));
        break;
        
      case '6months':
        // Last 6 months
        comparisonData = await MSMEBusinessModel.findAll({
          attributes: [
            [fn('YEAR', col('createdAt')), 'year'],
            [fn('MONTH', col('createdAt')), 'month'],
            [fn('COUNT', col('id')), 'total_msme'],
            [literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved'],
            [literal("COUNT(CASE WHEN ownerType = 'Female' THEN 1 END)"), 'female_owned'],
            [literal("COUNT(CASE WHEN disability_owned = 'Yes' THEN 1 END)"), 'disability_owned']
          ],
          where: literal(`createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)`),
          group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
          order: [[fn('YEAR', col('createdAt')), 'ASC'], [fn('MONTH', col('createdAt')), 'ASC']],
          raw: true
        });
        
        const months6 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        comparisonData = comparisonData.map(item => ({
          ...item,
          label: `${months6[item.month - 1]} ${item.year}`,
          approval_rate: item.total_msme > 0 ? ((item.approved / item.total_msme) * 100).toFixed(2) : 0
        }));
        break;
        
      case 'yearly':
        // Last 3 years
        const currentYear = currentDate.getFullYear();
        const years = [currentYear, currentYear - 1, currentYear - 2];
        
        comparisonData = await Promise.all(
          years.map(async (year) => {
            const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "deletedAt", null, year);
            const totalApproved = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "2", year);
            const femaleOwned = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "ownerType", "Female", year);
            const disabilityOwned = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "disability_owned", "Yes", year);
            
            return {
              year,
              label: year.toString(),
              total_msme: totalMSME,
              approved: totalApproved,
              female_owned: femaleOwned,
              disability_owned: disabilityOwned,
              approval_rate: totalMSME > 0 ? ((totalApproved / totalMSME) * 100).toFixed(2) : 0
            };
          })
        );
        break;
        
      case 'all':
        // All data grouped by year
        comparisonData = await MSMEBusinessModel.findAll({
          attributes: [
            [fn('YEAR', col('createdAt')), 'year'],
            [fn('COUNT', col('id')), 'total_msme'],
            [literal("COUNT(CASE WHEN is_verified = '2' THEN 1 END)"), 'approved'],
            [literal("COUNT(CASE WHEN ownerType = 'Female' THEN 1 END)"), 'female_owned'],
            [literal("COUNT(CASE WHEN disability_owned = 'Yes' THEN 1 END)"), 'disability_owned']
          ],
          group: [fn('YEAR', col('createdAt'))],
          order: [[fn('YEAR', col('createdAt')), 'ASC']],
          raw: true
        });
        
        comparisonData = comparisonData.map(item => ({
          ...item,
          label: item.year.toString(),
          approval_rate: item.total_msme > 0 ? ((item.approved / item.total_msme) * 100).toFixed(2) : 0
        }));
        break;
        
      default:
        // Default to monthly
        return res.status(400).json({ error: 'Invalid period. Use: weekly, monthly, 6months, yearly, or all' });
    }

    res.status(200).json({
      message: `${period} comparison fetched successfully`,
      period: period,
      data: comparisonData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
