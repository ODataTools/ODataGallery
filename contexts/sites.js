$data.Entity.extend('SiteModel.Site', {
    SiteID: { key: true, type: 'id', nullable: false, computed: true },
    SiteName: { key: true, type: 'string', nullable: false, required: true, maxLength: 15 },
    SiteUrl: { type: 'string', nullable: false, required: true, maxLength: 80},
    Description: { type: 'string', maxLength: Number.POSITIVE_INFINITY },
    Picture: { type: 'string', maxLength: 80 },
	User: {type: 'string', maxLenght: 15},
    Tags: { type: 'Array', elementType:"string"}
});


$data.Entity.extend('SiteModel.Tag', {
    TagID: { key: true, type: 'id', nullable: false, computed: true },
    TagName: { type: 'string', nullable: false, required: true, maxLength: 15 }
});


$data.EntityContext.extend('SiteModel', {
    Sites: {type: $data.EntitySet, elementType: SiteModel.Site},
    Tags: {type: $data.EntitySet, elementType: SiteModel.Tag}
});



module.exports = exports = SiteModel;
