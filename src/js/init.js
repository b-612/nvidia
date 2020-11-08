import { forms } from "./modules/forms";
import { mobileNav } from "./modules/mobile-nav";
import { popup } from "./modules/popup";
import { svgXUse } from "./modules/svgxuse";

var App = () => {};

App.prototype.init = () => {
	forms.init();
	mobileNav.init();
	popup.init();
	svgXUse.init();
};

export { App };
