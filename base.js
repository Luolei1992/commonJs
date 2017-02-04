//获取标签的内容（兼容所有浏览器）
function getInnerText(element) {
    //能力检测(先判断如果这个能力有这个)
    if(typeof element.innerText === "string") {
        //说明支持innerText
        return element.innerText;
    }else {
        //说明不支持innerText
        return element.textContent;
    }
}

//设置内容的方法（兼容性问题）
function setInnerText(element, value) {
    //能力检测
    if(typeof element.innerText === "string") {
        element.innerText = value;
    }else {
        element.textContent = value;
    }
}

//获取指定元素的第一个子元素
function getFirstElement(element) {
    //能力检测
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        //IE679
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            //说明是一个节点
            node = node.nextSibling;
        }

        return node;
    }
}


function getLastElement(element) {
    //能力检测
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
 
function getChildElements(element) {
    var arr = [];
    var nodes = element.childNodes;
    for(var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if(node.nodeType === 1) {
            arr[arr.length] = node;
        }
    }
    return arr;
}

function $(id) {
    return document.getElementById(id);
}


function getDate(){
    var date = new Date();
    var year = date.getFullYear();
    if(year < 10){
        year = "0" + year;
    }
    var month = date.getMonth()+1;
    if(month < 10){
        month = "0" + month;
    }
    var day = date.getDate();
    if(day < 10){
        day = "0" + day;
    }
    var hour = date.getHours();
    if(hour < 10){
        hour = "0" + hour;
    }
    var minute = date.getMinutes();
    if(minute < 10){
        minute = "0" + minute;
    }
    var second = date.getSeconds();
    if(second < 10){
        second = "0" + second;
    }
    var str = year + "-" +month+"-"+day+" "+hour+":"+minute+":"+second;
    return str;
}

function yunsu(obj, target) {
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;//数值类型
        var step = 9;
        if (leader > target) {
            //说明目标我们的左侧，应该往左。
            step = -step;
        }
        //距离要大于一步的时候，我们让宇哥跑
        var juli = Math.abs(target - leader);
        //step有可能是负的
        if (juli > Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";//一定要记得家单位
        } else {
            ////如果距离不够一步的话，我们就不让宇哥继续走下去了
            //手动的吧宇哥移动到终点
            clearInterval(obj.timer);
            obj.style.left = target + "px";
        }
    }, 15);
};


function scroll() {
    //var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //var scrollLeft = window.pageXOffset ||document.documentElement.scrollLeft ||document.body.scrollLeft ||0;

    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

//封装：任意对象  任意数值数值（px）  任意的目标
function animate(obj, json,fn) {
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {
        //假设动画都执行完
        var flag = true;
        for(var k in json) {
            if(k == "opacity"){
                var attr = k;
                var target = json[attr];
                var leader = getStyle(obj, attr);//获取到的字符串类型，带了px
                target = target * 1000;
                leader = leader * 1000;
                leader = parseInt(leader) || 0;
                var step = (target - leader) / 10;
                //让step最少都走1px或者-1px
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[attr] = leader/1000;
                if (leader != target) {
                    //说明没有执行完
                    flag = false;
                }else if(k == "zIndedx") {
                    obj.style[k] = json[k];
                }else{
                    var attr = k;
                    var target = json[attr];
                    var leader = getStyle(obj, attr);//获取到的字符串类型，带了px
                    leader = parseInt(leader) || 0;
                    var step = (target - leader) / 10;
                    //让step最少都走1px或者-1px
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[attr] = leader + "px";//记得要带单位
                    if (leader != target) {
                        //说明没有执行完
                        flag = false;
                    }
                }
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    }, 15);
}
//获取任意对象的任意样式
function getStyle(obj, attr) {
    //能力检测
    //如果支持getComputedStyle，就可以直接
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
//可视窗口
function client(){
        return {
            width:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}