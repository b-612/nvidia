// =========================================================
// Gulp Task: pug
// =========================================================
let path = require("../settings/path.json");
let fs = require("fs");

module.exports = (gulp, plugins, browserSync) => {
	return () => {
		let errorHandler = plugins.notify.onError("<%= error.message %>");
		var reload = browserSync.reload;

		var stream =
			// -------------------------------------------- Start Task
			gulp
				.src(path.src.html)
				// .pipe(plugins.changed("dist", { extension: ".html" }))
				.pipe(
					plugins.newer({
						dest: "./dist/",
						extra: "./src/pug/{layouts,mixin}/*.pug",
					})
				)
				.pipe(plugins.plumber({ errorHandler }))
				.pipe(
					plugins.pug({
						pretty: false,
					})
				)
				.pipe(
					plugins.replace(
						/(css\/|\/css\/)|(js\/|\/js\/)/g,
						(match) => {
							let sub = match.charAt(0) == "/" ? "/app" : "/app/";

							return sub + match;
						}
					)
				)
				.pipe(
					plugins.replace(/<img.*?src="(.*?)".*?(>)/g, (match) => {
						var attrs = match.replace(/(<img |<img|>|\/>)/g, "");
						var src,
							webpSrc,
							subAttr = [],
							template;

						attrs
							.match(
								/(\S+)=(["']?)([^\\\2]*?(?:\\[^\2].*?)*)(\2|$|>)/g
							)
							.forEach((element) => {
								if (element.indexOf("src") !== -1) {
									src = element
										.match(/("|')(.*?)("|').*?/g)
										.toString()
										.replace("/img/", "/app/img/");
									webpSrc = src.replace(
										/(gif|jpg|jpeg|tiff|png)/g,
										"webp"
									);
								} else {
									subAttr.push(element.trim());
								}
							});

						template = `<img src=${src} ${subAttr.join(" ")} />`;

						if (!webpSrc.includes("svg")) return template;
						else return match;
					})
				)
				.pipe(
					plugins.replace(
						/(?:^|[^а-яёА-ЯЁ0-9_])(в|без|а|до|из|к|я|на|по|о|от|перед|при|через|с|у|за|над|об|под|про|для|и|или|со)(?:^|[^а-яёА-ЯЁ0-9_])/g,
						(match) => {
							var newText =
								match.slice(-1) == " "
									? match.substr(0, match.length - 1) +
									  "&nbsp;"
									: match;

							return newText;
						}
					)
				)
				.pipe(
					plugins.htmlPrettify({ indent_char: " ", indent_size: 4 })
				)
				.pipe(gulp.dest(path.build.html))
				.on("end", browserSync.reload);
		// ---------------------------------------------- End Task
		return stream;
	};
};
