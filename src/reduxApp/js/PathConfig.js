/**
 * 所有的接口路径都在这定义
 */
class Path = {};

let localHost = window.location.host;

switch(localHost) {
	case "localhost":
		Path.aPath = "";
	case "/test/":
		Path.aPath = "test";
	case "/demo/":
		Path.aPath = "demo";
	case "/release/":
		Path.aPath = "release"
}

export Path;