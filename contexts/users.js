$data.Entity.extend('UsersModel.User', {
    UserID: { key: true, type: 'id', nullable: false, computed: true },
    UserName: { key: true, type: 'string', nullable: false, required: true, maxLength: 15 },
    UserPass: { type: 'string', nullable: false, required: true, maxLength: 50 }
});

$data.EntityContext.extend('UsersModel', {
    Users: { type: $data.EntitySet, elementType: UsersModel.User }
});

//   mongodb://<user>:<pass>@mongo.onmodulus.net:27017/yz3uQezi

module.exports = exports = UsersModel;
