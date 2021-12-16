/** @param {NS} ns **/
export async function main(ns) {

	ns.disableLog('sleep');
	ns.clearLog();
	ns.print('WARN: Script started!');
	ns.print('INFO: added several hotkeys, like ctrl+s');
	ns.print('INFO: if you click on tab with pushed ctrl, its open log of this script. (if this script runned)');
	ns.print('INFO: You can add and delete tabs.');
	ns.print('INFO: Top menu with tabs, scrolable.');

	var stop = false;
	var disabledTabs = [];
	var topBarDiv;
	var files = [];
	var activeTab = [];
	var needToAdd = '';

	ns.ls("home", '.ns').forEach(e => files.push(e));
	ns.ls("home", '.js').forEach(e => files.push(e));
	ns.ls("home", '.script').forEach(e => files.push(e));

	var css = '.removeTab { display: inline-flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;position: relative;box-sizing: border-box;-webkit-tap-highlight-color: transparent;outline: 0px;margin-right: 6px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;min-width: 28px;padding: 6px 8px;transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color: rgb(195, 195, 195);background-color: rgb(109 7 7);border: 1px solid rgb(34, 34, 34);border-radius: 0px;} '
		+ '.removeTab:hover {background:rgb(49 0 0)} '
		+ '.addBtn { display: inline-flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;position: relative;box-sizing: border-box;-webkit-tap-highlight-color: transparent;outline: 0px;margin-right: 6px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;min-width: 28px;padding: 6px 8px;transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color: rgb(195, 195, 195);background-color: rgb(59 129 59);border: 1px solid rgb(34, 34, 34);border-radius: 0px;} '
		+ '.hideTrash {display:none;} '
		+ '.tabsDiv {overflow:auto;white-space: nowrap;width: 108vh;}'
		+ '.fileTable {padding: 3px;margin: 2px;background: #333333;color: #b2b3b2;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;cursor: pointer;}'
		+ '.fileTable:hover {background-color: rgb(0, 0, 0);}'
		+ '.filesToAddTable {background: #c7c7c7;max-width: 200px;position: fixed;right: 156px;top: 54px;z-index: 99999;background-color: rgb(51, 51, 51);border: 1px solid rgb(34, 34, 34);}';

	var style = document.createElement("div");
	style.id = 'myCustomStyles';
	style.innerHTML = "<style>" + css + "</style>";

	var styleDiv = document.getElementById('myCustomStyles');
	if (styleDiv) {
		styleDiv.remove();
		document.getElementsByTagName('head')[0].appendChild(style);
	} else {
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	var scrollTabs = function (event) {
		this.scrollLeft = this.scrollLeft + (event.deltaY + event.deltaX);
	}

	function updateFiles() {
		files = [];
		ns.ls("home", '.ns').forEach(e => files.push(e));
		ns.ls("home", '.js').forEach(e => files.push(e));
		ns.ls("home", '.script').forEach(e => files.push(e));
	}

	var checkWhereClick = function (e) {
		var elem = e.target;
		if (document.querySelector('.filesToAddTable')
			&& !elem.classList.contains('filesToAddTable')
			&& !elem.classList.contains('fileTable')
			&& !elem.classList.contains('addBtn')) {
			document.querySelector('.filesToAddTable').remove();
			document.removeEventListener('click', checkWhereClick);
		} else if (elem.classList.contains('fileTable')) {
			needToAdd = elem.innerText;
			document.querySelector('.filesToAddTable').remove();
			var tempArray = [];
			for (var i = 0; i < disabledTabs.length; i++) {
				if (disabledTabs[i] == needToAdd) {
					continue;
				}
				tempArray.push(disabledTabs[i]);
			}
			disabledTabs = tempArray;
			if (disabledTabs.length == 0) {
				document.querySelector('.addBtn').remove();
			}
			document.removeEventListener('click', checkWhereClick);
		}
	}

	var listener = function (e) {
		var elem = e.target;
		if (e.ctrlKey && elem.classList.contains('tabsBtns')) {
			var scriptPath = elem.getAttribute('data-script-path');
			terminal("home");
			terminal("tail " + scriptPath);
		} else if (e.code == 'KeyS' && e.ctrlKey || elem.id == 'justSaveBtn') {
			document.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root button')[2].click();
			document.querySelectorAll('.MuiListItem-button')[3].click();
		} else if (elem.classList.contains('minimizeBtn')) {
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
		} else if (elem.classList.contains('editBtn')) {
			var scrName = elem.parentElement.parentElement.firstElementChild.innerText;
			terminal("home");
			terminal("nano " + scrName);
		} else if (elem.classList.contains('tabsBtns')) {
			var scriptPath = elem.getAttribute('data-script-path');
			terminal("home");
			terminal("nano " + scriptPath);
		} else if (elem.classList.contains('removeTab')) {
			var tabId = elem.getAttribute('data-tab-id');
			var tabDiv = document.getElementById(tabId);
			var scrName = tabDiv.attributes[0].value;
			disabledTabs.push(scrName);
			tabDiv.remove();
			elem.remove();

			if (activeTab.includes(scrName)) {
				var tempArray = [];
				for (var i = 0; i < activeTab.length; i++) {
					if (activeTab[i] == scrName) {
						continue;
					}
					tempArray.push(activeTab[i]);
				}
				activeTab = tempArray;
			}
		} else if (elem.classList.contains('addBtn')) {

			if (document.querySelector('.filesToAddTable')) {
				document.querySelector('.filesToAddTable').remove();
			}

			var scriptsDivHTML = '<div class="filesToAddTable">'
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (!activeTab.includes(file)) {
					scriptsDivHTML += '<div class="fileTable">' + file + '</div>';
				}
			}
			scriptsDivHTML += '</div>';
			document.querySelector('.tabsDiv').insertAdjacentHTML('afterend', scriptsDivHTML);
			document.addEventListener('click', checkWhereClick);
		}
	}

	document.addEventListener('keydown', listener);

	function getCurrentTab() {
		var leftMenuBtns = document.querySelectorAll('.MuiListItem-button');
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
		document.querySelectorAll('.MuiListItem-button')[2].click();
		const terminalInput = document.getElementById("terminal-input");
		terminalInput.value = text;
		const handler = Object.keys(terminalInput)[1];
		terminalInput[handler].onChange({ target: terminalInput });
		terminalInput[handler].onKeyDown({ keyCode: 13, preventDefault: () => null }); //enter
	}

	var onExit = function (el) {
		stop = true; //we need it, coz script doing last cycle before end
		if (document.querySelectorAll('.minimizeBtn')) {
			document.querySelectorAll('.minimizeBtn').forEach(e => e.remove());
		}
		if (document.querySelectorAll('.editBtn')) {
			document.querySelectorAll('.editBtn').forEach(e => e.remove());
		}

		document.removeEventListener('keydown', listener);
		document.removeEventListener('click', listener);
		document.removeEventListener('click', checkWhereClick);

		if (document.querySelector('.tabsDiv')) {
			document.querySelector('.tabsDiv').remove();
			topBarDiv.removeEventListener('wheel', scrollTabs);
		}

		var logWindows = document.querySelectorAll('.drag.MuiBox-root');
		if (logWindows) {
			for (var i = 0; i < logWindows.length; i++) {
				var logDiv = logWindows[i].parentElement.parentElement.lastElementChild;
				logDiv.style.width = '';
				logDiv.style.height = '';
			}
		}
		if (document.getElementById('justSaveBtn')) {
			document.getElementById('justSaveBtn').remove()
		}
	}

	await ns.atExit(onExit);

	function addEditMinBtns() {
		var btnElementsDivs = document.querySelectorAll('.drag.MuiBox-root .MuiBox-root');
		var saveAndCloceBtn = document.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root button')[2];
		if (getCurrentTab() == 'editor' && btnElementsDivs && saveAndCloceBtn) {
			var styleCSS = saveAndCloceBtn.classList[6];

			if (getCurrentTab() == 'editor' && !document.getElementById('justSaveBtn')) {
				var saveBtn = '<div id="justSaveBtn" class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root ' + styleCSS + '" style="margin-left: 5px;">save (ctrl+s)</div>';
				saveAndCloceBtn.insertAdjacentHTML('afterend', saveBtn);
				document.getElementById('justSaveBtn').addEventListener('click', listener);
			}

			//idk what is that, but it justbreak the interface (doing it bigger then screen)
			document.querySelectorAll('#root .MuiBox-root .MuiBox-root')[1].style.height = '98vh';

			var btnsHTML = '<button class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root ' + styleCSS + ' minimizeBtn">'
				+ 'minimize'
				+ '</button>'
				+ '<button class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root ' + styleCSS + ' editBtn">'
				+ 'edit'
				+ '</button>';
			for (var i = 0; i < btnElementsDivs.length; i++) {
				var element = btnElementsDivs[i];
				var elContBtn = element.firstElementChild.classList.contains('minimizeBtn');
				if (elContBtn) {
					continue;
				} else if (!stop) {
					element.insertAdjacentHTML('afterbegin', btnsHTML);
					element.getElementsByClassName('minimizeBtn')[0].addEventListener('click', listener);
					element.getElementsByClassName('editBtn')[0].addEventListener('click', listener);
				};
			};
		}
	}

	function addTabs() {
		var placeToTabs = document.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root')[0];

		var tabHTMLExemplar = '<div data-script-path="#$tabPath" id="#$tabId" class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root #$userStyle tabsBtns">'
			+ '#$tabName'
			+ '</div>'
			+ '<div data-tab-id="#$tabId" id="#$rmBtnId" class="removeTab">X<div>';
		if (getCurrentTab() == 'editor' && !document.querySelector('.tabsDiv')) {
			var styleCSS = document.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root button')[2].classList[6];

			placeToTabs.insertAdjacentHTML('beforeEnd', '<div class="tabsDiv"></div>');
			topBarDiv = document.querySelector('.tabsDiv');
			for (var i = 0; i < files.length; i++) {
				var file = files[i];

				if (disabledTabs.includes(file)) {
					continue;
				}

				activeTab.push(file);

				var rmBtnId = 'rem-id-' + i;
				var tabId = 'tab-id-' + i;
				var tabName = file;
				var tabHTML = tabHTMLExemplar
					.replaceAll('#$tabPath', file)
					.replaceAll('#$tabId', tabId)
					.replaceAll('#$tabName', tabName)
					.replaceAll('#$rmBtnId', rmBtnId)
					.replaceAll('#$userStyle', styleCSS);
				topBarDiv.insertAdjacentHTML('beforeEnd', tabHTML);
			}

			var tabsDivChildrens = document.querySelector('.tabsDiv').children;
			for (var i = 0; i < tabsDivChildrens.length; i++) {
				var child = tabsDivChildrens[i];
				if (child.classList.contains('removeTab') || child.classList.contains('tabsBtns')) {
					child.addEventListener('click', listener);
				}
			}
			topBarDiv.addEventListener('wheel', scrollTabs);

		} else {
			if (needToAdd != '') {
				var styleCSS = document.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root button')[2].classList[6];
				var rmBtnId = 'rem-id-' + activeTab.length;
				var tabId = 'tab-id-' + activeTab.length;
				var tabName = needToAdd;
				var tabHTML = tabHTMLExemplar
					.replaceAll('#$tabPath', needToAdd)
					.replaceAll('#$tabId', tabId)
					.replaceAll('#$tabName', tabName)
					.replaceAll('#$rmBtnId', rmBtnId)
					.replaceAll('#$userStyle', styleCSS);
				if (document.querySelector('.addBtn')) {
					document.querySelector('.addBtn').insertAdjacentHTML('beforebegin', tabHTML);
				} else {
					document.querySelector('.tabsDiv').insertAdjacentHTML('beforeend', tabHTML);
				}
				activeTab.push(needToAdd);
				needToAdd = '';
			}
		}

		if (!document.querySelector('.addBtn') && document.querySelector('.tabsDiv') && disabledTabs.length != 0) {
			document.querySelector('.tabsDiv').insertAdjacentHTML('beforeend', '<div class="addBtn">+<div>');
			document.querySelector('.addBtn').addEventListener('click', listener);
		}
	}
	
	if (!document.getElementById('zavardo')) {
		document.getElementById('root').insertAdjacentHTML('afterBegin','<a id="zavardo" style="display:none;" href="https://youtu.be/7ePWNmLP0Z0">what?1!</a>');
	}
	//loop needed to add new btns to new log windows
	while (!stop) {
		updateFiles();
		addEditMinBtns();
		addTabs();
		await ns.sleep(200);
	};
	ns.clearLog();
	ns.print('WARN: Script killed!');
};