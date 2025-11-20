const router = require('express').Router();
const FileController = require('../controllers/file.controller');
const uploader = require('../middelware/uploads')

// Image uploads - 50MB limit for high-resolution photos
router.post('/business-categories-image',  uploader("image", 50, "weatherCategories").single("file"), FileController.uploadFile);

router.post('/partners-logo-image',  uploader("image", 50, "partnersLogo").single("file"), FileController.uploadFile);

router.post('/team-member-image',  uploader("image", 50, "teamMemberImage").single("file"), FileController.uploadFile);

router.post('/home-banner-image',  uploader("image", 50, "homeBannerImage").single("file"), FileController.uploadFile);

router.post('/blog-image',  uploader("image", 50, "blogImage").single("file"), FileController.uploadFile);

router.post('/service-provider-categories-image',  uploader("image", 50, "serviceProviderCategoriesImage").single("file"), FileController.uploadFile);

router.post('/service-providers-image',  uploader("image", 50, "serviceProvidersImage").single("file"), FileController.uploadFile);

router.post('/business-image',  uploader("image", 50, "businessImage").single("file"), FileController.uploadFile);

// Document uploads - 100MB limit for larger files
router.post('/downloads',  uploader("document", 100, "downloadsFile").single("file"), FileController.uploadFile);

router.post('/business-profile',  uploader("document", 100, "businessProfile").single("file"), FileController.uploadFile);

// Mixed image-document uploads - 100MB limit
router.post('/incorporation-image',  uploader("image-document", 100, "incorporationProfile").single("file"), FileController.uploadFile);



// router.post('/gallery-image', uploader("image", 50, "galleryImage").array("file",15), FileController.uploadMultipleFiles);

module.exports = router;
