export async function main(ns) {
	ns.disableLog('sleep');
	ns.clearLog();
	ns.print('WARN: Script started!');
	
	var btnHTML = '<div class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1pmee5w hideBtnTeremok">minimize</div>';
	var stop = false;
	var listener = function () {
		//idk how to do it not more shiti))0)
		var logDiv = this.parentElement.parentElement.parentElement.parentElement;
		var wordSize = logDiv.firstElementChild.firstElementChild.firstElementChild.offsetWidth;
		var scriptNameLength = logDiv.lastElementChild.style.width;
		var sizedWidth = 213 + wordSize;

		if (scriptNameLength == '') {
			logDiv.lastElementChild.style.width = sizedWidth+'px';
			logDiv.lastElementChild.style.height = '0px';
		} else {
			logDiv.lastElementChild.style.width = '';
			logDiv.lastElementChild.style.height = '';
		};
	};

	var onnExit = function (el) {
		stop = true; //we need it, coz script doing last cycle before end
		document.querySelectorAll('.hideBtnTeremok').forEach(e => e.remove());
	}
	await ns.atExit(onnExit);

	//loop needed to add new btn to new log windows
	while (!stop) {
		var btnElementsDivs = document.getElementsByClassName('css-1g4x5kn');
		for (var i = 0; i < btnElementsDivs.length; i++) {
			var element = btnElementsDivs[i];
			var elContBtn = element.firstElementChild.classList.contains('hideBtnTeremok');
			if (elContBtn) {
				continue;
			} else if (!stop) {
				element.insertAdjacentHTML('afterbegin', btnHTML);
				element.getElementsByClassName('hideBtnTeremok')[0].addEventListener('click', listener);
			};
		};
		await ns.sleep(200); //you can change time if you think it fast
	};
};