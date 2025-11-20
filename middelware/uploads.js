'use strict'

const { Multer } = require('../services/multer')
const mimeTypes = {
    'image': ['image/jpg', 'image/jpeg', 'image/png', 'image/svg', 'image/svg+xml', 'image/pjpeg', 'image/x-png'],
    'document': ['application/pdf', 'application/msword', "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],

    'image-document': ['image/jpg', 'image/jpeg', 'image/png', 'image/svg',
        'image/svg+xml', 'image/pjpeg', 'image/x-png', 'application/pdf', 'application/msword',
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
}

const storeDestination = {
    'businessCategories': "business-categories/",
    'partnersLogo': "partners-logo/",
    'teamMemberImage': "team-member/",
    'homeBannerImage': "home-banner/",
    'blogImage': "blog-image/",
    'downloadsFile': "downloads/",
    'serviceProviderCategoriesImage': "service-provider-categories/",
    'serviceProvidersImage': "service-providers/",
    'businessImage': "business/",
    'businessProfile': "business-profile/",
    'incorporationProfile': "incorporation-profile/"
}

module.exports = (fileType, fileSize, filePath) => {
    const uploader = new Multer(mimeTypes[fileType], fileSize, storeDestination[filePath]);
    return uploader.upload
}
