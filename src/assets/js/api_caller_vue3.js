// import { inject } from 'vue';
import axios from 'axios'
import VueSimpleAlert from 'vue3-simple-alert';
// import { construct } from 'core-js/fn/reflect';
// import { userAuthStore } from '../../store/certification'

// const VueSimpleAlert = inject('VueSimpleAlert')

const SERVER_ERROR_MESSAGE = {
    400 : 'Bad Request \n\n 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없습니다.'
    , 401 : 'Unauthorized \n\n 비인증(unauthenticated) 요청입니다. 인증후(로그인) 후 요청하시기 바랍니다. '
    , 404 : 'Not Found \r\n\r\n 요청받은 리소스를 찾을 수 없습니다.'

    , 500 : 'Internal Server Error \r\n\r\n 서버가 처리 방법을 모르는 상황이 발생했습니다. 관리자에게 문의 바랍니다.'
}

let api_config = {
    // `url`은 요청에 사용될 서버 URL입니다.
    url: '/user',

    // `method`는 요청을 생성할때 사용되는 메소드입니다.
    method: 'get', // 기본값

    // `url`이 절대값이 아닌 경우 `baseURL`은 URL 앞에 붙습니다.
    // 상대적인 URL을 인스턴스 메서드에 전달하려면 `baseURL`을 설정하는 것은 편리합니다.
    // baseURL: 'https://some-domain.com/api',
    baseURL: '/api',


    // `transformRequest`는 요청 데이터를 서버로 전송하기 전에 변경할 수 있게 해줍니다.
    // 이것은 'PUT', 'POST', 'PATCH', 'DELETE' 메소드에서만 적용됩니다.
    // 마지막 함수는 Buffer, ArrayBuffer, FormData 또는 Stream의 인스턴스 또는 문자열을 반환해야 합니다.
    // 헤더 객체를 수정할 수 있습니다.
    transformRequest: [function (data, headers) {
        // 데이터를 변환하려는 작업 수행
        console.log(headers);
        return data;
    }],

    // `transformResponse`는 응답 데이터가 then/catch로 전달되기 전에 변경할 수 있게 해줍니다.
    transformResponse: [function (data) {
        // 데이터를 변환하려는 작업 수행

        return data;
    }],

    // `headers`는 사용자 지정 헤더입니다.
    headers: {'X-Requested-With': 'XMLHttpRequest'},

    // `params`은 요청과 함께 전송되는 URL 파라미터입니다.
    // 반드시 일반 객체나 URLSearchParams 객체여야 합니다.
    // 참고: null이나 undefined는 URL에 렌더링되지 않습니다.
    params: {
        ID: 12345
    },

    // `paramsSerializer`는 `params`의 시리얼라이즈를 담당하는 옵션 함수입니다.
    // (예: https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },

    // `data`는 요청 바디로 전송될 데이터입니다.  
    // 'PUT', 'POST', 'PATCH', 'DELETE' 메소드에서만 적용 가능합니다.
    // `transformRequest`가 설정되지 않은 경우 다음 타입 중 하나여야 합니다.
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 브라우저 전용: FormData, File, Blob
    // - Node 전용: Stream, Buffer
    // data: {
    //     firstName: 'Fred'
    // },

    // 바디로 전송하는 데이터의 대안 문법
    // POST 메소드
    // 키가 아닌 값만 전송됩니다.
    // data: 'Country=Brasil&City=Belo Horizonte',

    // `timeout`은 요청이 시간 초과되기 전의 시간(밀리초)을 지정합니다.
    // 요청이 `timeout`보다 오래 걸리면 요청이 중단됩니다.
    timeout: 1000, // 기본값은 `0` (타임아웃 없음)

    // `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타냅니다.
    withCredentials: false, // 기본값

    // `adapter`'은 커스텀 핸들링 요청을 처리할 수 있어 테스트가 쉬워집니다.
    // 유효한 Promise 응답을 반환해야 합니다. (lib/adapters/README.md 참고)
    adapter: function (config) {
        /* ... */
        console.log(config);
    },

    // `auth`는 HTTP Basic 인증이 사용되며, 자격 증명을 제공합니다.
    // `auth`를 사용하면, `Authorization` 헤더가 설정되어 `headers`를 사용하여 설정한 기존의 `Authorization` 사용자 지정 헤더를 덮어씁니다.
    // 이 파라미터를 통해 HTTP Basic 인증만 구성할 수 있음을 참고하세요.
    // Bearer 토큰 등의 경우 `Authorization` 사용자 지정 헤더를 대신 사용합니다.
    auth: {
        username: 'janedoe',
        password: 's00pers3cret'
    },

    // `responseType`은 서버에서 받는 데이터의 타입입니다.
    // 옵션: 'arraybuffer', 'document', 'json', 'text', 'stream'
    // 브라우저 전용: 'blob'
    responseType: 'json', // 기본값

    // `responseEncoding`은 응답 디코딩에 사용할 인코딩입니다.
    // Node.js 전용
    // 참고: 클라이언트 사이드 요청 또는 `responseType`이 'stream'이면 무시합니다.
    responseEncoding: 'utf8', // 기본값

    // `xsrfCookieName`은 xsrf 토큰 값으로 사용할 쿠키의 이름입니다.
    xsrfCookieName: 'XSRF-TOKEN', // 기본값

    // `xsrfHeaderName`은 xsrf 토큰 값을 운반하는 HTTP 헤더의 이름입니다.
    xsrfHeaderName: 'X-XSRF-TOKEN', // 기본값

    // `onUploadProgress`는 업로드 진행 이벤트를 처리합니다.
    // 브라우저 전용
    onUploadProgress: function (progressEvent) {
        // 업로드 진행 이벤트 작업 수행
        console.log(progressEvent);
    },

    // `onDownloadProgress`는 다운로드로드 진행 이벤트를 처리합니다.
    // 브라우저 전용
    onDownloadProgress: function (progressEvent) {
        // 다운로드 진행 이벤트 작업 수행
        console.log(progressEvent);
    },

    // `maxContentLength`는 node.js에서 허용되는 http 응답 콘텐츠의 최대 크기를 바이트 단위로 정의합니다.
    maxContentLength: 2000,

    // `maxBodyLength`는 허용되는 http 요청 콘텐츠의 최대 크기를 바이트 단위로 정의합니다.
    // Node.js 전용
    maxBodyLength: 2000,

    // `validateStatus`는 지정된 HTTP 응답 상태 코드에 대한 Promise를 이행할지 또는 거부할지 여부를 정의합니다. 
    // 만약 `validateStatus`가 true를 반환하면(또는 'null' 또는 'undefined'으로 설정) Promise는 이행됩니다.
    // 그렇지 않으면, 그 Promise는 거부될 것이다.
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 기본값
    },

    // `maxRedirects`는 node.js에서 리디렉션 최대값을 정의합니다.
    // 0으로 설정하면 리디렉션되지 않습니다.
    maxRedirects: 5, // 기본값

    // `socketPath`는 node.js에서 사용될 UNIX 소켓을 정의합니다.
    // 예: '/var/run/docker.sock' 도커 데몬에 요청을 보냅니다.
    // 오직 `socketPath` 또는 `proxy`만 지정할 수 있습니다.
    // 둘 다 지정되면 `socketPath`가 사용됩니다.
    socketPath: null, // 기본값

    // `proxy`는 프록시 서버의 호스트이름, 포트, 프로토콜을 정의합니다.
    // 기존의 `http_proxy`와 `https_proxy` 환경 변수를 사용하여
    // 프록시를 정의할 수도 있습니다.
    // 프록시 구성에 환경 변수를 사용하는 경우, 'no_proxy' 환경 변수를 
    // 쉼표로 구분된 프록시가 되지 않는 도메인 목록으로 정의할 수도 있습니다.
    // `false`를 사용하면 프록시를 사용하지 않고, 환경 변수를 무시합니다.
    // `auth`는 프록시에 연결하는데 HTTP Basic auth를 사용해야 함을 나타내며, 
    // 자격 증명을 제공합니다. 그러면 `Proxy-Authorization` 헤더가 설정되고,
    // `headers`를 사용하여 기존의 `Proxy-Authorization` 사용자 지정 해더를 덮어씁니다.
    // 만약 프록시 서버가 HTTPS를 사용한다면, 프로토콜을 반드시 `https`로 설정해야 합니다.
    proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
        }
    },

    // `cancelToken`은 요청을 취소하는 데 사용할 수 있는 취소 토큰을 지정합니다.
    // (자세한 내용은 요청 취소 섹션 참조)
    // cancelToken: new CancelToken(function (cancel) {
    //     console.log(cancel)
    // }),

    // `decompress`는 응답 바디의 자동 압축 해제 여부를 나타냅니다.
    //  `true`로 설정하면, 압축 해제된 모든 응답에서 'content-encoding' 헤더도 제거됩니다.
    // Node.js 전용 (XHR은 압축 해제할 수 없습니다)
    decompress: true // 기본값
}

