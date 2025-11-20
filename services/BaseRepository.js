const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const { fn, col, literal,where,where: sequelizeWhere } = require('sequelize');
const db = require('../models/index');


module.exports = {
  baseCreate: create,
  baseBulkCreate: bulkCreate,
  baseDetail: detail,
  baseList: list,
  baseList2: list2,
  baseList3: list3,
  baseUpdate: update,
  baseDelete: deleteEntry,
  baseRestore: baseRestore,
  baseCount: count,
  baseDashboardCount: dashboardCount,
  baseFindById: findById,
  baseFindAllById: findAllById,
  baseGalleryList: GalleryList,
  baseFindByform_code: findByform_code,
  getWeatherDataFromDate: getWeatherDataFromDate,
  getSearchByLocation: getSearchByLocation,
  getAlartsByDate: getAlartsByDate,
  getDashboardAlarts: getDashboardAlarts,
  getDashboardWeatherDataRequests: getDashboardWeatherDataRequests,
  findToken_User: findToken_User,
  getSearchData: getSearchData,
  getDashboardUserRigionWise: getDashboardUserRigionWise,
  getMSMEDataAccordingToCategory: getMSMEDataAccordingToCategory,
  getServiceProviderDataAccordingToCategory: getServiceProviderDataAccordingToCategory,
};

function create(modal, data) {
  return modal.create(data);
}

function bulkCreate(modal, data) {
  return modal.bulkCreate(data, { returning: true });
}

function count(modal, searchParams) {
  return modal.count({ where: searchParams });
}

function count(modal, searchParams) {
  return modal.count({ 
    where: searchParams 

  });
}


function dashboardCount(modal, key, value, year) {
  const conditions = {
    [key]: value,
  };

  if (year && year.toString().toLowerCase() !== 'all') {
    conditions[Op.and] = [
      where(fn('YEAR', col('createdAt')), year)
    ];
  }

  return modal.count({
    where: conditions
  });
}


function findById(modal, params, key) {
  return modal.findOne({
    where: {
      [key]: params
    }
  });
}

function findAllById(modal, params, key) {
  return modal.findAll({
    where: {
      [key]: params
    }
  });
}


function findBypatient_code(modal, params) {
  return modal.findOne({
    where: {
      patient_code: params
    }
  });
}

function findByform_code(modal, params) {
  return modal.findOne({
    where: {
      form_code: params
    }
  });
}

function findToken_User(modal) {
  return modal.findAll({
    attributes: ['divice_token'],
    where: {
      divice_token: {
        [Sequelize.Op.ne]: null,
      },
    },
  });
}




function detail(modal, params) {
  const query = {
    where: params.searchParams
  };
  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('include')) {
    query['include'] = params.include;
  }
  if (params.hasOwnProperty('paranoid')) {
    query['paranoid'] = params.paranoid;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }

  return modal.findOne(query);
}


function GalleryList(modal, params) {
  const query = {
    where: params.searchParams
  };
  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }
  if (params.hasOwnProperty('distinct')) {
    query['distinct'] = params.distinct;
  }
  if (params.hasOwnProperty('group')) {
    query['group'] = params.group;
  }
  return modal.findAll(query);
}


async function list(modal, params) {
  let withPagination = false;

  console.log("params ==> ", params);
  console.log("params.searchParams outside ==> ", params.searchParams);

  const query = {
    where: params.searchParams || params.where || {}
  }
  console.log("WHERE clause 1:", query.where);

  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('include')) {
    query['include'] = params.include;
    // distinct is true because paginator count include as row
    query['distinct'] = true;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }
  if (params.hasOwnProperty('limit')) {
    query['limit'] = params.limit;
    withPagination = true;
  }
  if (params.hasOwnProperty('paranoid')) {
    query['paranoid'] = params.paranoid;
  }
  if (params.hasOwnProperty('offset')) {
    query['offset'] = params.offset;
  }
  if (params.hasOwnProperty('isRaw')) {
    query['raw'] = params.isRaw;
  }
  if (params.hasOwnProperty('distinct')) {
    query['distinct'] = params.distinct;
  }
  if (params.hasOwnProperty('group')) {
    query['group'] = params.group;
  }
  if (params.hasOwnProperty('having')) {
    query['having'] = params.having;
  }

  console.log("WHERE clause 2:", query.where)

  if (withPagination) {

    const data = await modal.findAndCountAll(query);
    const total = data.count;
    const totalPages = Math.ceil(total / params.limit);

    return {
      values: data,
      page: params.page,
      limit: params.limit,
      total_pages: totalPages,
      total: total
    }
  }
}



