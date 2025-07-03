// export default
// export default는 모듈이 하나만 있다는 것을 명시할 수 있다.
// export default를 사용한 경우 import 할 때 중괄호를 생략해야 한다.


// export 
// export 지시자를 사용했을 때는 { } 해당 모듈의 이름을 넣어서 불러올 수 있다.
// import 할 때 모듈로 만든 변수 또는 함수의 이름을 중괄호로 감싸지 않으면 에러가 발생한다.
const pageConf = {
    naviSize : 5
    , pageSize : 10
}

const utils = () => {
    let a1 = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };

    let a2 = function(x, y) {
        var z = {
            M: x.getMonth() + 1,
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
        };
        y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
        });
        return y.replace(/(y+)/g, function(v) {
            return x.getFullYear().toString().slice(-v.length)
        });
    };


    let b1 = function(str,org,dest){return str.split(org).join(dest);};
    let b2 = function(orgStr,fillStr,leng){var s=orgStr;while(s.length<leng)s=fillStr+s;return s};
    let b3 = function(orgStr,fillStr,leng){var s=orgStr;while(s.length<leng)s+=fillStr;return s};
    let b4 = function(strOrg){return strOrg.replace(/(^\s*)|(\s*$)/gi,"")};
    let b5 = function(str){return str.toLowerCase().replace(/(_[a-z])/g,function(arg){return arg.toUpperCase().replace('_','')});}

    let c1 = function(json){let formData = new FormData();for(let i in json)formData.append(i,json[i]);return formData;}
    // 계층 내려가며 초기화 하는 건 아님
    let c2 = function(json){for(let key in json)json[key] = '';}
    let c3 = function (arrayList, rootId) {
        var rootNodes = [];
        var traverse = function (nodes, item, index) {
            if (nodes instanceof Array) {
                return nodes.some(function (node) {
                    if (node.id === item.parent_id) {
                        node.nodes = node.nodes || [];
                        return node.nodes.push(arrayList.splice(index, 1)[0]);
                    }
    
                    return traverse(node.nodes, item, index);
                });
            }
        };
    
        while (arrayList.length > 0) {
            arrayList.some(function (item, index) {
                if (item.parent_id === rootId) {
                    return rootNodes.push(arrayList.splice(index, 1)[0]);
                }
    
                return traverse(rootNodes, item, index);
            });
        }
    
        return rootNodes;
    }

    return {
        format : {
            numberAddCommas : a1 ,  // admin.util.format.numberAddCommas('111222333');
            dateToString : a2 ,		// admin.util.format.dateToString(new Date() , 'yyyy-MM-dd hh:mm:ss');
        } 
        , string : {
            replaceAll : b1,	// admin.util.string.replaceAll('ssssssssssss' , 's' , '^');
            lpad : b2 ,  		// admin.util.string.lpad('s' , 'a' , '10');
            rpad : b3 ,  		// admin.util.string.rpad('s' , 'a' , '10');
            trim : b4 , 	 		// admin.util.string.trim('   aaaaaaaaaaaa    ');
            underToCamel : b5					
        } 
        , json : {
            toFormData : c1
            ,init : c2
            , toHierarchy : c3  // toHierarchy(array , [root parent_id]) list 
        }
        , getPageConf : () => { return pageConf}
    }
}

export default {
    install (app ) { 
        app.provide('utils' , utils())
        app.provide('pageConf' , pageConf);
    }
}

// export  { pageConf , utils }