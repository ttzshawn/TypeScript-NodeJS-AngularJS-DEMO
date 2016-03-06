// 序列化对象
serializeData = function(obj, prefix) {
    var str = [];
    for (var p in obj) {
        if (obj.constructor === Array) {
            console.log(obj);
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push(typeof v == "object" ?
                serializeData(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        } else if (obj.hasOwnProperty(p)) {
            //   var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            var k = prefix ? prefix + "." + p : p,
                v = obj[p];
            str.push(typeof v == "object" ?
                serializeData(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

// 处理百分数，没有百分号的数字转为后台存储的小数
percentToNum = function(param) {
    param = param.toString().replace('%', '');
    if (param != undefined && isNaN(param) == false) {
        return param * 1000 / 100000;
    } else {
        return '';
    }
}



// Grab the files and set them to our variable
// ========================================================================================
// <input id="fileupload" type="file" class="" name="files[]" data-url="upload.do" multiple>
function prepareUpload(event) {
    var ele = $(this).siblings('.hidden')[0];
    uploadFiles(event.target.files, ele);

    // ele.value = resFileId;
    //
    // try {
    //     var resFileId = uploadFiles(event.target.files);
    //     var ele = $(this).siblings('.hidden')[0].value;
    //     var array = ele == ""? [] : ele.split(',') ;
    // } catch (e) {
    //     console.log(e);
    // } finally {
    //     console.log(array);
    //     array.push(resFileId);
    //     console.log(array);
    //     ele.value = array.join(',')).trigger('input';
    // }

    // ele.val(ele.val().split(',').push(resId).join(',')).trigger('input');

    // $(this).siblings('.hidden').val(uploadFiles(event.target.files)).trigger('input');
}


/**
 * @param files 需要上传的文件
 * @param ele 上传成功后接收返回文件ID的元素
 * @desc 文件上传模块, 设置返回id后，使用trigger('input')使ng-model能收到值
 */
function uploadFiles(files, ele) {
    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value) {
        data.append("files", value);
    });

    console.log(files)

    $.ajax({
        url: 'upload.do',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
            if (typeof data.error === 'undefined') {
                // Success so call function to process the form
                fileid = data.content.name;
                ele.value = data.content.name;
                $(ele).trigger('input');
                // submitForm(event, data);
            } else {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
}
