import yargs from 'yargs';

const args = yargs

	.option('production',{//区分开发环境和线上环境
		boolean: true,
		default: false,
		describe: 'min all scripts'//给机器看的
	})

	.option('watch', {//命令行监听修改
		boolean: true,
		default: false,
		describe: 'watch all files'
	})

	.option('verbose', {//是否详细输出命令行执行的日志
		boolean: true,
		default: false,
		describe: 'log'
	})

	.option('sourcemaps', {//对sourcemaps参数的处理,有关映射
		describe: 'force the creation of sourcemaps'
	})

	.option('port', {//设置服务器端口
		string: true,
		default: 8080,
		describe: 'server port'
	})

	.argv//表示对输入命令行的内容以字符串解析

export default args;