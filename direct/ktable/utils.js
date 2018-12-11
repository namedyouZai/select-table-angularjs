/**
 * Created by dell on 2018/12/10.
 */
var renderPropFncToProp = function (prop,propfnc,data) {

    var re =new RegExp(prop,"g"); // re为/^\d+bl$/gim
    var cell = propfnc.replace(re,data);
    return cell
}