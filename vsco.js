/*
Loon/Surge
http-response ^https?:\/\/api\.revenuecat\.com\/v\d\/subscribers\/ script-path=https://raw.githubusercontent.com/Tartarus2014/Script/master/vsco.js, requires-body=true, tag=VSCO

MitM = api.revenuecat.com
*/

const resp = {};
const obj = JSON.parse($response.body || null);

const product = {
	"membership": "com.circles.fin.premium.yearly", //vsco
	"filebox_pro": "com.premium.yearly" //filebox
}
const data = {
	"expires_date": "2030-02-18T07:52:54Z",
	"original_purchase_date": "2020-02-11T07:52:55Z",
	"purchase_date": "2020-02-11T07:52:54Z"
};

if (obj && obj.subscriber) {
	if (!obj.subscriber.subscriptions) {
		obj.subscriber.subscriptions = {};
	}
	if (!obj.subscriber.entitlements) {
		obj.subscriber.entitlements = {};
	}
	for (const i in product) {
		obj.subscriber.subscriptions[product[i]] = data;
		obj.subscriber.entitlements[i] = data;
		obj.subscriber.entitlements[i].product_identifier = product[i];
	}
	resp.body = JSON.stringify(obj);
}

$done(resp);
