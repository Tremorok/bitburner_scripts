/** @param {NS} ns **/
export async function main(ns) {

	ns.disableLog('sleep');

	var stop = false;
	var disabledTabs = [];
	var files = [];
	var activeTab = [];
	var fileOnEdit = null;
	var needToAdd = '';
	var doc = document;
	var curTab = null;
	var scrollLeft = null;
	var int = {
		saveAndCloseBtn: null,
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

	start()
	//loop needed to add new btns to new log windows

	var sm = [".(^-^)'", "-(^-^)-", "'(^-^).", "-(^o^)-", ".(^-^)'", "-(^-^)-", "'(^-^).", "-(^-^)-"];
	var i = 0;
	var iter = 0;
	while (!stop) {
		curTab = getCurTab();

		updateBtns();
		addDivForTabs();
		udateStyles();

		updateFiles();
		addEditMinBtns();
		addTabs();
		addSaveBtn();
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
		if (curTab == 'editor') {
			userStyles.btns = 'MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root ' + int.saveAndCloseBtn.classList[6];
		}
	}

	function updateBtns() {
		if (curTab == 'editor') {
			int.saveAndCloseBtn = doc.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root button')[2];
			int.consoleDivs = doc.querySelectorAll('.drag.MuiBox-root .MuiBox-root');
			int.stats = doc.querySelector('.MuiCollapse-hidden');
			int.optBtn = doc.querySelectorAll('.MuiButtonBase-root.MuiIconButton-root')[2];
			int.addBtn = doc.querySelector('.addBtn');
			int.tabsDiv = doc.querySelector('.tabsDiv');
			int.topBarDiv = doc.querySelectorAll('#root .MuiBox-root .MuiBox-root .MuiBox-root .MuiBox-root')[0];
			fileOnEdit = doc.querySelector('.MuiInput-input.MuiInputBase-input.MuiInputBase-inputAdornedStart').value;
			int.selBtns = getComputedStyle(document.querySelectorAll('.MuiListItem-button')[17].children[1].firstElementChild).color;
		} else {
			int.saveAndCloseBtn = null;
			int.consoleDivs = null;
			int.stats = null;
			int.optBtn = null;
			int.addBtn = null;
			int.tabsDiv = null;
			int.topBarDiv = null;
			activeTab = [];
		}
		
		int.termBtn = doc.querySelectorAll('.MuiListItem-button')[2];
		int.script = doc.querySelectorAll('.MuiListItem-button')[3];
		int.logBtns = doc.querySelectorAll('.drag.MuiBox-root .MuiBox-root');
	}

	function start() {
		var css = '.removeTab { display: inline-flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;position: relative;box-sizing: border-box;-webkit-tap-highlight-color: transparent;outline: 0px;margin-right: 6px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;min-width: 28px;padding: 6px 8px;transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color: rgb(195, 195, 195);background-color: rgb(109 7 7);border: 1px solid rgb(34, 34, 34);border-radius: 0px;} '
			+ '.removeTab:hover {background:rgb(49 0 0)} '
			+ '.addBtn { display: inline-flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;position: relative;box-sizing: border-box;-webkit-tap-highlight-color: transparent;outline: 0px;margin-right: 6px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;min-width: 28px;padding: 6px 8px;transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color: rgb(195, 195, 195);background-color: rgb(59 129 59);border: 1px solid rgb(34, 34, 34);border-radius: 0px;} '
			+ '.hideTrash {display:none;} '
			+ '.tabsDiv {overflow:auto;white-space: nowrap;}'
			+ '.fileTable {padding: 3px;margin: 2px;background: #333333;color: #b2b3b2;text-decoration: none;text-transform: none;font-family: "Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman";font-weight: 500;font-size: 0.875rem;line-height: 1.75;cursor: pointer;}'
			+ '.fileTable:hover {background-color: rgb(0, 0, 0);}'
			+ '.filesToAddTable {background: #c7c7c7;max-width: 200px;position: fixed;right: 156px;top: 54px;z-index: 99999;background-color: rgb(51, 51, 51);border: 1px solid rgb(34, 34, 34);}';

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
			int.tabsDiv.scrollLeft = scrollLeft;
			scrollLeft = null;
		}
	}

	function tabsWidth() {
		if (curTab == 'editor' && int.tabsDiv && !int.stats) {
			int.tabsDiv.style.width = window.innerWidth - (250 + 270 + 40 + 162) + 'px';
		} else if (curTab == 'editor' && int.tabsDiv && int.stats) {
			int.tabsDiv.style.width = window.innerWidth - (250 + 270 + 40 + 60) + 'px';
		}
	}

	function optionsSmall() {
		if (curTab == 'editor' && int.optBtn.innerHTML.includes('options')) {
			int.optBtn.innerHTML = int.optBtn.innerHTML.replace('options', '');
		}
	}

	function addDivForTabs() {
		if (curTab == 'editor' && !int.tabsDiv) {
			int.topBarDiv.insertAdjacentHTML('beforeEnd', '<div class="tabsDiv"></div>');
			int.tabsDiv = doc.querySelector('.tabsDiv');
			doc.querySelector('.tabsDiv').addEventListener('wheel', scrollTabs);
		}
	}

	function addPlus() {
		if (curTab == 'editor' && int.tabsDiv && disabledTabs.length != 0 && !int.addBtn) {
			int.tabsDiv.insertAdjacentHTML('beforeend', '<div class="addBtn">+<div>');
			doc.querySelector('.addBtn').addEventListener('click', listener);
			int.tabsDiv.scrollLeft += 40;
		}
	}

	function addSaveBtn() {
		if (curTab == 'editor' && !doc.getElementById('justSaveBtn')) {
			var saveBtn = '<div id="justSaveBtn" class="' + userStyles.btns + '" style="margin-left: 5px;">Save (Ctrl+s)</div>';
			int.saveAndCloseBtn.insertAdjacentHTML('afterend', saveBtn);
			doc.getElementById('justSaveBtn').addEventListener('click', listener);
		}
	}

	function updateFiles() {
		files = [];
		ns.ls("home", '.ns').forEach(e => files.push(e));
		ns.ls("home", '.js').forEach(e => files.push(e));
		ns.ls("home", '.script').forEach(e => files.push(e));
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
			needToAdd = elem.innerText;
			doc.querySelector('.filesToAddTable').remove();
			var tempArray = [];
			for (var i = 0; i < disabledTabs.length; i++) {
				if (disabledTabs[i] == needToAdd) {
					continue;
				}
				tempArray.push(disabledTabs[i]);
			}
			disabledTabs = tempArray;
			if (disabledTabs.length == 0) {
				int.addBtn.remove();
			}
			doc.removeEventListener('click', checkWhereClick);
		}
	}

	function listener(e) {
		var elem = e.target;
		var cList = elem.classList;
		if (e.ctrlKey && cList.contains('tabsBtns')) {
			var scriptPath = elem.getAttribute('data-script-path');
			scrollLeft = int.tabsDiv.scrollLeft;
			int.termBtn.click();
			terminal("home");
			terminal("tail " + scriptPath);
			int.script.click();
			activeTab = [];
		} else if ((e.code == 'KeyS' && e.ctrlKey || elem.id == 'justSaveBtn') && curTab == 'editor') {
			scrollLeft = int.tabsDiv.scrollLeft;
			int.saveAndCloseBtn.click();
			int.script.click();
			activeTab = [];
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
			activeTab = [];
		} else if (cList.contains('tabsBtns')) {
			var scriptPath = elem.getAttribute('data-script-path');
			scrollLeft = int.tabsDiv.scrollLeft;
			int.termBtn.click();
			terminal("home");
			terminal("nano " + scriptPath);
			activeTab = [];
		} else if (cList.contains('removeTab')) {
			var tabId = elem.getAttribute('data-tab-id');
			var tabDiv = doc.getElementById(tabId);
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
		} else if (cList.contains('addBtn')) {
			if (doc.querySelector('.filesToAddTable')) {
				doc.querySelector('.filesToAddTable').remove();
			}
			var scriptsDivHTML = '<div class="filesToAddTable">'
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (!activeTab.includes(file)) {
					scriptsDivHTML += '<div class="fileTable">' + file + '</div>';
				}
			}
			scriptsDivHTML += '</div>';
			int.tabsDiv.insertAdjacentHTML('afterend', scriptsDivHTML);
			doc.addEventListener('click', checkWhereClick);
		}
	}

	function addEditMinBtns() {
		var btnElementsDivs = doc.querySelectorAll('.drag.MuiBox-root .MuiBox-root');
		var saveAndCloceBtn = int.saveAndCloseBtn;

		if (curTab == 'editor' && btnElementsDivs && saveAndCloceBtn) {
			//idk what is that, but it justbreak the interface (doing it bigger then screen)
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
				} else if (!stop) {
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

	function addTabs() {
		if (curTab == 'editor') {
			var tabHTMLExemplar = '<div data-script-path="#$tabPath" id="#$tabId" #$Style class="' + userStyles.btns + ' tabsBtns">'
				+ '#$tabName'
				+ '</div>'
				+ '<div data-tab-id="#$tabId" id="#$rmBtnId" class="removeTab">X<div>';

			if (activeTab.length == 0) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					if (disabledTabs.includes(file)) {
						continue;
					}

					activeTab.push(file);

					var rmBtnId = 'rem-id-' + i;
					var tabId = 'tab-id-' + i;
					var tabName = file;
					insertTabs(tabName, tabId, tabName, rmBtnId);
				}
			} else if (needToAdd != '') {
				var rmBtnId = 'rem-id-' + activeTab.length;
				var tabId = 'tab-id-' + activeTab.length;
				var tabName = needToAdd;
				insertTabs(needToAdd, tabId, tabName, rmBtnId);
				activeTab.push(needToAdd);
				needToAdd = '';
			}
		}

		function insertTabs(tabPath, tabId, tabName, rmBtnId) {
			var tabHTML = tabHTMLExemplar
				.replaceAll('#$tabPath', tabPath)
				.replaceAll('#$tabId', tabId)
				.replaceAll('#$tabName', tabName)
				.replaceAll('#$rmBtnId', rmBtnId);
			if (tabName != fileOnEdit) {
				tabHTML = tabHTML.replaceAll('#$Style', 'style="color:' + int.selBtns + ';"');
			} else {
				tabHTML = tabHTML.replaceAll('#$Style', '');
			}

			if (int.addBtn) {
				int.addBtn.insertAdjacentHTML('beforebegin', tabHTML);
			} else {
				int.tabsDiv.insertAdjacentHTML('beforeend', tabHTML);
			}
			doc.getElementById(rmBtnId).addEventListener('click', listener)
			doc.getElementById(tabId).addEventListener('click', listener);
		}

	}

	function onExit() {
		stop = true; //we need it, coz script doing last cycle before end
		if (doc.querySelectorAll('.minimizeBtn')) {
			doc.querySelectorAll('.minimizeBtn').forEach(e => e.remove());
		}
		if (doc.querySelectorAll('.editBtn')) {
			doc.querySelectorAll('.editBtn').forEach(e => e.remove());
		}

		doc.removeEventListener('keydown', listener);
		doc.removeEventListener('click', listener);
		doc.removeEventListener('click', checkWhereClick);
		if (int.optBtn) {
			int.optBtn.innerHTML += 'options';
		}

		if (int.tabsDiv) {
			int.tabsDiv.remove();
			int.tabsDiv.removeEventListener('wheel', scrollTabs);
		}

		var logWindows = doc.querySelectorAll('.drag.MuiBox-root');
		if (logWindows) {
			for (var i = 0; i < logWindows.length; i++) {
				var logDiv = logWindows[i].parentElement.parentElement.lastElementChild;
				logDiv.style.width = '';
				logDiv.style.height = '';
			}
		}
		if (doc.getElementById('justSaveBtn')) {
			doc.getElementById('justSaveBtn').remove()
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