async function list2(modal, params, business_category_id, is_verified) {
  let withPagination = false;

  console.log("is_verified ==> ", is_verified);

  //  let is_verified =  2;


  params.searchParams = {
    ...params.searchParams,
    business_category_id: business_category_id,
    is_verified: is_verified
  }


  const query = {
    where: params.searchParams || params.where || {}
  }

  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('include')) {
    query['include'] = params.include;
    // distinct is true because paginator count include as row
    query['distinct'] = true;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }
  if (params.hasOwnProperty('limit')) {
    query['limit'] = params.limit;
    withPagination = true;
  }
  if (params.hasOwnProperty('paranoid')) {
    query['paranoid'] = params.paranoid;
  }
  if (params.hasOwnProperty('offset')) {
    query['offset'] = params.offset;
  }
  if (params.hasOwnProperty('isRaw')) {
    query['raw'] = params.isRaw;
  }
  if (params.hasOwnProperty('distinct')) {
    query['distinct'] = params.distinct;
  }
  if (params.hasOwnProperty('group')) {
    query['group'] = params.group;
  }
  if (params.hasOwnProperty('having')) {
    query['having'] = params.having;
  }


  if (withPagination) {

    const data = await modal.findAndCountAll(query);
    const total = data.count;
    const totalPages = Math.ceil(total / params.limit);

    return {
      values: data,
      page: params.page,
      limit: params.limit,
      total_pages: totalPages,
      total: total
    }
  }
}


async function list3(modal, params, business_category_id) {
  let withPagination = false;


  params.searchParams = {
    ...params.searchParams,
    business_category_id: business_category_id,
  }

  const query = {
    where: params.searchParams || params.where || {}
  }

  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('include')) {
    query['include'] = params.include;
    // distinct is true because paginator count include as row
    query['distinct'] = true;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }
  if (params.hasOwnProperty('limit')) {
    query['limit'] = params.limit;
    withPagination = true;
  }
  if (params.hasOwnProperty('paranoid')) {
    query['paranoid'] = params.paranoid;
  }
  if (params.hasOwnProperty('offset')) {
    query['offset'] = params.offset;
  }
  if (params.hasOwnProperty('isRaw')) {
    query['raw'] = params.isRaw;
  }
  if (params.hasOwnProperty('distinct')) {
    query['distinct'] = params.distinct;
  }
  if (params.hasOwnProperty('group')) {
    query['group'] = params.group;
  }
  if (params.hasOwnProperty('having')) {
    query['having'] = params.having;
  }

  if (withPagination) {

    const data = await modal.findAndCountAll(query);
    const total = data.count;
    const totalPages = Math.ceil(total / params.limit);

    return {
      values: data,
      page: params.page,
      limit: params.limit,
      total_pages: totalPages,
      total: total
    }
  }
}


function update(modal, params, data) {
  let queryParams = {};
  if (params.hasOwnProperty('searchParams')) {
    queryParams = { where: params.searchParams };
  } else {
    queryParams = { where: params };
  }
  if (params.hasOwnProperty('limit')) {
    queryParams['limit'] = params.limit;
  }
  if (params.hasOwnProperty('paranoid')) {
    queryParams['paranoid'] = params.paranoid;
  }
  console.log("params ==> ", queryParams);
  return modal.update(data, queryParams);
}



function deleteEntry(modal, searchParams) {
  return modal.destroy({ where: searchParams });
}

function baseRestore(modal, searchParams) {
  return modal.restore({ where: searchParams });
}