class Api  {
    // call = (config , params ,suc) => {
    call = (config , params ) => {
        // let auth = userAuthStore();

        if(!config) {
            alert('설정 정보가 없습니다.')
            return false;
        }

        let default_config = {
            url: config.url ? config.url : api_config.url
            , baseURL : config.baseURL ? config.baseURL : api_config.baseURL
            , method : config.method ? config.method : api_config.method
        }

        // if(auth.token)
        //     default_config.headers = {Authorization : 'Bearer ' + auth.token}

        if(default_config.method === 'get')
            default_config.params = params ? params : {}
        // else if(default_config.method === 'del') {
        //     delete default_config['params']
        //     delete default_config['data']
        // }
         else
            default_config.data = params ? params : {}

        // {
        //     url: config.url ? config.url : api_config.url
        //     , baseURL : config.baseURL ? config.baseURL : api_config.baseURL
        //     , method : config.method ? config.method : api_config.method
        //     , data : params ? params : {}
        // }
        return new Promise(function(resolve, reject) {
            axios(
                default_config
            ).then(function(response){     
                resolve(response.data);
            }).catch((err) =>{
                // this.needLogin(err);
                console.log('err.response' , err.response)
                console.log('err' , err)
                VueSimpleAlert.alert(SERVER_ERROR_MESSAGE[err.response.status]
                    , 'Error '.concat(err.status)
                    , 'error'
                )

                reject(err)
            })
        })
    }

    needLogin = (response) => {
        // let status = response.status ? response.status : response.data.status;
        let status = response.data ? response.data.status : response.status;
        let message = response.data ? response.data.message : response.message;
        // let auth = userAuthStore();

        if( status === 401) {
            console.log('message' , message);
            let open = confirm(message);

            if(open) {
                // auth.loginPopShow = true;
                // auth.token = '';
            }

            return true;
            
        } else if( status === 500){
            VueSimpleAlert.alert(response.response.data.message);
        }
        // console.log('response.data.status' , response.data.status);
        // console.log('response.data' , response.data);
        // console.log('response.data.resultData' , response.data.resultData);
        // console.log('response.status' , response.status);

        return false;
    }

}

export default new Api()
// export default {
//     install (app ) { 
//         app.provide('api' , new Api())
//     }
// }