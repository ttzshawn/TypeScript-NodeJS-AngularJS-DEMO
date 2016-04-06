
// Sample: {addr.location:a,addr.number:b} ==> addr%5Blocation%5D=a&addr%5Bnumber%5D=b
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

// Sample: 35% ==> 0.35
percentToNum = function(param) {
    param = param.toString().replace('%', '');
    if (param != undefined && isNaN(param) == false) {
        return param * 1000 / 100000;
    } else {
        return '';
    }
}

/**
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*  Original code by Angel Marin, Paul Johnston.
**/
var SHA256 = function(s) {var chrsz = 8;var hexcase = 0;function safe_add(x, y) {var lsw = (x & 0xFFFF) + (y & 0xFFFF);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return (msw << 16) | (lsw & 0xFFFF);}function S(X, n) {return (X >>> n) | (X << (32 - n));}function R(X, n) {return (X >>> n);}function Ch(x, y, z) {return ((x & y) ^ ((~x) & z));}function Maj(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));}function Sigma0256(x) {return (S(x, 2) ^ S(x, 13) ^ S(x, 22));}function Sigma1256(x) {return (S(x, 6) ^ S(x, 11) ^ S(x, 25));}function Gamma0256(x) {return (S(x, 7) ^ S(x, 18) ^ R(x, 3));}function Gamma1256(x) {return (S(x, 17) ^ S(x, 19) ^ R(x, 10));}function core_sha256(m, l) {var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);var W = new Array(64);var a, b, c, d, e, f, g, h, i, j;var T1, T2;m[l >> 5] |= 0x80 << (24 - l % 32);m[((l + 64 >> 9) << 4) + 15] = l;for (var i = 0; i < m.length; i += 16) {a = HASH[0];b = HASH[1];c = HASH[2];d = HASH[3];e = HASH[4];f = HASH[5];g = HASH[6];h = HASH[7];for (var j = 0; j < 64; j++) {if (j < 16) W[j] = m[j + i];else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);T2 = safe_add(Sigma0256(a), Maj(a, b, c));h = g;g = f;f = e;e = safe_add(d, T1);d = c;c = b;b = a;a = safe_add(T1, T2);}HASH[0] = safe_add(a, HASH[0]);HASH[1] = safe_add(b, HASH[1]);HASH[2] = safe_add(c, HASH[2]);HASH[3] = safe_add(d, HASH[3]);HASH[4] = safe_add(e, HASH[4]);HASH[5] = safe_add(f, HASH[5]);HASH[6] = safe_add(g, HASH[6]);HASH[7] = safe_add(h, HASH[7]);}return HASH;}function str2binb(str) {var bin = Array();var mask = (1 << chrsz) - 1;for (var i = 0; i < str.length * chrsz; i += chrsz) {bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);}return bin;}function Utf8Encode(string) {string = string.replace(/rn/g, "n");var utftext = "";for (var n = 0; n < string.length; n++) {var c = string.charCodeAt(n);if (c < 128) {utftext += String.fromCharCode(c);} else if ((c > 127) && (c < 2048)) {utftext += String.fromCharCode((c >> 6) | 192);utftext += String.fromCharCode((c & 63) | 128);} else {utftext += String.fromCharCode((c >> 12) | 224);utftext += String.fromCharCode(((c >> 6) & 63) | 128);utftext += String.fromCharCode((c & 63) | 128);}}return utftext;}function binb2hex(binarray) {var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";var str = "";for (var i = 0; i < binarray.length * 4; i++) {str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);}return str;}s = Utf8Encode(s);return binb2hex(core_sha256(str2binb(s), s.length * chrsz));}

/**
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
**/
var SHA1 = function(msg) {function rotate_left(n,s) {var t4 = ( n<<s ) | (n>>>(32-s));return t4;};function lsb_hex(val) {var str="";var i;var vh;var vl;for( i=0; i<=6; i+=2 ) {vh = (val>>>(i*4+4))&0x0f;vl = (val>>>(i*4))&0x0f;str += vh.toString(16) + vl.toString(16);}return str;};function cvt_hex(val) {var str="";var i;var v;for( i=7; i>=0; i-- ) {v = (val>>>(i*4))&0x0f;str += v.toString(16);}return str;};function Utf8Encode(string) {string = string.replace(/rn/g,"n");var utftext = "";for (var n = 0; n < string.length; n++) {var c = string.charCodeAt(n);if (c < 128) {utftext += String.fromCharCode(c);}else if((c > 127) && (c < 2048)) {utftext += String.fromCharCode((c >> 6) | 192);utftext += String.fromCharCode((c & 63) | 128);}else {utftext += String.fromCharCode((c >> 12) | 224);utftext += String.fromCharCode(((c >> 6) & 63) | 128);utftext += String.fromCharCode((c & 63) | 128);}}return utftext;};var blockstart;var i, j;var W = new Array(80);var H0 = 0x67452301;var H1 = 0xEFCDAB89;var H2 = 0x98BADCFE;var H3 = 0x10325476;var H4 = 0xC3D2E1F0;var A, B, C, D, E;var temp;msg = Utf8Encode(msg);var msg_len = msg.length;var word_array = new Array();for( i=0; i<msg_len-3; i+=4 ) {j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);word_array.push( j );}switch( msg_len % 4 ) {case 0:i = 0x080000000;break;case 1:i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;break;case 2:i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;break;case 3:i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8 | 0x80;break;}word_array.push( i );while( (word_array.length % 16) != 14 ) word_array.push( 0 );word_array.push( msg_len>>>29 );word_array.push( (msg_len<<3)&0x0ffffffff );for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);A = H0;B = H1;C = H2;D = H3;E = H4;for( i= 0; i<=19; i++ ) {temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}for( i=20; i<=39; i++ ) {temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}for( i=40; i<=59; i++ ) {temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}for( i=60; i<=79; i++ ) {temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}H0 = (H0 + A) & 0x0ffffffff;H1 = (H1 + B) & 0x0ffffffff;H2 = (H2 + C) & 0x0ffffffff;H3 = (H3 + D) & 0x0ffffffff;H4 = (H4 + E) & 0x0ffffffff;}var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);return temp.toLowerCase();}


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
