/** @param {NS} ns **/
export async function main(ns) {

	ns.disableLog('sleep');

	var disabledTabs = [];
	var files = [];
	var activeTabs = [];
	var doc = document;
	var curTab = null;
	var scrollLeft = null;
	var int = {
		saveBtn: null,
		consoleDivs: null,
		stats: null,
		logBtns: null,
		optBtn: null,
		addBtn: null,
		script: null,
		tabsDiv: null,
		topBarDiv: null,
	}
	var userStyles = {
		btns: null,
		selBtns: null,
	}

	start();

	//loop needed to add new btns to new log windows
	var sm = [".(^-^)'", "-(^-^)-", "'(^-^).", "-(^o^)-", ".(^-^)'", "-(^-^)-", "'(^-^).", "-(^-^)-"];
	var i = 0;
	var iter = 0;
	while (true) {
		curTab = getCurTab();

		updateBtns();
		addScrollForTabs();
		udateStyles();

		updateFiles();
		addEditMinBtns();
		addPlus();
		optionsSmall();
		tabsWidth();
		toScroll();

		if (iter % 5 == 0) {
			ns.clearLog();
			ns.print('WARN Script started!');
			ns.print('INFO added several hotkeys, like ctrl+s');
			ns.print('INFO if you click on tab with pushed ctrl, its open log of this script. (if this script runned)');
			ns.print('INFO You can add and delete tabs.');
			ns.print('INFO Top menu with tabs, scrolable.');
			ns.print(sm[i] + sm[i] + sm[i] + sm[i] + sm[i] + sm[i]);
			if (i == 7) {
				i = 0;
			} else {
				i++;
			}
		}

		if (iter == 35) {
			iter = 0;
		} else {
			iter++;
		}
		await ns.sleep(200);
	}

	function udateStyles() {
		if (curTab == 'editor' && int.saveBtn) {
			userStyles.btns = 'MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root ' + int.saveBtn.classList[6];
		}
	}

	function updateBtns() {
		if (curTab == 'editor') {
			var allBtnsOnPage = document.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root button.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButtonBase-root');
			for (var i = 0; i < allBtnsOnPage.length; i++) {
				var btn = allBtnsOnPage[i];
				if (btn.innerText == 'Save (Ctrl/Cmd + b)') {
					btn.innerText = 'Save (Ctrl/Cmd + s)';
					int.saveBtn = btn;
				} else if (btn.innerText == 'Save (Ctrl/Cmd + s)') {
					int.saveBtn = btn;
				}
			}
			
			int.consoleDivs = doc.querySelectorAll('.drag.MuiBox-root .MuiBox-root');
			int.stats = doc.querySelector('.MuiCollapse-hidden');
			int.optBtn = doc.querySelectorAll('.MuiButtonBase-root.MuiIconButton-root')[2];
			int.addBtn = doc.querySelector('.addBtn');
			int.tabsDiv = doc.querySelector('.tabsDiv');
			int.topBarDiv = doc.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root')[0];
			
			int.selBtns = getComputedStyle(document.querySelectorAll('.MuiListItem-button')[17].children[1].firstElementChild).color;
		} else {
			int.saveBtn = null;
			int.consoleDivs = null;
			int.stats = null;
			int.optBtn = null;
			int.addBtn = null;
			int.tabsDiv = null;
			int.topBarDiv = null;
		}
		
		int.termBtn = doc.querySelectorAll('.MuiListItem-button')[2];
		int.script = doc.querySelectorAll('.MuiListItem-button')[3];
		int.logBtns = doc.querySelectorAll('.drag.MuiBox-root .MuiBox-root');
	}

	function start() {
		var css = '.addBtn { display: inline-flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;position: relative;box-sizing: border-box;-webkit-tap-highlight-color: transparent;outline: 0px;margin-right: 6px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;min-width: 28px;padding: 6px 8px;transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color: rgb(195, 195, 195);background-color: rgb(59 129 59);border: 1px solid rgb(34, 34, 34);border-radius: 0px;} '
			+ '.fileTable {padding: 3px;margin: 2px;background: #333333;color: #b2b3b2;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;cursor: pointer;}'
			+ '.fileTable:hover {background-color: rgb(0, 0, 0);}'
			+ '.filesToAddTable {background: #c7c7c7;max-width: 200px;position: fixed;left: 264px;top: 52px;z-index: 99999;background-color: rgb(51, 51, 51);border: 1px solid rgb(34, 34, 34);}';

		var style = doc.createElement("div");
		style.id = 'myCustomStyles';
		style.innerHTML = "<style>" + css + "</style>";

		var styleDiv = doc.getElementById('myCustomStyles');
		if (styleDiv) {
			styleDiv.remove();
			doc.getElementsByTagName('head')[0].appendChild(style);
		} else {
			doc.getElementsByTagName('head')[0].appendChild(style);
		}

		if (!doc.getElementById('zavardo')) {
			doc.getElementById('root').insertAdjacentHTML('afterBegin', '<a id="zavardo" style="display:none;" href="https://youtu.be/7ePWNmLP0Z0">what?1!</a>');
		}

		doc.addEventListener('keydown', listener);

		ns.atExit(onExit);
	}

	function toScroll() {
		if (scrollLeft != null) {
			int.topBarDiv.scrollLeft = scrollLeft;
			scrollLeft = null;
		}
	}

	function tabsWidth() {
		if (curTab == 'editor' && int.topBarDiv && !int.stats) {
			int.topBarDiv.style.width = (window.innerWidth - 265 - 140) + 'px';
		} else if (curTab == 'editor' && int.topBarDiv && int.stats) {
			int.topBarDiv.style.width = (window.innerWidth - 265 - 40) + 'px';
		}
		if (curTab == 'editor' && int.topBarDiv && int.topBarDiv.style.overflow == '') {
			int.topBarDiv.style.overflow = 'auto';
			int.topBarDiv.style.whiteSpace = 'nowrap';
		}
	}

	function optionsSmall() {
		if (curTab == 'editor' && int.optBtn.innerHTML.includes('options')) {
			int.optBtn.innerHTML = int.optBtn.innerHTML.replace('options', '');
		}
	}

	function addScrollForTabs() {
		if (curTab == 'editor' && int.topBarDiv) {
			int.topBarDiv.addEventListener('wheel', scrollTabs);
		}
	}

	function addPlus() {
		if (curTab == 'editor' && disabledTabs.length != 0 && !int.addBtn) {
			int.topBarDiv.insertAdjacentHTML('afterbegin', '<div class="addBtn">+<div>');
			doc.querySelector('.addBtn').addEventListener('click', listener);
		} else if (doc.querySelector('.addBtn') && disabledTabs.length == 0) {
			doc.querySelector('.addBtn').remove();
		}
	}

	function updateFiles() {
		files = [];
		ns.ls("home", '.ns').forEach(e => files.push(e));
		ns.ls("home", '.js').forEach(e => files.push(e));
		ns.ls("home", '.script').forEach(e => files.push(e));
		if (curTab == 'editor') {
			var allBtnsOnPage = document.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root button.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButtonBase-root');
			activeTabs = [];
			for (var i = 0; i < allBtnsOnPage.length; i++) {
				var btn = allBtnsOnPage[i];
				if (btn.value.includes(':') && !btn.innerText.includes('x')) {
					activeTabs.push(btn.value.split(':')[0]);
					btn.classList.add("tabBtn");
				}
			}
			disabledTabs = [];
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (!activeTabs.includes(file)) {
					disabledTabs.push(file);
				}
			}
		}
	}

	function checkWhereClick(e) {
		var elem = e.target;
		var cList = elem.classList;
		if (doc.querySelector('.filesToAddTable')
			&& !cList.contains('filesToAddTable')
			&& !cList.contains('fileTable')
			&& !cList.contains('addBtn')) {
			doc.querySelector('.filesToAddTable').remove();
			doc.removeEventListener('click', checkWhereClick);
		} else if (cList.contains('fileTable')) {
			var newTab = elem.innerText;
			int.termBtn.click();
			terminal("home");
			terminal("nano "+newTab);
			doc.removeEventListener('click', checkWhereClick);
		}
	}

	function listener(e) {
		var elem = e.target;
		var cList = elem.classList;
		if (e.ctrlKey && cList.contains('tabBtn') && curTab == 'editor') {
			var scriptPath = elem.innerText.split(':')[0];
			scrollLeft = int.topBarDiv.scrollLeft;
			int.termBtn.click();
			terminal("home");
			terminal("tail " + scriptPath);
			int.script.click();
		} else if ((e.code == 'KeyS' && e.ctrlKey) && curTab == 'editor') {
			int.saveBtn.click();
		} else if (cList.contains('minimizeBtn')) {
			var logDiv = elem.parentElement.parentElement.parentElement.parentElement;
			var wordSize = logDiv.firstElementChild.firstElementChild.firstElementChild.offsetWidth;
			var small = logDiv.lastElementChild.style.width == '' ? true : false;
			var sizedWidth = 277 + wordSize;
			if (small) {
				logDiv.lastElementChild.style.width = sizedWidth + 'px';
				logDiv.lastElementChild.style.height = '0px';
			} else {
				logDiv.lastElementChild.style.width = '';
				logDiv.lastElementChild.style.height = '';
			}
		} else if (cList.contains('editBtn')) {
			var scrName = elem.parentElement.parentElement.firstElementChild.innerText;
			if (int.tabsDiv) {
				scrollLeft = int.tabsDiv.scrollLeft;
			} else {
				scrollLeft = scrollLeft;
			}
			int.termBtn.click();
			terminal("home");
			terminal("nano " + scrName);
		} else if (cList.contains('addBtn')) {
			if (doc.querySelector('.filesToAddTable')) {
				doc.querySelector('.filesToAddTable').remove();
			}
			var scriptsDivHTML = '<div class="filesToAddTable">'
			for (var i = 0; i < disabledTabs.length; i++) {
				var tab = disabledTabs[i];
				scriptsDivHTML += '<div class="fileTable">' + tab + '</div>';
			}
			scriptsDivHTML += '</div>';
			int.topBarDiv.insertAdjacentHTML('afterend', scriptsDivHTML);
			doc.addEventListener('click', checkWhereClick);
		}
	}

	function addEditMinBtns() {
		var btnElementsDivs = doc.querySelectorAll('.drag.MuiBox-root .MuiBox-root');
		var saveAndCloceBtn = int.saveBtn;

		if (curTab == 'editor' && btnElementsDivs && saveAndCloceBtn) {
			//tahts fixing some of interface size
			doc.querySelectorAll('#root .MuiBox-root .MuiBox-root')[1].style.height = '98vh';
			doc.querySelectorAll('#root .MuiBox-root .MuiBox-root')[1].style.width = '85vw';

			var btnsHTML = '<button class="' + userStyles.btns + ' minimizeBtn">'
				+ 'minimize'
				+ '</button>'
				+ '<button class="' + userStyles.btns + ' editBtn">'
				+ 'edit'
				+ '</button>';
			for (var i = 0; i < btnElementsDivs.length; i++) {
				var element = btnElementsDivs[i];
				var elContBtn = element.firstElementChild.classList.contains('minimizeBtn');
				if (elContBtn) {
					continue;
				} else {
					element.insertAdjacentHTML('afterbegin', btnsHTML);
					element.getElementsByClassName('minimizeBtn')[0].addEventListener('click', listener);
					element.getElementsByClassName('editBtn')[0].addEventListener('click', listener);
				}
			}
		}
	}

	function scrollTabs(event) {
		this.scrollLeft = this.scrollLeft + (event.deltaY + event.deltaX);
	}

	function onExit() {
		if (doc.querySelectorAll('.minimizeBtn')) {
			doc.querySelectorAll('.minimizeBtn').forEach(e => e.remove());
		}
		if (doc.querySelectorAll('.editBtn')) {
			doc.querySelectorAll('.editBtn').forEach(e => e.remove());
		}

		if (curTab == 'editor') {
			int.saveBtn.innerText = 'Save (Ctrl/Cmd + b)';
		}

		if (int.addBtn) {
			int.addBtn.remove();
		}

		doc.removeEventListener('keydown', listener);
		doc.removeEventListener('click', listener);
		doc.removeEventListener('click', checkWhereClick);
		if (int.optBtn) {
			int.optBtn.innerHTML += 'options';
		}

		if (int.topBarDiv) {
			int.topBarDiv.removeEventListener('wheel', scrollTabs);
		}

		var logWindows = doc.querySelectorAll('.drag.MuiBox-root');
		if (logWindows) {
			for (var i = 0; i < logWindows.length; i++) {
				var logDiv = logWindows[i].parentElement.parentElement.lastElementChild;
				logDiv.style.width = '';
				logDiv.style.height = '';
			}
		}
	}

	function getCurTab() {
		var leftMenuBtns = doc.querySelectorAll('.MuiListItem-button');
		var leftMenuNames = {
			'2': 'terminal',
			'3': 'editor',
			'4': 'activeScripts',
			'5': 'createProgram',
			'6': 'stats',
			'7': 'factions',
			'8': 'augment',
			'9': 'hacknet',
			'11': 'city',
			'12': 'travel',
			'13': 'market',
			'15': 'milstones',
			'16': 'tutorial',
			'17': 'options',
		};
		for (var i = 0; i < leftMenuBtns.length; i++) {
			var btn = leftMenuBtns[i];
			if (getComputedStyle(btn).borderLeft.includes('3px')) {
				return leftMenuNames[i];
			}
		}
		return false;
	}

	function terminal(text) {
		const terminalInput = doc.getElementById("terminal-input");
		terminalInput.value = text;
		const handler = Object.keys(terminalInput)[1];
		terminalInput[handler].onChange({ target: terminalInput });
		terminalInput[handler].onKeyDown({ keyCode: 13, preventDefault: () => null }); //enter
	}
}