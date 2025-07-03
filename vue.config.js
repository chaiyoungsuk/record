const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  	transpileDependencies: true
	// , client: {
	// 	overlay: false
	// }
	,devServer: {
		proxy: {
        	'^/api': { 
          		target: 'http://localhost:9090',
          		ws:true,
          		changeOrigin: true,
          		pathRewrite: { 
            		'^/api': ''
        			},
        			'/token': {
          				target: 'http://dev-api-eunjinii.com',
          				changeOrigin: true,
        			}
      		}
    	}
		, client : {
			overlay: false
		}
  	}
})