async function getSearchData(modal, Value, Key) {
  try {
    const results = await modal.findAll({
      where: {
        deletedAt: null,
        [Key]: {
          [Op.like]: Value + '%', // e.g., 'Ro%' or '%Ro%'
        }
      },
      // order: [['id', 'DESC']],
    });
    return results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}


async function getWeatherDataFromDate(modal, locationId, startDate) {
  try {
    const results = await modal.findAll({
      where: {
        deletedAt: null,
        location_id: locationId,
        date: {
          [Op.gte]: startDate
        }
      },
      // order: [['id', 'DESC']],
    });

    return results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}



async function getSearchByLocation(modal, name_of_organization) {
  try {
    const results = await modal.findAll({
      where: {
        deletedAt: null,
        is_verified: 2,
        name_of_organization: {
          [Op.like]: '%' + name_of_organization + '%', // e.g., 'Ro%' or '%Ro%'
        }
      },
      // order: [['id', 'DESC']],
    });
    return results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}





async function getAlartsByDate(modal, todayDate) {
  try {
    const results = await modal.findAll({
      where: {
        todate: {
          [Op.lte]: todayDate
        },
        fromdate: {
          [Op.gte]: todayDate
        }
      },
      order: [['todate', 'DESC']],
    });
    return results;
  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }
}


// async function getDashboardAlarts(modal, year) {
//   try {
//     const currentYear = year;

//     const alerts = await modal.findAll({
//       attributes: [
//         [Sequelize.fn('MONTH', col('createdAt')), 'month'],
//         [Sequelize.fn('COUNT', '*'), 'count']
//       ],
//       where: Sequelize.where(Sequelize.fn('YEAR', col('createdAt')), currentYear),
//       group: [literal('month')],
//       order: [[literal('month'), 'ASC']]
//     });

//     return alerts.map(alert => ({
//       month: parseInt(alert.get('month'), 10),
//       count: parseInt(alert.get('count'), 10)
//     }));
//   } catch (error) {
//     console.error('Error fetching weather alarts data:', error);
//     throw error;
//   }
// }


async function getDashboardAlarts(modal, year) {
  try {
    const whereClause = (year && year.toString().toLowerCase() !== 'all')
      ? sequelizeWhere(fn('YEAR', col('createdAt')), year)
      : undefined;

    const alerts = await modal.findAll({
      attributes: [
        [fn('MONTH', col('createdAt')), 'month'],
        [fn('COUNT', '*'), 'count']
      ],
      where: whereClause,
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    return alerts.map(alert => ({
      month: parseInt(alert.get('month'), 10),
      count: parseInt(alert.get('count'), 10)
    }));
  } catch (error) {
    console.error('Error fetching weather alerts data:', error);
    throw error;
  }
}


async function getDashboardWeatherDataRequests(modal, year) {
  try {
    const currentYear = year;

    const alerts = await modal.findAll({
      attributes: [
        [Sequelize.fn('MONTH', col('createdAt')), 'month'],
        [Sequelize.fn('COUNT', '*'), 'count']
      ],
      where: Sequelize.where(Sequelize.fn('YEAR', col('createdAt')), currentYear),
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    return alerts.map(alert => ({
      month: parseInt(alert.get('month'), 10),
      count: parseInt(alert.get('count'), 10)
    }));
  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }
}


// async function getDashboardUserRigionWise(modal, year) {
//   try {
//     const currentYear = year;

//     const usersByRegion = await modal.findAll({
//       attributes: [
//         'region',
//         [fn('COUNT', col('*')), 'msme_count']
//       ],
//       where: {
//         is_verified: 2
//       },
//       group: ['region'],
//       order: [[fn('COUNT', col('*')), 'DESC']] // optional: sort by count
//     });

//     return usersByRegion

//   } catch (error) {
//     console.error('Error fetching weather alarts data:', error);
//     throw error;
//   }
// }


async function getDashboardUserRigionWise(modal, year) {
  try {
    const whereClause = {
      is_verified: 2
    };

    if (year && year.toString().toLowerCase() !== 'all') {
      whereClause[Op.and] = [
        sequelizeWhere(fn('YEAR', col('createdAt')), year)
      ];
    }

    const usersByRegion = await modal.findAll({
      attributes: [
        'region',
        [fn('COUNT', col('*')), 'msme_count']
      ],
      where: whereClause,
      group: ['region'],
      order: [[fn('COUNT', col('*')), 'DESC']]
    });

    return usersByRegion;
  } catch (error) {
    console.error('Error fetching user region-wise data:', error);
    throw error;
  }
}



// async function getMSMEDataAccordingToCategory(modal) {
//   try {
//     const result = await modal.findAll({
//       attributes: [
//         'business_category_id',
//         'business_category_name',
//         [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_msmes'],
//         [
//           Sequelize.literal(`COUNT(CASE WHEN is_verified = '1' THEN 1 END)`),
//           'pending_count'
//         ],
//         [
//           Sequelize.literal(`COUNT(CASE WHEN is_verified = '2' THEN 1 END)`),
//           'verified_count'
//         ],
//         [
//           Sequelize.literal(`COUNT(CASE WHEN is_verified = '3' THEN 1 END)`),
//           'rejected_count'
//         ],
//       ],
//       group: ['business_category_id', 'business_category_name']
//     });
//     return result;
//   } catch (error) {
//     console.error('Error fetching weather alerts data:', error);
//     throw error;
//   }
// }




async function getMSMEDataAccordingToCategory(modal,modal2) {
  try {
    const result = await modal2.findAll({
      attributes: [
        'id',
        'name',
        [Sequelize.fn('COUNT', Sequelize.col('msmes.id')), 'total_msmes'],
        [
          Sequelize.literal(`COUNT(CASE WHEN msmes.is_verified = '1' THEN 1 END)`),
          'pending_count'
        ],
        [
          Sequelize.literal(`COUNT(CASE WHEN msmes.is_verified = '2' THEN 1 END)`),
          'verified_count'
        ],
        [
          Sequelize.literal(`COUNT(CASE WHEN msmes.is_verified = '3' THEN 1 END)`),
          'rejected_count'
        ],
      ],
      include: [
        {
          model: modal,
          required: false, // LEFT JOIN
          as: 'msmes',
          attributes: [],
          on: Sequelize.literal(`msmes.business_category_id = BusinessCategoriesModel.id`)
        }
      ],
      group: ['BusinessCategoriesModel.id', 'BusinessCategoriesModel.name']
    });

    return result;
  } catch (error) {
    console.error('Error fetching weather alerts data:', error);
    throw error;
  }
}



async function getServiceProviderDataAccordingToCategory(modal) {
  try {
    const result = await modal.findAll({
      attributes: [
        'categorie_id',
        'categorie_name',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_providers']
      ],
      group: ['categorie_id', 'categorie_name']
    });
    return result;
  } catch (error) {
    console.error('Error fetching weather alerts data:', error);
    throw error;
  }
}