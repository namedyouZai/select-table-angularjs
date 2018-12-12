/**
 * Created by dell on 2018/12/10.
 */
var renderfnToProp = function (prop,renderfn,data) {

    var re =new RegExp(prop,"g"); // re为/^\d+bl$/gim
    var cell = renderfn.replace(re,data);
    return cell
}
