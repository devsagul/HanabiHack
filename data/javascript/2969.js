(function($) {
	var d = document;

	// Functions will be placed here by highlighter modules.
	Symphony.Extensions['CodeEditor'] = {'highlighters': {}};

	// Functions for highlighter modules.

	$.fn.appendText = function(text) {
		this.each(function() {
			$(this).append(d.createTextNode(text));
		});
	};

	$.fn.appendSpan = function(class_name, text) {
		this.each(function() {
			var span = d.createElement('span');
			span.className = class_name;
			span.appendChild(d.createTextNode(text));
			$(this).append(span);
		});
	};
		
	var body,
		contents,
		actions;

	var in_workspace;
	var new_file,
		document_modified = false;

	var highlighter,
		style_prefix;

	var	$div_actions;

	var name_field;
	var form_action;

	var text_area;

	var editor = {
		'outer': 'div.outer',
		'inner': 'div.inner',
		'panel_anchor': 'div.panel-anchor',
		'text_panel': 'div.text-panel code',
		'back_panel': 'div.back-panel code',
		'selection': 'span.selection',
		'line_numbers': 'div.line-numbers'
	}
		
	var last_key_code;
	var gutter_width = 34;
	var x_margin = 3,
		y_margin = 2;

	/*
	 * Set editor up..
	 */

	$().ready(function() {
		if(window.getSelection() == undefined) return;
		body = $('body');
		contents = $('#contents')[0];
		actions = $('#contents div.actions');

		name_field = $('input[name="fields[name]"]')[0];
		//new_file = (name_field.value == '');

/*		in_workspace = $(body).is('#extension-code_editor-view');
		if(in_workspace) {
			setHighlighting();
		}
		else{
			highlighter = Symphony.Extensions.CodeEditor.highlighters['xsl'];
		}
*/
		$('body').mousedown(function(event) {
			if($(editor.inner).hasClass('focus')) {
				$(editor.inner).removeClass('focus');
				if($(editor.selection).hasClass('caret')) {
					$(editor.selection).css('visibility', 'hidden');
				}
				//window.getSelection().removeAllRanges();
			}
		});

		text_area = $('textarea.code')[0];
		$(text_area)
			.addClass('hidden')
			.appendTo('#contents fieldset:first')
			.scrollTop(0)
			.keydown(function(event) {
				var key = event.which;
				last_key_code = key;

				// Allow tab insertion
/*				if(key == 9 && in_workspace) {
					var start = text_area.selectionStart,
						end = text_area.selectionEnd,
						position = text_area.scrollTop;

					event.preventDefault();

					// Add tab
					text_area.value = text_area.value.substring(0, start) + "\t" + text_area.value.substring(end, text_area.value.length);
					text_area.selectionStart = start + 1;
					text_area.selectionEnd = start + 1;

					// Restore scroll position
					text_area.scrollTop = position;
				}*/
				if(([8, 9, 13, 32, 45, 46].indexOf(key) != -1) || (key >= 48 && key <= 90) || (key >= 163 && key <= 222)){
					//if(!$(body).hasClass('unsaved-changes')) $(body).addClass('unsaved-changes');
					/*if(!document_modified) {
						document_modified = true;
						breadcrumbs_filename.html(breadcrumbs_filename.html() + ' <small>↑</small>');
					}*/
					setTimeout(updateEditor, 2);
				}
				else if(key >= 33 && key <= 40) {
					setTimeout(positionEditorCaret, 1);
				}
			})
			.on('cut paste', function(event) {
				setTimeout(updateEditor, 1);
			});

		for(var key in editor) {
			var split_val = editor[key].split(".");
			editor[key] = d.createElement(split_val[0]);
			editor[key].className = "editor-" + split_val[1];
		}

		$(editor.inner)
			.scroll(function() {
				$(editor.line_numbers).scrollTop(editor.inner.scrollTop);
			})
			.mousedown(function(event) {
				if(!($(editor.inner).hasClass('focus'))) {
					$(editor.inner).addClass('focus');
					$(editor.selection).text(" ").css('visibility', 'visible');
					text_area.focus();
					positionEditorCaret();
				}
				//event.preventDefault();
				event.stopPropagation();
			});

		$(editor.text_panel)
			.mousedown(function(event) {
				if(!($(editor.inner).hasClass('focus'))) {
					$(editor.inner).addClass('focus');
					$(editor.selection).text(" ").css('visibility', 'visible');
				}
				event.stopPropagation();
			})
			.mouseup(function(event) {
				var s = window.getSelection().getRangeAt(0);
				text_area.selectionStart = (createRange(editor.text_panel, 0, s.startContainer, s.startOffset)).toString().length;
				text_area.selectionEnd = (createRange(editor.text_panel, 0, s.endContainer, s.endOffset)).toString().length;
				text_area.focus();
				positionEditorCaret();
				event.stopPropagation();
			});

		$(editor.panel_anchor)
			.append(editor.text_panel)
			.append(editor.back_panel);
		$(editor.inner)
			.append(editor.panel_anchor);
		$(editor.outer)
			.append(editor.inner)
			.append(editor.line_numbers)
			.appendTo($('#contents fieldset label')[1]);

		textToEditor();

		if(typeof(window.MutationObserver) != 'function'){
			window.MutationObserver = (window.MozMutationObserver || window.WebkitMutationObserver);
		}
		try{
			var	observer = new MutationObserver(
				function(mutations){
					//mutations.forEach(function(mutation) {
					//	console.log(mutation.type);
					//})
					$(editor.line_numbers)
						.css('height', editor.inner.clientHeight + 'px');
					$(editor.text_panel)
						.css('minWidth', (editor.inner.clientWidth - 42) + 'px')
						.css('minHeight', (editor.inner.clientHeight - 4) + 'px');
					$(editor.back_panel)
						.css('minWidth', (editor.inner.clientWidth - 42) + 'px');
				}
			)
			observer.observe(editor.inner, {'attributes': true});
		}
		catch(error) {}
	});

	function setHighlighting(){
		if(name_field == undefined) {
			highlighter = Symphony.Extensions.CodeEditor.highlighters['xsl'];
			return;
		}
		var filename = name_field.value;
		if(filename != ""){
			var filename_split = filename.split(".");
			var ext = filename_split.pop();
			if(filename_split.length > 0) {
				highlighter = Symphony.Extensions.CodeEditor.highlighters[ext];
			}
		}
	}

	/*
	 * Create range.
	 */
	function createRange(start_node, start_offset, end_node, end_offset) {
		var range = d.createRange();
		range.setStart(start_node, start_offset);
		range.setEnd(end_node, end_offset);
		return range;
	}

	/*
	 * Write updated content to editor
	 */
	function updateEditor() {
		textToEditor();
		positionEditorCaret();
	}

	/*
	 * Fill editor with highlighted text..
	 */

 	function textToEditor() {
		setHighlighting();
		if(highlighter) {
			$(editor.text_panel)
			.empty()
			.append(highlighter(text_area.value));
		}
		else {
			$(editor.text_panel).text(text_area.value);
		}
		// Line numbers
		editor.line_numbers.height = editor.inner.clientHeight;

		var num_lines = text_area.value.split("\n").length;
		var l = '';
		for(i = 1; i < (num_lines + 1); i++){
			l += (i + "\n");
		}
		$(editor.line_numbers)
			.html(l + '<br>')
			.css('height', editor.inner.clientHeight + 'px');

		//$(editor.outer)
			//.width(editor.outer.clientWidth);
			//.css('width', editor.outer.clientWidth + 'px')
		$(editor.inner)
			.css('minWidth', editor.inner.clientWidth + 'px')
			//.css('minHeight', (editor.clientHeight - 4) + 'px');
		$(editor.text_panel)
			.css('minWidth', (editor.inner.clientWidth - 42) + 'px')
			.css('minHeight', (editor.inner.clientHeight - 4) + 'px');
		$(editor.back_panel)
			.css('minWidth', (editor.inner.clientWidth - 42) + 'px');
	}

	/*
	 * Caret.
	 */
	function positionEditorCaret() {
		var t = text_area.value.slice(0, text_area.selectionStart);
		var selected_text = text_area.value.slice(text_area.selectionStart, text_area.selectionEnd);
		if(selected_text == "") {
			editor.selection.className = 'caret blink';
			$(editor.selection).text(" ");
		}
		else {
			editor.selection.className = 'selection';
			$(editor.selection).text(selected_text);
		}
		$(editor.selection).css('visibility', 'visible');
		$(editor.back_panel)
			.empty()
			.append(d.createTextNode(t))
			.append(editor.selection);
		var pos = $(editor.selection).position();
		if(editor.inner.scrollTop > pos.top) editor.inner.scrollTop = pos.top - y_margin;
		var n = pos.top + editor.selection.clientHeight - editor.inner.clientHeight;
		if(n > editor.inner.scrollTop) editor.inner.scrollTop = n + y_margin;

		n = pos.left - x_margin;
		if(editor.inner.scrollLeft > n) editor.inner.scrollLeft = n;
		n = pos.left + x_margin + editor.selection.clientWidth - editor.inner.clientWidth + gutter_width;
		if(n > editor.inner.scrollLeft) editor.inner.scrollLeft = n;
	}

})(window.jQuery); //(jQuery.noConflict());